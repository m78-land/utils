(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_to_consumable_array.mjs"), require("./is.js"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_to_consumable_array.mjs",
        "./is.js"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.array = {}, global.toConsumableArrayMjs, global.isJs);
})(this, function(exports, _toConsumableArray, _isJs) {
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
        swap: function() {
            return swap;
        },
        move: function() {
            return move;
        },
        ensureArray: function() {
            return ensureArray;
        },
        uniq: function() {
            return uniq;
        },
        uniqWith: function() {
            return uniqWith;
        }
    });
    _toConsumableArray = _toConsumableArray.default;
    function swap(arr, sourceInd, targetInd) {
        if (sourceInd < 0 || targetInd < 0) return arr;
        if (sourceInd > arr.length - 1 || targetInd > arr.length - 1) return arr;
        arr.splice(targetInd, 1, arr.splice(sourceInd, 1, arr[targetInd])[0]);
        return arr;
    }
    function move(array, form, to) {
        var _array;
        if (form < 0 || to < 0) return array;
        if (form > array.length - 1 || to > array.length - 1) return array;
        (_array = array).splice.apply(_array, [
            to,
            0
        ].concat(_toConsumableArray(array.splice(form, 1))));
        return array;
    }
    function ensureArray(val) {
        return (0, _isJs.isArray)(val) ? val : [
            val
        ];
    }
    function uniq(array) {
        var arr = [];
        array.forEach(function(it) {
            if (arr.indexOf(it) === -1) {
                arr.push(it);
            }
        });
        return arr;
    }
    function uniqWith(array, comparator) {
        var arr = [];
        array.forEach(function(it) {
            var flag = false;
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var item = _step.value;
                    if (comparator(item, it)) {
                        flag = true;
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            if (!flag) {
                arr.push(it);
            }
        });
        return arr;
    }
});
