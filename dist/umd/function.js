/**
 * 将一个错误优先且回调位于最后一个参数的node风格的callback函数转为Promise return函数
 * @param fn - 要包装的函数
 * @param {object} receiver - 要绑定作用域的对象
 * @return promise - 转换后的函数
 */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_object_spread.mjs"), require("@swc/helpers/src/_to_consumable_array.mjs"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_object_spread.mjs",
        "@swc/helpers/src/_to_consumable_array.mjs"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.function = {}, global.objectSpreadMjs, global.toConsumableArrayMjs);
})(this, function(exports, _objectSpread, _toConsumableArray) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function _export(target, all) {
        for(var name in all)Object.defineProperty(target, name, {
            enumerable: true,
            get: all[name]
        });
    }
    _export(exports, {
        promisify: function() {
            return promisify;
        },
        delay: function() {
            return delay;
        },
        dumpFn: function() {
            return dumpFn;
        },
        defer: function() {
            return defer;
        },
        retry: function() {
            return retry;
        },
        throwError: function() {
            return throwError;
        },
        throwWarning: function() {
            return throwWarning;
        }
    });
    _objectSpread = _objectSpread.default;
    _toConsumableArray = _toConsumableArray.default;
    function promisify(fn, receiver) {
        return function() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            return new Promise(function(resolve, reject) {
                fn.apply(receiver, _toConsumableArray(args).concat([
                    function(err, res) {
                        return err ? reject(err) : resolve(res);
                    }, 
                ]));
            });
        };
    }
    function delay(ms, payload) {
        return new Promise(function(res, rej) {
            setTimeout(function() {
                return payload instanceof Error ? rej(payload) : res(payload);
            }, ms);
        });
    }
    var dumpFn = function() {
        for(var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++){
            arg[_key] = arguments[_key];
        }
        return arg;
    };
    var defer = function(fn) {
        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            args[_key - 1] = arguments[_key];
        }
        return setTimeout.apply(void 0, [
            fn,
            1
        ].concat(_toConsumableArray(args)));
    };
    var defaultConfig = {
        rate: 0.2
    };
    function retry(handle, delay, config) {
        var ref = _objectSpread({}, defaultConfig, config), maxDelay = ref.maxDelay, rate = ref.rate, fixed = ref.fixed, maxRetry = ref.maxRetry;
        var t;
        var clear = function() {
            return t && clearTimeout(t);
        };
        var res = handle();
        if (!res) return clear;
        var d = delay;
        var count = 1;
        var trigger = function() {
            t = setTimeout(function() {
                if (handle()) {
                    if (maxRetry && maxRetry === count) return;
                    if (!fixed) {
                        var nextD = count * rate * delay + d;
                        d = maxDelay ? Math.min(nextD, maxDelay) : nextD;
                    }
                    count++;
                    trigger();
                }
            }, d);
        };
        trigger();
        return clear;
    }
    function throwError(msg, prefix) {
        throw new Error("".concat(prefix ? "".concat(prefix, "::") : "", "ERROR: ").concat(msg));
    }
    function throwWarning(msg, prefix) {
        console.warn("".concat(prefix ? "".concat(prefix, "::") : "", "WARNING: ").concat(msg));
    }
});
