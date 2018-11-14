"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockURL_1 = require("./MockURL");
var FORBIDDEN_METHODS = ['CONNECT', 'TRACE', 'TRACK'];
var UPPERCASE_METHODS = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
var MockRequest = /** @class */ (function () {
    function MockRequest() {
        this._method = 'GET';
        this._url = MockURL_1.parseURL('');
        this._headers = {};
        this._body = null;
    }
    MockRequest.prototype.method = function (method) {
        if (typeof method !== 'undefined') {
            if (FORBIDDEN_METHODS.indexOf(method.toUpperCase()) !== -1) {
                throw new Error("xhr-mock: Method \"" + method + "\" is forbidden.");
            }
            if (UPPERCASE_METHODS.indexOf(method.toUpperCase()) !== -1) {
                this._method = method.toUpperCase();
            }
            else {
                this._method = method;
            }
            return this;
        }
        else {
            return this._method;
        }
    };
    MockRequest.prototype.url = function (url) {
        if (typeof url === 'string') {
            this._url = MockURL_1.parseURL(url);
            return this;
        }
        else {
            return this._url;
        }
    };
    MockRequest.prototype.header = function (name, value) {
        if (typeof value !== 'undefined') {
            this._headers[name.toLowerCase()] = value;
            return this;
        }
        else {
            return this._headers[name.toLowerCase()] || null;
        }
    };
    MockRequest.prototype.headers = function (headers) {
        if (typeof headers === 'object') {
            for (var name_1 in headers) {
                if (headers.hasOwnProperty(name_1)) {
                    this.header(name_1, headers[name_1]);
                }
            }
            return this;
        }
        else {
            return this._headers;
        }
    };
    MockRequest.prototype.body = function (body) {
        if (typeof body !== 'undefined') {
            this._body = body;
            return this;
        }
        else {
            return this._body;
        }
    };
    return MockRequest;
}());
exports.default = MockRequest;
