"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertRequestToString(req) {
    var headers = Object.keys(req.headers()).map(function (name) { return name + ": " + req.header(name); });
    var body = req.body() ? req.body() : '';
    return req.method() + " " + req.url() + " HTTP/1.1\n" + (headers ? headers.join('\n') + "\n" : '') + "\n" + (body ? body : '') + "\n";
}
function indentSuccessiveLines(string, indent) {
    return string
        .split('\n')
        .map(function (line, index) { return Array(indent + 1).join(' ') + line; })
        .join('\n');
}
function formatError(msg, req, err) {
    return "xhr-mock: " + msg + "\n\n  " + indentSuccessiveLines(convertRequestToString(req), 2).trim() + "\n  " + (err !== undefined
        ? "\n" + indentSuccessiveLines((err && err.stack) || (err && err.message) || "Error: " + err, 2)
        : '') + "\n";
}
exports.formatError = formatError;
