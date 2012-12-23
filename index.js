

module.exports = function(mongoClient, options) {

  mongoClient = mongoClient || 'mongodb://localhost';
  options = options || {};

  return require('./app.js')(mongoClient, options);

};

module.exports.version = require('./package.json').version;