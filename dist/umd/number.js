(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./is.js"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./is.js"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.number = {}, global.isJs);
})(this, function(exports, _isJs) {
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
        getRandRange: function() {
            return getRandRange;
        },
        decimalPrecision: function() {
            return decimalPrecision;
        },
        sum: function() {
            return sum;
        },
        subtract: function() {
            return subtract;
        },
        weakNumber: function() {
            return weakNumber;
        },
        clamp: function() {
            return clamp;
        }
    });
    function getRandRange(min, max) {
        return Math.round((max - min) * Math.random() + min);
    }
    function decimalPrecision(num) {
        var precision = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
        var mid = +"1".concat(Array.from({
            length: precision
        }).map(function() {
            return "0";
        }).join(""));
        return Math.round(num * mid) / mid;
    }
    function sum() {
        for(var _len = arguments.length, nums = new Array(_len), _key = 0; _key < _len; _key++){
            nums[_key] = arguments[_key];
        }
        return nums.reduce(function(p, i) {
            return p + ((0, _isJs.isWeakNumber)(i) ? Number(i) : 0);
        }, 0);
    }
    function subtract() {
        for(var _len = arguments.length, nums = new Array(_len), _key = 0; _key < _len; _key++){
            nums[_key] = arguments[_key];
        }
        return nums.reduce(function(p, i) {
            if (p === null) return i;
            if (!(0, _isJs.isWeakNumber)(i)) return p;
            return p - i;
        }, null);
    }
    function weakNumber(arg) {
        return (0, _isJs.isWeakNumber)(arg) ? Number(arg) : null;
    }
    function clamp(val, min, max) {
        if ((0, _isJs.isNumber)(min) && val < min) return min;
        if ((0, _isJs.isNumber)(max) && val > max) return max;
        return val;
    }
});
