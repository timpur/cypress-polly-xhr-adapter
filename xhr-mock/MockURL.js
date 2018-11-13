"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
// put toString() in a class so it isn't included in the props when checked for equality
var MockURLImplementation = /** @class */ (function () {
    function MockURLImplementation() {
    }
    MockURLImplementation.prototype.toString = function () {
        return formatURL(this);
    };
    return MockURLImplementation;
}());
function parseURL(url) {
    var urlObject = new MockURLImplementation();
    if (!url) {
        return urlObject;
    }
    var parsedURL = url_1.parse(url, true);
    if (parsedURL.protocol) {
        urlObject.protocol = parsedURL.protocol.substr(0, parsedURL.protocol.length - 1);
    }
    if (parsedURL.auth) {
        var _a = parsedURL.auth.split(':'), username = _a[0], password = _a[1];
        if (username && password) {
            urlObject.username = username;
            urlObject.password = password;
        }
        else {
            urlObject.username = username;
        }
    }
    if (parsedURL.hostname) {
        urlObject.host = parsedURL.hostname;
    }
    if (parsedURL.port) {
        urlObject.port = parseInt(parsedURL.port, 10);
    }
    if (parsedURL.pathname) {
        urlObject.path = parsedURL.pathname;
    }
    if (parsedURL.query) {
        urlObject.query = parsedURL.query;
    }
    if (parsedURL.hash) {
        urlObject.hash = parsedURL.hash;
    }
    return urlObject;
}
exports.parseURL = parseURL;
function formatURL(url) {
    var obj = {
        protocol: url.protocol,
        auth: url.username && url.password
            ? url.username + ":" + url.password
            : url.username,
        hostname: url.host,
        port: typeof url.port === 'number' ? String(url.port) : url.port,
        pathname: url.path,
        query: url.query,
        hash: url.hash
    };
    return url_1.format(obj);
}
exports.formatURL = formatURL;
