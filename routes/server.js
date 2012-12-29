module.exports = function(app, mongoClient) {

  var server = function(req, res, next) {
    res.render('index');
  };

  return {server:server};

};