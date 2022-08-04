import _to_consumable_array from "@swc/helpers/src/_to_consumable_array.mjs";
/**
 * return the 'global' object according to different JS running environments
 * */ export function getGlobal() {
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
export var __GLOBAL__ = getGlobal();
/**
 * create a CustomEvent
 * */ export function createEvent() {
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
            return listener.apply(void 0, _to_consumable_array(args));
        });
    };
    var listeners = [];
    return {
        on: on,
        off: off,
        emit: emit
    };
}
