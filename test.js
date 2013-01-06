
var assert = require('assert');
var MongoMate = require('./');
var exec = require('child_process').exec;
var http = require('http');

describe('mongomate', function() {
  it('displays error when not connected');
  it('exports version', function() {
    assert.equal(typeof MongoMate.version, 'string');
  });
});

describe('mounted app', function() {
  it('exports app', function() {
    assert.ok(MongoMate().listen);
  });
});

describe('cli', function() {

  it('starts');
  it('starts on specified port');

});


