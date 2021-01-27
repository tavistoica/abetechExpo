"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var Feather_1 = __importDefault(require("react-native-vector-icons/Feather"));
var SideViewHeader = function (props) {
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.name}>
        <react_native_1.Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 8 }}>
          {props.name}
        </react_native_1.Text>
      </react_native_1.View>
      <react_native_1.TouchableOpacity onPress={function () {
        props.navigation.navigate(props.redirect);
    }} style={{ marginLeft: "5%", position: "absolute" }}>
        <Feather_1.default name="arrow-left" size={32} color={props.settings.colors.third_color}/>
      </react_native_1.TouchableOpacity>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        textAlignVertical: "center",
        textAlign: "center",
        width: "100%",
        marginBottom: "5%",
    },
    name: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlignVertical: "center",
    },
});
exports.default = SideViewHeader;
