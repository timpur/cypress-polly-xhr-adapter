"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XHRMock_1 = require("./XHRMock");
function parseHeaders(string) {
    var headers = {};
    var lines = string.split('\r\n');
    lines.forEach(function (line) {
        var _a = line.split(':', 2), name = _a[0], value = _a[1];
        if (name && value) {
            headers[name] = value.replace(/^\s*/g, '').replace(/\s*$/g, '');
        }
    });
    return headers;
}
function default_1(req, res) {
    return new Promise(function (resolve, reject) {
        var xhr = new XHRMock_1.default.RealXMLHttpRequest();
        // TODO: reject with the correct type of error
        xhr.onerror = function (event) { return reject(event.error); };
        xhr.onloadend = function () {
            res
                .status(xhr.status)
                .reason(xhr.statusText)
                .headers(parseHeaders(xhr.getAllResponseHeaders()))
                .body(xhr.response);
            resolve(res);
        };
        xhr.open(req.method(), req.url().toString());
        var headers = req.headers();
        Object.keys(headers).forEach(function (name) {
            var value = headers[name];
            xhr.setRequestHeader(name, value);
        });
        xhr.send(req.body());
    });
}
exports.default = default_1;
