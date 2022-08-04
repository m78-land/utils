(function(global1, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_to_consumable_array.mjs"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_to_consumable_array.mjs"
    ], factory);
    else if (global1 = typeof globalThis !== "undefined" ? globalThis : global1 || self) factory(global1.lang = {}, global1.toConsumableArrayMjs);
})(this, function(exports, _toConsumableArray) {
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
        getGlobal: function() {
            return getGlobal;
        },
        "__GLOBAL__": function() {
            return __GLOBAL__;
        },
        createEvent: function() {
            return createEvent;
        }
    });
    _toConsumableArray = _toConsumableArray.default;
    function getGlobal() {
        // eslint-disable-next-line no-restricted-globals
        if (typeof self !== "undefined") {
            // eslint-disable-next-line no-restricted-globals
            return self;
        }
        if (typeof window !== "undefined") {
            return window;
        }
        // @ts-ignore
        if (typeof global !== "undefined") {
            // @ts-ignore
            return global;
        }
        throw new Error("unable to locate global object");
    }
    var __GLOBAL__ = getGlobal();
    function createEvent() {
        var on = function on(listener) {
            listeners.push(listener);
        };
        var off = function off(listener) {
            var ind = listeners.indexOf(listener);
            if (ind !== -1) listeners.splice(ind, 1);
        };
        var emit = function emit() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            listeners.forEach(function(listener) {
                return listener.apply(void 0, _toConsumableArray(args));
            });
        };
        var listeners = [];
        return {
            on: on,
            off: off,
            emit: emit
        };
    }
});
