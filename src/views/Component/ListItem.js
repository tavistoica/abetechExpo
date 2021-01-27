"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var ListItem = function (props) {
    return (<react_native_1.TouchableOpacity onPress={function () {
        props.navigation.navigate(props.redirect);
    }}>
      <react_native_1.View style={[
        styles.container,
        { backgroundColor: props.settings.colors.main_color },
    ]}>
        <react_native_1.Text style={styles.text}>{props.text}</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.TouchableOpacity>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        marginBottom: 1,
        paddingVertical: 12,
        textAlignVertical: "center",
        color: "#fff",
    },
    text: {
        width: "100%",
        fontSize: 20,
        textAlign: "center",
        textAlignVertical: "center",
        color: "#fff",
    },
});
exports.default = ListItem;
