"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var XHRMock_1 = require("./XHRMock");

var MockRequest_1 = require("./MockRequest");

exports.MockRequest = MockRequest_1.default;

var MockResponse_1 = require("./MockResponse");

exports.MockResponse = MockResponse_1.default;

var proxy_1 = require("./proxy");

exports.proxy = proxy_1.default;

var once_1 = require("./utils/once");

exports.once = once_1.once;

var delay_1 = require("./utils/delay");

exports.delay = delay_1.delay;
exports.default = XHRMock_1.default;