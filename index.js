

module.exports = function(mongoClient, options) {
  return require('./app.js')(mongoClient, options);
};

module.exports.version = require('./package.json').version;