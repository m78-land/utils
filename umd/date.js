(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./format.js"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./format.js"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.date = {}, global.formatJs);
})(this, function(exports, _formatJs) {
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
        parseDate: function() {
            return parseDate;
        },
        datetime: function() {
            return datetime;
        },
        getDateCountDown: function() {
            return getDateCountDown;
        },
        isBetweenDate: function() {
            return isBetweenDate;
        }
    });
    function parseDate(date) {
        var d = date;
        if (typeof date === "string") {
            d = date.replace(/-/g, "/"); // Safari无法解析 2020-01-01 格式的日期
        }
        d = new Date(d);
        // 处理Invalid Date
        if (d instanceof Date && isNaN(d.getTime())) {
            return null;
        }
        return d;
    }
    function datetime() {
        var date = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : new Date(), format = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "YYYY-MM-DD hh:mm:ss";
        var d = parseDate(date);
        if (!d) {
            return "";
        }
        var fn = function(d) {
            return ("0" + d).slice(-2);
        };
        var formats = {
            YY: String(d.getFullYear() + 1).slice(2),
            YYYY: d.getFullYear(),
            MM: fn(d.getMonth() + 1),
            DD: fn(d.getDate()),
            hh: fn(d.getHours()),
            mm: fn(d.getMinutes()),
            ss: fn(d.getSeconds())
        };
        return format.replace(/([a-z])\1+/gi, function(a) {
            return formats[a] || a;
        });
    }
    var oneMS = 100;
    var oneS = oneMS * 10;
    var oneM = 60 * oneS;
    var oneH = 60 * oneM;
    var oneD = 24 * oneH;
    function getDateCountDown(date) {
        var dt = parseDate(date);
        if (!dt) {
            return {
                ms: "00",
                s: "00",
                m: "00",
                h: "00",
                d: "00",
                timeOut: true
            };
        }
        var start = Date.now();
        var end = dt.getTime();
        var diff = end - start;
        if (diff < 0) {
            return getDateCountDown();
        }
        var fr = Math.floor;
        // h、m、s 用单位总数取余就是该单位对应的ms，除单位总数获得单位
        var d = fr(diff / oneD);
        var h = fr(diff % oneD / oneH);
        var m = fr(diff % oneH / oneM);
        var s = fr(diff % oneM / oneS);
        var ms = fr(diff % oneMS);
        return {
            d: (0, _formatJs.padSingleNumber)(d),
            h: (0, _formatJs.padSingleNumber)(h),
            m: (0, _formatJs.padSingleNumber)(m),
            s: (0, _formatJs.padSingleNumber)(s),
            ms: (0, _formatJs.padSingleNumber)(ms),
            timeOut: false
        };
    }
    function isBetweenDate(startDate, endDate, currentDate) {
        var s = parseDate(startDate);
        var e = parseDate(endDate);
        if (!s || !e) return false;
        if (currentDate) {
            var c = parseDate(currentDate);
            if (!c) return false;
            return c <= e && c >= s;
        }
        var c1 = new Date();
        return c1 <= e && c1 >= s;
    }
});
