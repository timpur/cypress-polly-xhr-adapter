"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createResponseFromObject_1 = require("../createResponseFromObject");
function delay(mock, ms) {
    if (ms === void 0) { ms = 1500; }
    return function (req, res) {
        var ret = typeof mock === 'function'
            ? mock(req, res)
            : createResponseFromObject_1.createResponseFromObject(mock);
        if (ret === undefined) {
            return undefined;
        }
        return Promise.resolve(ret).then(function (val) {
            if (val == undefined) {
                return undefined;
            }
            else {
                return new Promise(function (resolve) {
                    return setTimeout(function () { return resolve(val); }, ms);
                });
            }
        });
    };
}
exports.delay = delay;
