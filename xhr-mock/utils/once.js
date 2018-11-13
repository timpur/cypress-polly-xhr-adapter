"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createResponseFromObject_1 = require("../createResponseFromObject");
function once(mock) {
    var callCount = 0;
    return function (req, res) {
        if (callCount === 0) {
            ++callCount;
            return typeof mock === 'function'
                ? mock(req, res)
                : createResponseFromObject_1.createResponseFromObject(mock);
        }
        else {
            return undefined;
        }
    };
}
exports.once = once;
