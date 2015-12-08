(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Base64 = require('Base64');

module.exports = function(str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  var result = Base64.atob(output);

  try{
    return decodeURIComponent(escape(result));
  } catch (err) {
    return result;
  }
};

},{"Base64":4}],2:[function(require,module,exports){
'use strict';

var base64_url_decode = require('./base64_url_decode');
var json_parse = require('./json_parse');

module.exports = function (token) {
  if (!token) {
    throw new Error('Invalid token specified');
  }
  
  return json_parse(base64_url_decode(token.split('.')[1]));
};

},{"./base64_url_decode":1,"./json_parse":3}],3:[function(require,module,exports){
module.exports = function (str) {
  var parsed;
  if (typeof JSON === 'object') {
    parsed = JSON.parse(str);
  } else {
    parsed = eval('(' + str + ')');
  }
  return parsed;
};

},{}],4:[function(require,module,exports){
;(function () {

  var
    object = typeof exports != 'undefined' ? exports : this, // #8: web workers
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    INVALID_CHARACTER_ERR = (function () {
      // fabricate a suitable error object
      try { document.createElement('$'); }
      catch (error) { return error; }}());

  // encoder
  // [https://gist.github.com/999166] by [https://github.com/nignag]
  object.btoa || (
  object.btoa = function (input) {
    for (
      // initialize result and counter
      var block, charCode, idx = 0, map = chars, output = '';
      // if the next input index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      input.charAt(idx | 0) || (map = '=', idx % 1);
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & block >> 8 - idx % 1 * 8)
    ) {
      charCode = input.charCodeAt(idx += 3/4);
      if (charCode > 0xFF) throw INVALID_CHARACTER_ERR;
      block = block << 8 | charCode;
    }
    return output;
  });

  // decoder
  // [https://gist.github.com/1020396] by [https://github.com/atk]
  object.atob || (
  object.atob = function (input) {
    input = input.replace(/=+$/, '')
    if (input.length % 4 == 1) throw INVALID_CHARACTER_ERR;
    for (
      // initialize result and counters
      var bc = 0, bs, buffer, idx = 0, output = '';
      // get next character
      buffer = input.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  });

}());

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiRequest = apiRequest;
var apiRequestResult = document.querySelector('#api-request-result');

function apiRequest() {
  var id_token = localStorage.getItem('id_token') || '';

  fetch('/api/status', {
    headers: {
      'Authorization': 'Bearer ' + id_token
    },
    method: 'GET',
    cache: false
  }).then(function (response) {
    response.text().then(function (text) {
      apiRequestResult.textContent = response.status + ' - ' + text;
    });
  });
}

},{}],6:[function(require,module,exports){
'use strict';

var _api = require('./api');

var _authenticator = require('./authenticator');

var apiRequestButton = document.querySelector('#api-request');
var authStatus = document.querySelector('#auth-status');
var logoutButton = document.querySelector('#logout');
var customOauthFlow = document.querySelector('#oauth-login-init');

function authenticatedState(userData) {
  document.querySelector('#name').textContent = userData.display_name;
  authStatus.textContent = 'Authenticated';
  logoutButton.style.display = 'block';
}

function logout() {
  localStorage.removeItem('id_token');
  window.location = '/';
}

customOauthFlow.addEventListener('click', _authenticator.initAuth);

logoutButton.addEventListener('click', logout);
apiRequestButton.addEventListener('click', _api.apiRequest);

(0, _authenticator.authenticate)().then(authenticatedState);

},{"./api":5,"./authenticator":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAuth = initAuth;
exports.authenticate = authenticate;

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this should probably be split into "authenticate" and "getUser" methods
// the implementor should be in charge of storing the token

function initAuth() {
  var frame = document.createElement('iframe');
  frame.src = 'http://localhost:3060/?client_id="developer"';

  // we need to listen for the frame, which is going to eventually
  // post message a token out that we can exchange with our server
  window.addEventListener('message', function (e) {
    console.log('we received a postMessage', e);
  });

  document.body.appendChild(frame);

  frame.addEventListener('load', function () {
    frame.contentWindow.postMessage('parent dawg', 'http://localhost:3060');
    frame.addEventListener('message', function (e) {
      console.log('frame message', e);
    });
  });
}

function authenticate() {
  return new Promise(function (resolve, reject) {
    var tokenToLoad;
    var results = window.location.hash.split(/#?auth_token=/);
    var savedToken = localStorage.getItem('id_token');
    var hashToken = results && results[1];

    if (hashToken) {
      localStorage.setItem('id_token', hashToken);
      window.location.hash = '';
    }

    tokenToLoad = hashToken || savedToken;

    if (tokenToLoad) {
      var tokenData = (0, _jwtDecode2.default)(tokenToLoad);
      var userData = tokenData.user;
      resolve(userData);
    }
  });
}

},{"jwt-decode":2}]},{},[6]);
