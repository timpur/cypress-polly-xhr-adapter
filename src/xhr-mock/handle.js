"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockError_1 = require("./MockError");
var isPromiseLike_1 = require("./isPromiseLike");
var NO_RESPONSE_ERROR = new MockError_1.MockError('No handler returned a response for the request.');
function sync(handlers, request, response) {
    for (var i = 0; i < handlers.length; ++i) {
        var result = handlers[i](request, response);
        if (result) {
            if (isPromiseLike_1.isPromiseLike(result)) {
                throw new MockError_1.MockError('A handler returned a Promise<MockResponse> for a synchronous request.');
            }
            return result;
        }
    }
    throw NO_RESPONSE_ERROR;
}
exports.sync = sync;
function async(handlers, request, response) {
    return handlers
        .reduce(function (promise, handler) {
        return promise.then(function (result) {
            if (!result) {
                return handler(request, response);
            }
            return result;
        });
    }, Promise.resolve(undefined))
        .then(function (result) {
        if (!result) {
            throw NO_RESPONSE_ERROR;
        }
        return result;
    });
}
exports.async = async;
