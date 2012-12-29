module.exports = function (app, mongoClient) {


  //
  // Setup Database Client
  //

  var openConnection = function(req, res, next) {
    req.dbClient = req.client.db(req.params.db);
    res.locals.dbName = req.dbClient.databaseName;
    req.dbClient.collections(function(err, collections) {
      if(err) return next(err);
      res.locals.collections = collections;
      next();
    });
  };

  //
  // Display Database Info (Collections)
  //

  var db = function(req, res, next) {
    res.render('db');
  };

  return {openConnection:openConnection, db:db};

};