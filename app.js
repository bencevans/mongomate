module.exports = function(mongoClient, options) {

//
// Require All the Things
//

var path = require('path');
var fs = require('fs');
var express = require('express');
var hbs = require('hbs');
var app = express();

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

fs.readdirSync(path.resolve(__dirname, './views/helpers')).forEach(function(file) {
  hbs.registerHelper(path.basename(file, '.js'), require(path.resolve(__dirname, './views/helpers/', file)));
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


  function listDatabases() {
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
      listDatabases();
    });
  } else {
    listDatabases();
  }

});

//
// HTTP Routes
//

var routes = {};
routes.server = require('./routes/server')(app, mongoClient);
routes.db = require('./routes/db')(app, mongoClient);
routes.collection = require('./routes/collection')(app, mongoClient);

app.get('/', routes.server.server);
app.get('/db/:db*', routes.db.openConnection);
app.get('/db/:db*', routes.db.db);
app.get('/db/:db/collection/:collection*', routes.collection.openConnection);
app.get('/db/:db/collection/:collection', routes.collection.collection);

return app;

};