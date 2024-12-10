"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidChildren = void 0;
var react_1 = __importDefault(require("react"));
var getValidChildren = function (children) {
    return react_1.default.Children.toArray(children).filter(function (child) {
        return react_1.default.isValidElement(child);
    });
};
exports.getValidChildren = getValidChildren;
