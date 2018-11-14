"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPromiseLike(arg) {
    return arg && arg.then !== undefined;
}
exports.isPromiseLike = isPromiseLike;
