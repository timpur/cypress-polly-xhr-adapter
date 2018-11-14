"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var https = require("https");
function default_1(req, res) {
    return new Promise(function (resolve, reject) {
        var options = {
            method: req.method(),
            protocol: req.url().protocol + ":",
            hostname: req.url().host,
            port: req.url().port,
            auth: req.url().username + " " + req.url().password,
            path: req.url().path,
            headers: req.headers()
        };
        var requestFn = req.url().protocol === 'https' ? https.request : http.request;
        var httpReq = requestFn(options, function (httpRes) {
            res.status(httpRes.statusCode || 0).reason(httpRes.statusMessage || '');
            Object.keys(httpRes.headers).forEach(function (name) {
                var value = httpRes.headers[name];
                res.header(name, Array.isArray(value) ? value[0] : value || '');
            });
            var resBody = '';
            httpRes.setEncoding('utf8');
            httpRes.on('data', function (chunk) {
                resBody += chunk.toString();
            });
            httpRes.on('end', function () {
                res.body(resBody);
                resolve(res);
            });
        });
        httpReq.on('error', reject);
        var reqBody = req.body();
        if (reqBody !== undefined && reqBody !== null) {
            httpReq.write(reqBody);
        }
        httpReq.end();
    });
}
exports.default = default_1;
