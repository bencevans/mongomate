
var assert = require('assert');
var MongoMate = require('./');
var exec = require('child_process').exec;
var http = require('http');


describe('standalone', function() {

  it('starts', function(done) {

    var child = exec('./bin/mongomate');

    setTimeout(function() {
      http.get('http://localhost:8080', function(res) {
        assert.equal(200, res.statusCode);
        child.kill();
        done();
      });
    }, 1000);

  });

  it('starts on specified port', function(done) {

    var child = exec('./bin/mongomate', {
      env: {
        PORT:'8081'
      }
    });

    setTimeout(function() {
      http.get('http://localhost:8081', function(res) {
        assert.equal(200, res.statusCode);
        child.kill();
        done();
      });
    }, 1000);

  });

  it('displays error when not connected');
  it('exports version', function() {
    assert.equal(typeof MongoMate.version, 'string');
  });

});

describe('mounted app', function() {

  it('exports app');

});


