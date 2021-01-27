"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_elements_1 = require("react-native-elements");
var react_native_toast_message_1 = __importDefault(require("react-native-toast-message"));
var ProductCartButton = function (props) {
    var onAddCart = function (product) {
        react_native_toast_message_1.default.show({
            text1: "Item was added to Cart",
            position: "bottom",
            visibilityTime: 1000,
            autoHide: true,
            bottomOffset: 80,
        });
        props.setCart(product, true);
        props.cartTotal();
    };
    return (<react_native_elements_1.Button style={{
        paddingTop: 5,
        paddingHorizontal: 10,
        paddingBottom: 15,
        justifyContent: "flex-end",
    }} onPress={function () { return onAddCart(props.item.data); }} icon={<react_native_elements_1.Icon name="shopping-cart" size={16} color="#fff" type="font-awesome"/>} title="   Add to Cart"/>);
};
exports.default = ProductCartButton;
