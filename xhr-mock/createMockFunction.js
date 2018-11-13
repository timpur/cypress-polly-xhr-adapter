"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createResponseFromObject_1 = require("./createResponseFromObject");
function default_1(method, url, mock) {
    var matches = function (req) {
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
            if (typeof mock === 'object') {
                return createResponseFromObject_1.createResponseFromObject(mock);
            }
            else {
                return mock(req, res);
            }
        }
    };
}
exports.default = default_1;
