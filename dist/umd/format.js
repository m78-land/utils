(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_object_spread.mjs"), require("@swc/helpers/src/_to_consumable_array.mjs"), require("./is.js"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_object_spread.mjs",
        "@swc/helpers/src/_to_consumable_array.mjs",
        "./is.js"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.format = {}, global.objectSpreadMjs, global.toConsumableArrayMjs, global.isJs);
})(this, function(exports, _objectSpread, _toConsumableArray, _isJs) {
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
        padSingleNumber: function() {
            return padSingleNumber;
        },
        validateFormatString: function() {
            return validateFormatString;
        },
        formatString: function() {
            return formatString;
        },
        unFormatString: function() {
            return unFormatString;
        },
        getFirstTruthyOrZero: function() {
            return getFirstTruthyOrZero;
        },
        vie: function() {
            return vie;
        }
    });
    _objectSpread = _objectSpread.default;
    _toConsumableArray = _toConsumableArray.default;
    function padSingleNumber(number) {
        if (number < 1) {
            return "00";
        }
        if (number < 10) {
            return "0" + String(number);
        }
        return String(number);
    }
    var validateFormatString = /^(\s?\d\s?,?)+$/;
    var defaultConfig = {
        delimiter: " ",
        repeat: false,
        lastRepeat: false,
        reverse: false
    };
    function getPatterns(str, pattern) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var ref = _objectSpread({}, defaultConfig, options), repeat = ref.repeat, lastRepeat = ref.lastRepeat, reverse = ref.reverse;
        if (!validateFormatString.test(pattern)) {
            console.warn("invalid pattern: ".concat(pattern, ", must match the /^[\\s?\\d\\s?,?]+$/ rule"));
            return;
        }
        // 生成模式数组
        var patterns = pattern.split(",").map(function(p) {
            return p.trim();
        }).filter(function(p) {
            return !!p;
        });
        if (!patterns.length) return;
        // 字符转为数组方便操作
        var strArr = reverse ? str.split("").reverse() : str.split("");
        // repeat处理
        if (repeat || lastRepeat) {
            // 传入模式能匹配到的最大长度
            var maxLength = patterns.reduce(function(prevIndex, index) {
                return prevIndex + Number(index);
            }, 0);
            // 需要额外填充的模式长度
            var fillLength;
            // 模式组最后一位，用于lastRepeat
            var lastPatter = Number(patterns[patterns.length - 1]);
            if (repeat) {
                // (字符长度 - 最大匹配长度) / 最大匹配长度
                fillLength = Math.ceil((strArr.length - maxLength) / maxLength);
            }
            if (lastRepeat) {
                // (字符长度 - 最大匹配长度) / 最后一位匹配符能匹配的长度
                fillLength = Math.ceil((strArr.length - maxLength) / lastPatter);
            }
            var originArr = lastRepeat ? [
                lastPatter
            ] : _toConsumableArray(patterns);
            Array.from({
                length: fillLength
            }).forEach(function() {
                patterns = _toConsumableArray(patterns).concat(_toConsumableArray(originArr));
            });
        }
        return {
            patterns: patterns,
            strArr: strArr
        };
    }
    function formatString(str, pattern) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var opt = _objectSpread({}, defaultConfig, options);
        var patternMeta = getPatterns(str, pattern, opt);
        if (!patternMeta) return;
        var patterns = patternMeta.patterns, strArr = patternMeta.strArr;
        patterns.reduce(function(prevPattern, _pattern, ind) {
            var currentIndex = prevPattern + Number(_pattern);
            // 替换位置为 前面所有pattern + 当前pattern + 已匹配次数
            var replaceIndex = currentIndex + ind;
            if (replaceIndex < strArr.length) {
                strArr.splice(replaceIndex, 0, opt.delimiter);
            }
            return currentIndex;
        }, 0);
        return opt.reverse ? strArr.reverse().join("") : strArr.join("");
    }
    function unFormatString(str, pattern) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var opt = _objectSpread({}, defaultConfig, options);
        var delimiter = opt.delimiter;
        var patternMeta = getPatterns(str, pattern, opt);
        if (!patternMeta) return;
        var patterns = patternMeta.patterns, strArr = patternMeta.strArr;
        patterns.reduce(function(prev, pt) {
            var index = Number(pt) + prev;
            /* 只在字符首位匹配时才执行替换, 在某些场景会有用（fr的input处理双向绑定时） */ if (strArr[index] === delimiter[0]) {
                strArr.splice(index, delimiter.length);
            }
            return index;
        }, 0);
        return opt.reverse ? strArr.reverse().join("") : strArr.join("");
    }
    function getFirstTruthyOrZero() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var arg = _step.value;
                if ((0, _isJs.isTruthyOrZero)(arg)) {
                    return arg;
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
        return false;
    }
    function vie(arg) {
        var feedback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "-";
        return (0, _isJs.isTruthyOrZero)(arg) ? arg : feedback;
    }
});
