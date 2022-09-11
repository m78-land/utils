(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./is.js"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./is.js"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.form = {}, global.isJs);
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
        form2obj: function() {
            return form2obj;
        },
        obj2FormData: function() {
            return obj2FormData;
        }
    });
    function form2obj(el) {
        if (!(0, _isJs.isDom)(el)) {
            console.error("Please pass in the dom element");
            return {};
        }
        if (!el.querySelectorAll) {
            console.error("The passed in element does not support the querySelectorAll API");
            return {};
        }
        var tempObj = {};
        var inputs = el.querySelectorAll("input[name],select[name],textarea[name]");
        inputs = Array.prototype.slice.call(inputs);
        inputs.forEach(function(v) {
            // name => ""
            if (!v.name) return;
            if (v.type === "radio" || v.type === "checkbox") {
                if (!tempObj[v.name]) tempObj[v.name] = v.type === "checkbox" ? [] : "";
            }
            if (v.type === "radio") {
                v.checked && (tempObj[v.name] = v.value);
            } else if (v.type === "checkbox") {
                v.checked && tempObj[v.name].push(v.value);
            } else if (v.type === "file") {
                tempObj[v.name] = Array.prototype.slice.call(v.files);
            } else {
                tempObj[v.name] = v.value;
            }
        });
        return tempObj;
    }
    function obj2FormData(obj) {
        var keys = Object.keys(obj);
        var form = new FormData();
        keys.forEach(function(key) {
            if (Array.isArray(obj[key])) {
                obj[key].forEach(function(val) {
                    // form.append(`${key}[]`, val)
                    form.append(key, val);
                });
            } else if (obj[key]) {
                form.append(key, obj[key]);
            }
        });
        return form;
    }
});
