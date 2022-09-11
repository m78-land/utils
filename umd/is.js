(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_type_of.mjs"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_type_of.mjs"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.is = {}, global.typeOfMjs);
})(this, function(exports, _typeOf) {
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
        getProtoStr: function() {
            return getProtoStr;
        },
        isArray: function() {
            return isArray;
        },
        isTruthyArray: function() {
            return isTruthyArray;
        },
        isNumber: function() {
            return isNumber;
        },
        isWeakNumber: function() {
            return isWeakNumber;
        },
        isString: function() {
            return isString;
        },
        isInt: function() {
            return isInt;
        },
        isSymbol: function() {
            return isSymbol;
        },
        isPrimitive: function() {
            return isPrimitive;
        },
        isError: function() {
            return isError;
        },
        isObject: function() {
            return isObject;
        },
        isDom: function() {
            return isDom;
        },
        isRegExp: function() {
            return isRegExp;
        },
        isFunction: function() {
            return isFunction;
        },
        isDate: function() {
            return isDate;
        },
        isBoolean: function() {
            return isBoolean;
        },
        isNull: function() {
            return isNull;
        },
        isUndefined: function() {
            return isUndefined;
        },
        isNullOrUndefined: function() {
            return isNullOrUndefined;
        },
        isTrueEmpty: function() {
            return isTrueEmpty;
        },
        isEmpty: function() {
            return isEmpty;
        },
        isTruthyOrZero: function() {
            return isTruthyOrZero;
        }
    });
    _typeOf = _typeOf.default;
    function getProtoStr(o) {
        return Object.prototype.toString.call(o);
    }
    function isArray(arg) {
        if (Array.isArray) {
            return Array.isArray(arg);
        }
        return getProtoStr(arg) === "[object Array]";
    }
    function isTruthyArray(arg) {
        if (!isArray(arg)) return false;
        return arg.length !== 0;
    }
    function isNumber(arg) {
        return typeof arg === "number" && !isNaN(arg);
    }
    function isWeakNumber(arg) {
        return isNumber(Number(arg));
    }
    function isString(arg) {
        return typeof arg === "string";
    }
    function isInt(value) {
        if (isNaN(value) || isString(value)) {
            return false;
        }
        var x = parseFloat(value);
        return (x | 0) === x;
    }
    function isSymbol(arg) {
        return (typeof arg === "undefined" ? "undefined" : _typeOf(arg)) === "symbol";
    }
    function isPrimitive(arg) {
        return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || (typeof arg === "undefined" ? "undefined" : _typeOf(arg)) === "symbol" || typeof arg === "undefined";
    }
    function isError(e) {
        return getProtoStr(e) === "[object Error]" || e instanceof Error;
    }
    function isObject(arg) {
        return getProtoStr(arg) === "[object Object]";
    }
    function isDom(o) {
        if (!o) {
            return false;
        }
        if (!o.querySelectorAll || !o.querySelector) {
            return false;
        }
        if (isObject(document) && o === document) {
            return true;
        }
        if (typeof HTMLElement === "object") {
            return o instanceof HTMLElement;
        } else {
            return o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName === "string";
        }
    }
    function isRegExp(arg) {
        return getProtoStr(arg) === "[object RegExp]";
    }
    function isFunction(arg) {
        return typeof arg === "function";
    }
    function isDate(d) {
        return getProtoStr(d) === "[object Date]";
    }
    function isBoolean(arg) {
        return typeof arg === "boolean";
    }
    function isNull(arg) {
        return arg === null;
    }
    function isUndefined(arg) {
        return arg === void 0;
    }
    function isNullOrUndefined(arg) {
        return arg == null;
    }
    function isTrueEmpty(obj) {
        if (obj === undefined || obj === null || obj === "") return true;
        return isNumber(obj) && isNaN(obj);
    }
    function isEmpty(obj) {
        if (isTrueEmpty(obj)) return true;
        if (isRegExp(obj)) {
            return false;
        } else if (isDate(obj)) {
            return false;
        } else if (isError(obj)) {
            return false;
        } else if (isArray(obj)) {
            return obj.length === 0;
        } else if (isString(obj)) {
            return obj.length === 0;
        } else if (isNumber(obj)) {
            return obj === 0;
        } else if (isBoolean(obj)) {
            return !obj;
        } else if (isObject(obj)) {
            for(var key in obj){
                return false;
            }
            return true;
        }
        return false;
    }
    function isTruthyOrZero(arg) {
        return !!arg || arg === 0;
    }
});
