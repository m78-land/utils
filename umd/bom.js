(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports);
    else if (typeof define === "function" && define.amd) define([
        "exports"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.bom = {});
})(this, function(exports) {
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
        setStorage: function() {
            return setStorage;
        },
        getStorage: function() {
            return getStorage;
        }
    });
    var storagePrefix = "UTIL_STORAGE_";
    function setStorage(key, val) {
        localStorage.setItem("".concat(storagePrefix).concat(key).toUpperCase(), JSON.stringify(val));
    }
    function getStorage(key) {
        var s = localStorage.getItem("".concat(storagePrefix).concat(key).toUpperCase());
        if (!s) return null;
        return JSON.parse(s);
    }
});
