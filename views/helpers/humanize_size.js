
var humanize = require('humanize');

module.exports = function(num) {
  return humanize.filesize(num, 1024, 0);
};