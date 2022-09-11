/**
 * 替换html字符中的标签为指定字符
 * @param str - html文本
 * @param val - '' | 替换后的值
 * @return - 替换标签后的文本
 * */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_object_spread.mjs"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_object_spread.mjs"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.string = {}, global.objectSpreadMjs);
})(this, function(exports, _objectSpread) {
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
        replaceHtmlTags: function() {
            return replaceHtmlTags;
        },
        createRandString: function() {
            return createRandString;
        },
        byte2text: function() {
            return byte2text;
        },
        heightLightMatchString: function() {
            return heightLightMatchString;
        },
        getStringFirst: function() {
            return getStringFirst;
        },
        getStringLast: function() {
            return getStringLast;
        }
    });
    _objectSpread = _objectSpread.default;
    function replaceHtmlTags() {
        var str = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", val = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
        var reg = /(<\/?.+?\/?>|&nbsp;|&mdash;)/g;
        return str.replace(reg, val);
    }
    function createRandString() {
        var number = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
        return Array.from({
            length: number
        }).reduce(function(prev) {
            return prev + Math.random().toString(36).slice(2);
        }, "");
    }
    var KB = 1024;
    var MB = KB * 1024;
    var GB = MB * 1024;
    var TB = GB * 1024;
    var byte2textDefaultConfig = {
        precision: 1
    };
    var byte2text = function(byte, conf) {
        var cf = _objectSpread({}, byte2textDefaultConfig, conf);
        var s = "";
        if (byte >= TB) {
            s = "".concat((byte / TB).toFixed(cf.precision), "T");
        } else if (byte >= GB) {
            s = "".concat((byte / GB).toFixed(cf.precision), "G");
        } else if (byte >= MB) {
            s = "".concat((byte / MB).toFixed(cf.precision), "M");
        } else {
            s = "".concat((byte / KB).toFixed(cf.precision), "K");
        }
        return s;
    };
    byte2text.KB = KB;
    byte2text.MB = MB;
    byte2text.GB = GB;
    byte2text.TB = TB;
    var heightLightMatchStringDefaultConf = {
        color: "#F83D48"
    };
    function heightLightMatchString(str, regExp, conf) {
        if (!str || !regExp) return str || "";
        var cf = _objectSpread({}, heightLightMatchStringDefaultConf, conf);
        var reg = new RegExp(regExp, "g");
        return str.replace(reg, function(s) {
            return '<span style="color: '.concat(cf.color, '">').concat(s, "</span>");
        });
    }
    function getStringFirst() {
        var string = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : " ";
        if (!string) return "";
        return string.split(separator)[0];
    }
    function getStringLast() {
        var string = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : " ";
        if (!string) return "";
        var ls = string.split(separator);
        return ls[ls.length - 1];
    }
});
