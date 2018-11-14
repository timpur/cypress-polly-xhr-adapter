"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _XHRMock = require("./xhr-mock/XHRMock");

var _adapter = _interopRequireDefault(require("@pollyjs/adapter"));

var _utils = require("@pollyjs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var IS_STUBBED = Symbol();
var window = global.window;

var XHRAdapter =
/*#__PURE__*/
function (_Adapter) {
  _inherits(XHRAdapter, _Adapter);

  _createClass(XHRAdapter, null, [{
    key: "setWindow",
    value: function setWindow(_window) {
      window = _window;
    }
  }, {
    key: "name",
    get: function get() {
      return 'xhr';
    }
  }]);

  function XHRAdapter(polly) {
    var _this;

    _classCallCheck(this, XHRAdapter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(XHRAdapter).call(this, polly));
    _this.xhrMock = new _XHRMock.XHRMock(window);
    return _this;
  }

  _createClass(XHRAdapter, [{
    key: "onConnect",
    value: function onConnect() {
      var _this2 = this;

      this.assert('Running concurrent XHR adapters is unsupported, stop any running Polly instances.', !global.XMLHttpRequest[IS_STUBBED]);
      this.xhrMock.setup();
      global.XMLHttpRequest[IS_STUBBED] = true;
      this.xhrMock.use(
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(req, res) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this2.handleRequest({
                    url: req.url().toString(),
                    method: req.method() || 'GET',
                    headers: req.headers(),
                    requestArguments: {
                      req: req,
                      res: res
                    },
                    body: req.body()
                  });

                case 2:
                  return _context.abrupt("return", res);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "onDisconnect",
    value: function onDisconnect() {
      delete global.XMLHttpRequest[IS_STUBBED];
      this.xhrMock.teardown();
    }
  }, {
    key: "onRecord",
    value: function () {
      var _onRecord = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(pollyRequest) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.passthroughRequest(pollyRequest);

              case 2:
                _context2.next = 4;
                return this.persister.recordRequest(pollyRequest);

              case 4:
                this.respondToXhr(pollyRequest);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function onRecord(_x3) {
        return _onRecord.apply(this, arguments);
      };
    }()
  }, {
    key: "onReplay",
    value: function () {
      var _onReplay = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(pollyRequest, _ref2) {
        var statusCode, headers, body;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                statusCode = _ref2.statusCode, headers = _ref2.headers, body = _ref2.body;
                _context3.next = 3;
                return pollyRequest.respond(statusCode, headers, body);

              case 3:
                this.respondToXhr(pollyRequest);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function onReplay(_x4, _x5) {
        return _onReplay.apply(this, arguments);
      };
    }()
  }, {
    key: "onPassthrough",
    value: function () {
      var _onPassthrough = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(pollyRequest) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.passthroughRequest(pollyRequest);

              case 2:
                this.respondToXhr(pollyRequest);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function onPassthrough(_x6) {
        return _onPassthrough.apply(this, arguments);
      };
    }()
  }, {
    key: "onIntercept",
    value: function () {
      var _onIntercept = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(pollyRequest, _ref3) {
        var statusCode, headers, body;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                statusCode = _ref3.statusCode, headers = _ref3.headers, body = _ref3.body;
                _context5.next = 3;
                return pollyRequest.respond(statusCode, headers, body);

              case 3:
                this.respondToXhr(pollyRequest);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function onIntercept(_x7, _x8) {
        return _onIntercept.apply(this, arguments);
      };
    }()
  }, {
    key: "respondToXhr",
    value: function respondToXhr(pollyRequest) {
      var res = pollyRequest.requestArguments.res;
      var _pollyRequest$respons = pollyRequest.response,
          statusCode = _pollyRequest$respons.statusCode,
          headers = _pollyRequest$respons.headers,
          body = _pollyRequest$respons.body;

      for (var header in headers) {
        res.header(header, headers[header]);
      }

      res.status(statusCode).body(body);
    }
  }, {
    key: "passthroughRequest",
    value: function () {
      var _passthroughRequest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(pollyRequest) {
        var xhr, h;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                xhr = new this.xhrMock.RealXMLHttpRequest();
                xhr.open(pollyRequest.method, pollyRequest.url, true);

                for (h in pollyRequest.headers) {
                  xhr.setRequestHeader(h, pollyRequest.headers[h]);
                }

                _context6.next = 5;
                return this.resolveXhr(xhr, pollyRequest.body);

              case 5:
                _context6.next = 7;
                return pollyRequest.respond(xhr.status, _utils.XHR.serializeResponseHeaders(xhr.getAllResponseHeaders()), xhr.responseText);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function passthroughRequest(_x9) {
        return _passthroughRequest.apply(this, arguments);
      };
    }()
  }, {
    key: "resolveXhr",
    value: function resolveXhr(xhr, body) {
      return new Promise(function (resolve) {
        xhr.send(body);
        var onreadystatechange = xhr.onreadystatechange;

        xhr.onreadystatechange = function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          onreadystatechange && onreadystatechange.apply.apply(onreadystatechange, [xhr].concat(args));
          xhr.readyState === XMLHttpRequest.DONE && resolve();
        };
      });
    }
  }]);

  return XHRAdapter;
}(_adapter.default);

exports.default = XHRAdapter;