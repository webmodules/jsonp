
/**
 * Module dependencies
 */

var debug = require('debug')('jsonp')

/**
 * Module exports.
 */

module.exports = jsonp;

/**
 * Callback index.
 */

var count = 0;

/**
 * Noop function.
 */

function noop () {};

/**
 * JSONP handler
 *
 * Options:
 *  - param {String} qs parameter (`callback`)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */

function jsonp (url, opts, fn) {
  if ('function' == typeof opts) {
    fn = opts;
    opts = {};
  }

  var opts = opts || {}
    , callback = opts.callback || 'callback'
    , timeout = null != opts.timeout ? opts.timeout : 60000
    , enc = encodeURIComponent
    , script
    , timer

  // generate a hash of the url
  var id = 0
  for (var i = 0, l = url.length; i < l; i++) {
    id += url.charCodeAt(i);
  }

  if (timeout) {
    timer = setTimeout(function () {
      cleanup();
      fn && fn(new Error('Timeout'));
    }, timeout);
  }

  function cleanup () {
    document.head.removeChild(script);
    window['__jp' + id] = noop;
  }

  window['__jp' + id] = function (data) {
    debug('jsonp got', data);
    if (timer) clearTimeout(timer);
    cleanup();
    fn && fn(null, data);
  };

  // add qs component
  url += (~url.indexOf('?') ? '&' : '?') + 'callback=' + enc('__jp' + id + '');
  url = url.replace('?&', '?');

  debug('jsonp req "%s"', url);

  // create script
  script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script);
};
