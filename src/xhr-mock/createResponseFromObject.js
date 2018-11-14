"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockResponse_1 = require("./MockResponse");
function createResponseFromObject(object) {
    var status = object.status, reason = object.reason, headers = object.headers, body = object.body;
    var response = new MockResponse_1.default();
    if (status) {
        response.status(status);
    }
    if (reason) {
        response.reason(reason);
    }
    if (headers) {
        response.headers(headers);
    }
    if (body) {
        response.body(body);
    }
    return response;
}
exports.createResponseFromObject = createResponseFromObject;
