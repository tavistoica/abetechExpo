"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var DiscountPrice = function (props) {
    var fourthColor = props.settings.colors.fourth_color;
    var styles = react_native_1.StyleSheet.create({
        container: {
            flexDirection: "row",
        },
        currentColor: {
            color: fourthColor,
        },
        textDec: {
            textDecorationLine: "line-through",
        },
    });
    return (<react_native_1.View style={styles.container}>
      <react_native_1.Text style={[styles.currentColor, styles.textDec]}>
        ${props.item.data.price}
      </react_native_1.Text>
      <react_native_1.Text style={styles.currentColor}>
        (-
        {((props.item.data.price - props.item.data.promotion_price) /
        props.item.data.price) *
        100}
        %)
      </react_native_1.Text>
    </react_native_1.View>);
};
exports.default = DiscountPrice;
