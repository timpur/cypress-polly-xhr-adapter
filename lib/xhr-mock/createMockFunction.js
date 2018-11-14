"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var createResponseFromObject_1 = require("./createResponseFromObject");

function default_1(method, url, mock) {
  var matches = function matches(req) {
    var requestMethod = req.method();
    var requestURL = req.url().toString();

    if (requestMethod.toUpperCase() !== method.toUpperCase()) {
      return false;
    }

    if (url instanceof RegExp) {
      url.lastIndex = 0; //reset state of global regexp

      return url.test(requestURL);
    }

    return requestURL === url; //TODO: should we use .startsWith()???
  };

  return function (req, res) {
    if (matches(req)) {
      if (_typeof(mock) === 'object') {
        return createResponseFromObject_1.createResponseFromObject(mock);
      } else {
        return mock(req, res);
      }
    }
  };
}

exports.default = default_1;