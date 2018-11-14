"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MockXMLHttpRequestEventTarget_1 = require("./MockXMLHttpRequestEventTarget");
// @ts-ignore: https://github.com/jameslnewell/xhr-mock/issues/45
var MockXMLHttpRequestUpload = /** @class */ (function (_super) {
    __extends(MockXMLHttpRequestUpload, _super);
    function MockXMLHttpRequestUpload() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MockXMLHttpRequestUpload;
}(MockXMLHttpRequestEventTarget_1.default));
exports.default = MockXMLHttpRequestUpload;
