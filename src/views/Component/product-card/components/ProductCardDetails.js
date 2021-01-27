"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var DiscountPrice_1 = __importDefault(require("./DiscountPrice"));
var ProductCardDetails = function (props) {
    var thirdColor = props.settings.colors.third_color;
    var price = props.item.data.promotion_price
        ? props.item.data.promotion_price
        : props.item.data.price;
    return (<>
      <react_native_1.Text style={[styles.title, { color: thirdColor }]}>
        {props.item.data.title}
      </react_native_1.Text>
      <react_native_1.Text style={{ color: thirdColor }} numberOfLines={1}>
        {props.item.data.brand}
      </react_native_1.Text>
      {props.item.data.promotion_price !== "" && <DiscountPrice_1.default {...props}/>}
      <react_native_1.Text style={styles.price}>${price}</react_native_1.Text>
    </>);
};
var styles = react_native_1.StyleSheet.create({
    title: {
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
    },
    price: {
        fontSize: 20,
        color: "red",
        paddingBottom: "5%",
    },
});
exports.default = ProductCardDetails;
