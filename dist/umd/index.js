(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_export_star.mjs"), require("./is.js"), require("./date.js"), require("./format.js"), require("./form.js"), require("./object.js"), require("./string.js"), require("./number.js"), require("./dom.js"), require("./function.js"), require("./lang.js"), require("./regexp.js"), require("./bom.js"), require("./array.js"), require("./common-type.js"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_export_star.mjs",
        "./is.js",
        "./date.js",
        "./format.js",
        "./form.js",
        "./object.js",
        "./string.js",
        "./number.js",
        "./dom.js",
        "./function.js",
        "./lang.js",
        "./regexp.js",
        "./bom.js",
        "./array.js",
        "./common-type.js"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.exportStarMjs, global.isJs, global.dateJs, global.formatJs, global.formJs, global.objectJs, global.stringJs, global.numberJs, global.domJs, global.functionJs, global.langJs, global.regexpJs, global.bomJs, global.arrayJs, global.commonTypeJs);
})(this, function(exports, _exportStar, _isJs, _dateJs, _formatJs, _formJs, _objectJs, _stringJs, _numberJs, _domJs, _functionJs, _langJs, _regexpJs, _bomJs, _arrayJs, _commonTypeJs) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    _exportStar = _exportStar.default;
    _exportStar(_isJs, exports);
    _exportStar(_dateJs, exports);
    _exportStar(_formatJs, exports);
    _exportStar(_formJs, exports);
    _exportStar(_objectJs, exports);
    _exportStar(_stringJs, exports);
    _exportStar(_numberJs, exports);
    _exportStar(_domJs, exports);
    _exportStar(_functionJs, exports);
    _exportStar(_langJs, exports);
    _exportStar(_regexpJs, exports);
    _exportStar(_bomJs, exports);
    _exportStar(_arrayJs, exports);
    _exportStar(_commonTypeJs, exports);
});
