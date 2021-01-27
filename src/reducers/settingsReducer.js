"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../actions/types");
var initialState = {
    colors: {},
    logo: "",
    errorMessage: null,
};
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types_1.GET_APP_SETTINGS:
            return __assign(__assign({}, state), { colors: action.payload.colors, logo: action.payload.logo.original, errorMessage: null });
        case types_1.SETTINGS_ERROR:
            return __assign(__assign({}, state), { colors: {}, errorMessage: action.payload });
        default:
            return state;
    }
});
