module.exports = function(app, mongoClient) {

  //
  // Setup Database Client
  //

  var openConnection = function(req, res, next) {
    req.dbClient.collection(req.params.collection, function(err, collectionClient) {
      if(err) return next(err);
      req.collectionClient = collectionClient;
      res.locals.collectionName = collectionClient.collectionName;
      next();
    });
  };

  //
  // Display Collection Info (Docs)
  //

  var collection = function(req, res, next) {
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
  };

  return {openConnection:openConnection, collection:collection};
};