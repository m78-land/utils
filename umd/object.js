(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./is.js"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./is.js"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.object = {}, global.isJs);
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
        shakeFalsy: function() {
            return shakeFalsy;
        },
        omit: function() {
            return omit;
        },
        pick: function() {
            return pick;
        },
        getNamePathValue: function() {
            return getNamePathValue;
        },
        stringifyNamePath: function() {
            return stringifyNamePath;
        },
        setNamePathValue: function() {
            return setNamePathValue;
        }
    });
    var shakeFalsy = function(source) {
        Object.keys(source).forEach(function(key) {
            var val = source[key];
            if (!val && val !== 0) {
                delete source[key];
            }
        });
        return source;
    };
    function pickOrOmit(obj, props) {
        var isPick = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        if ((0, _isJs.isString)(props)) {
            props = props.split(",").map(function(key) {
                return key.trim();
            });
        }
        var keys = Object.keys(obj);
        var result = {};
        keys.forEach(function(item) {
            var cond = isPick ? props.indexOf(item) !== -1 : props.indexOf(item) === -1;
            if (cond) {
                result[item] = obj[item];
            }
        });
        return result;
    }
    function omit(obj, props) {
        return pickOrOmit(obj, props);
    }
    function pick(obj, props) {
        return pickOrOmit(obj, props, true);
    }
    function getNamePathValue(obj, name) {
        if ((0, _isJs.isString)(name)) {
            return obj === null || obj === void 0 ? void 0 : obj[name];
        }
        if ((0, _isJs.isArray)(name) && name.length) {
            return name.reduce(function(p, i) {
                return p === null || p === void 0 ? void 0 : p[i];
            }, obj);
        }
    }
    function stringifyNamePath(name) {
        if ((0, _isJs.isString)(name)) return name;
        return name.reduce(function(p, i) {
            if ((0, _isJs.isNumber)(Number(i))) {
                return "".concat(p, "[").concat(i, "]");
            }
            if ((0, _isJs.isString)(i)) {
                return p.length ? "".concat(p, ".").concat(i) : i;
            }
            return p;
        }, "");
    }
    function setNamePathValue(obj, name, val) {
        if ((0, _isJs.isString)(name)) {
            obj[name] = val;
        }
        if ((0, _isJs.isArray)(name) && name.length) {
            var lastObj = obj;
            for(var i = 0; i < name.length; i++){
                var n = name[i]; // 当前name
                var nextN = name[i + 1]; // 下一个name
                var hasNextN = nextN !== undefined; // 是否有下个
                if (!hasNextN) {
                    lastObj[n] = val;
                    return;
                }
                // 确保要操作的对象存在
                if ((0, _isJs.isWeakNumber)(nextN)) {
                    if (!(0, _isJs.isArray)(lastObj[n])) {
                        lastObj[n] = [];
                    }
                // 不是数字的话则为对象
                } else if (!(0, _isJs.isObject)(lastObj[n])) {
                    lastObj[n] = {};
                }
                lastObj = lastObj[n];
            }
        }
    }
});
