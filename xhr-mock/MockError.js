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
var MockError = /** @class */ (function (_super) {
    __extends(MockError, _super);
    function MockError(message) {
        var _this = _super.call(this, message) || this;
        // hack to make instanceof work @see https://stackoverflow.com/questions/31626231/custom-error-class-in-typescript
        Object.setPrototypeOf(_this, MockError.prototype);
        return _this;
    }
    return MockError;
}(Error));
exports.MockError = MockError;
