"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockResponse = /** @class */ (function () {
    function MockResponse() {
        this._status = 200;
        this._reason = 'OK';
        this._headers = {};
        this._body = null;
    }
    MockResponse.prototype.status = function (status) {
        if (typeof status !== 'undefined') {
            this._status = status;
            return this;
        }
        else {
            return this._status;
        }
    };
    MockResponse.prototype.reason = function (reason) {
        if (typeof reason !== 'undefined') {
            this._reason = reason;
            return this;
        }
        else {
            return this._reason;
        }
    };
    MockResponse.prototype.statusText = function (reason) {
        console.warn('xhr-mock: MockResponse.statusText() has been deprecated. Use MockResponse.reason() instead.');
        if (typeof reason !== 'undefined') {
            return this.reason(reason);
        }
        else {
            return this.reason();
        }
    };
    MockResponse.prototype.header = function (name, value) {
        if (typeof value !== 'undefined') {
            this._headers[name.toLowerCase()] = value;
            return this;
        }
        else {
            return this._headers[name.toLowerCase()] || null;
        }
    };
    MockResponse.prototype.headers = function (headers) {
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
    MockResponse.prototype.body = function (body) {
        if (typeof body !== 'undefined') {
            this._body = body;
            return this;
        }
        else {
            return this._body;
        }
    };
    return MockResponse;
}());
exports.default = MockResponse;
