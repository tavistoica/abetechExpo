"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var ProductImage = function (props) {
    return (<react_native_1.View style={[styles.container, { width: props.width }]}>
      <react_native_1.ImageBackground source={{
        uri: props.photo && props.photo,
    }} style={styles.image}>
        {props.children}
      </react_native_1.ImageBackground>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        flex: 1,
        width: "100%",
        aspectRatio: 1,
        resizeMode: "center",
    },
});
exports.default = ProductImage;
