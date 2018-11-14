"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var window = require("global");
var createMockFunction_1 = require("./createMockFunction");
var MockXMLHttpRequest_1 = require("./MockXMLHttpRequest");
var RealXMLHttpRequest = window.XMLHttpRequest;
var XHRMock = /** @class */ (function () {
    function XHRMock(_window) {
        if(_window){
            window=_window
            RealXMLHttpRequest=window.XMLHttpRequest
        }
        this.RealXMLHttpRequest = RealXMLHttpRequest;
    }
    XHRMock.prototype.setup = function () {
        // @ts-ignore: https://github.com/jameslnewell/xhr-mock/issues/45
        window.XMLHttpRequest = MockXMLHttpRequest_1.default;
        this.reset();
        return this;
    };
    XHRMock.prototype.teardown = function () {
        this.reset();
        window.XMLHttpRequest = RealXMLHttpRequest;
        return this;
    };
    XHRMock.prototype.reset = function () {
        MockXMLHttpRequest_1.default.removeAllHandlers();
        return this;
    };
    XHRMock.prototype.error = function (callback) {
        MockXMLHttpRequest_1.default.errorCallback = callback;
        return this;
    };
    XHRMock.prototype.mock = function (fnOrMethod, url, mock) {
        console.warn('xhr-mock: XHRMock.mock() has been deprecated. Use XHRMock.use() instead.');
        if (typeof fnOrMethod === 'string' &&
            (typeof url === 'string' || url instanceof RegExp) &&
            mock !== undefined) {
            return this.use(fnOrMethod, url, mock);
        }
        else if (typeof fnOrMethod === 'function') {
            return this.use(fnOrMethod);
        }
        else {
            throw new Error('xhr-mock: Invalid handler.');
        }
    };
    XHRMock.prototype.use = function (fnOrMethod, url, mock) {
        var fn;
        if (typeof fnOrMethod === 'string' &&
            (typeof url === 'string' || url instanceof RegExp) &&
            mock !== undefined) {
            fn = createMockFunction_1.default(fnOrMethod, url, mock);
        }
        else if (typeof fnOrMethod === 'function') {
            fn = fnOrMethod;
        }
        else {
            throw new Error('xhr-mock: Invalid handler.');
        }
        MockXMLHttpRequest_1.default.addHandler(fn);
        return this;
    };
    XHRMock.prototype.get = function (url, mock) {
        return this.use('GET', url, mock);
    };
    XHRMock.prototype.post = function (url, mock) {
        return this.use('POST', url, mock);
    };
    XHRMock.prototype.put = function (url, mock) {
        return this.use('PUT', url, mock);
    };
    XHRMock.prototype.patch = function (url, mock) {
        return this.use('PATCH', url, mock);
    };
    XHRMock.prototype.delete = function (url, mock) {
        return this.use('DELETE', url, mock);
    };
    return XHRMock;
}());
exports.XHRMock = XHRMock;
// I'm only using a class so I can make use make use of TS' method overrides
exports.default = new XHRMock();
