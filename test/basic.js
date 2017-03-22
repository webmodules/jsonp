var jsonp = require('../');
var querystring = require('querystring');
var test = require('tape');

// See http://doc.jsfiddle.net/use/echo.html
var ENDPOINT = 'http://jsfiddle.net/echo/jsonp/';

test('basic jsonp', function (t) {
  t.plan(1);
  var obj = {
    beep: 'boop',
    yo: 'dawg'
  };
  var q = querystring.encode(obj);
  jsonp(ENDPOINT + '?' + q, function (err, data) {
    if (err) throw err;
    t.deepEqual(data, obj);
  });
});

test('promise jsonp', function(t) {
  t.plan(1);
  var obj = {
    beep: 'boop',
    yo: 'dawg'
  };
  var q = querystring.encode(obj);
  jsonp(ENDPOINT + '?' + q)
    .then(function(data) {
      t.deepEqual(data, obj);
    })
    .catch(function(err) {
      throw err
    });
});

test('timeout', function (t) {
  t.plan(1);
  var obj = {
    delay: 5 // time in seconds after which data should be returned
  };
  var q = querystring.encode(obj);
  jsonp(ENDPOINT + '?' + q, { timeout: 3000 }, function (err, data) {
    t.ok(err instanceof Error);
  });
});

test('timeout promise', function (t) {
  t.plan(1);
  var obj = {
    delay: 5 // time in seconds after which data should be returned
  };
  var q = querystring.encode(obj);
  jsonp(ENDPOINT + '?' + q, { timeout: 3000 })
    .catch(function(err) {
      t.ok(err instanceof Error);
    });
});

test('named callback', function (t) {
  t.plan(1);
  var obj = {
    beep: 'boop',
    yo: 'dawg'
  };
  var q = querystring.encode(obj);
  jsonp(ENDPOINT + '?' + q, { name: 'namedCb' }, function (err, data) {
    if (err) throw err;
    t.deepEqual(data, obj);
  });
});

test('named promise', function (t) {
  t.plan(1);
  var obj = {
    beep: 'boop',
    yo: 'dawg'
  };
  var q = querystring.encode(obj);
  jsonp(ENDPOINT + '?' + q, { name: 'namedCb' })
    .then(function(data) {
      t.deepEqual(data, obj);
    })
    .catch(function(err) {
      throw err
    });
});
