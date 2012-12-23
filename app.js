module.exports = function(mongoClient, options) {

//
// Require All the Things
//

var path = require('path');
var express = require('express');
var app = express();
var humanize = require('humanize');
var hbs = require('hbs');

var mongo = require('mongodb')
, Db = require('mongodb').Db
, Connection = require('mongodb').Connection
, Server = require('mongodb').Server
, format = require('util').format;

//
// Open Mongo Connection if mongoClient is a URI
//

if(typeof mongoClient == 'string') {
  var mongoURI = mongoClient;
  mongoClient = 'connecting';
  mongo.connect(mongoURI, function(err, client) {
    mongoClient = client;
  });
}


//
// View Engine Setup/Helpers
//

hbs.registerHelper('humanize_size', function(num) {
  return humanize.filesize(num, 1024, 0);
});

hbs.registerHelper('add', function(num1, num2) {
  return num1 + num2;
});

hbs.registerHelper('doc_table', function(doc) {
  var rows = [];
  rows.push('<th>_id</th><th>' + doc._id + '</th>');
  for (var key in doc) {
    if(key !== '_id')
      rows.push('<th>' + key + '</th><td>' + JSON.stringify(doc[key], null, 2) + '</td>');
  }
  return ['<table class="table table=hover table-bordered table-striped">',
  '<tr>',
  rows.join('</tr><tr>'),
  '</tr>',
  '</table>'].join('');
});

//
// Express App Config/Setup
//

app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './views'));
app.engine('html', hbs.__express);
app.use(express['static'](path.resolve(__dirname, './public')));
app.use(function(req, res, next) {

  res.locals.baseURL = app.path();

  req.client = mongoClient;
  req.adminClient = req.client.admin();


  function goToList() {
    req.adminClient.listDatabases(function(err, dbs) {
      if(err) return next(err);
      if(dbs.ok !== 1) return res.send(dbs.errmsg);
      res.locals.dbs = dbs.databases;
      next();
    });
  }

  if (options && options.auth){
    req.adminClient.authenticate(options.auth.username, options.auth.password, function(err, data) {
      if(err) return next(err);
      goToList();
    });
  } else {
    goToList();
  }

});

//
// HTTP Routes
//

app.get('/', function(req, res, next) {
  res.render('index');
});

app.get('/db/:db*', function(req, res, next) {
  req.dbClient = req.client.db(req.params.db);
  res.locals.dbName = req.dbClient.databaseName;
  req.dbClient.collections(function(err, collections) {
    if(err) return next(err);
    res.locals.collections = collections;
    next();
  });
});

app.get('/db/:db', function(req, res, next) {
  res.render('db');
});

app.get('/db/:db/collection/:collection*', function(req, res, next) {
  req.dbClient.collection(req.params.collection, function(err, collectionClient) {
    if(err) return next(err);
    req.collectionClient = collectionClient;
    res.locals.collectionName = collectionClient.collectionName;
    next();
  });
});

app.get('/db/:db/collection/:collection', function(req, res, next) {
  req.collectionClient.find({}, function(err, docsResponce) {
    if(err) return next(err);
    res.locals.docsResponce = docsResponce;
    var page = res.locals.page = 1;
    if(typeof req.query.page !== 'undefined') {
      try {
        page = res.locals.page = parseInt(req.query.page, 10);
      } catch (e) {
        return next(e);
      }
    }
    var limit = res.locals.limit = 10;
    docsResponce.skip((page - 1) * limit).limit(limit).toArray(function(err, docs) {
      if(err) return next(err);
      res.locals.docs = docs;
      res.render('collection');
    });
  });
});

return app;

}