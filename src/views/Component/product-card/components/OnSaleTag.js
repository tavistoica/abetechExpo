"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var OnSaleTag = function (props) {
    return (<>
      {props.item.data.promotion_price ? (<react_native_1.View style={styles.container}>
          <react_native_1.Text style={styles.text}>On Sale</react_native_1.Text>
        </react_native_1.View>) : null}
    </>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        marginTop: "3%",
        marginLeft: "3%",
        padding: "2%",
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
    },
});
exports.default = OnSaleTag;
