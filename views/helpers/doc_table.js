
module.exports = function(doc) {
  var rows = [];
  rows.push('<th>_id</th><th>' + doc._id + '</th>');
  for (var key in doc) {
    if(key !== '_id')
      rows.push('<th>' + key + '</th><td><code class="prettyprint languague-json">' + JSON.stringify(doc[key], null, 2) + '</code></td>');
  }
  return ['<table class="table table=hover table-bordered table-striped">',
  '<tr>',
  rows.join('</tr><tr>'),
  '</tr>',
  '</table>'].join('');
};