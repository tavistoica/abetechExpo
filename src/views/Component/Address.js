"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var react_redux_1 = require("react-redux");
var actions = __importStar(require("../../actions"));
var Feather_1 = __importDefault(require("react-native-vector-icons/Feather"));
var Address = function (props) {
    return (<react_native_1.View style={[
        styles.Container,
        { backgroundColor: props.settings.colors.secondary_color },
    ]}>
      <react_native_1.View style={{ flexDirection: "row", justifyContent: "center" }}>
        <react_native_1.View style={{ flex: 6, flexDirection: "column" }}>
          <react_native_1.Text style={styles.StreetStyle}>{props.address.street}</react_native_1.Text>
          <react_native_1.Text style={styles.others}>City: {props.address.city}</react_native_1.Text>
          <react_native_1.Text style={styles.others}>County: {props.address.county}</react_native_1.Text>
          <react_native_1.Text style={styles.others}>Country: {props.address.country}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.TouchableOpacity style={{ flex: 1, justifyContent: "center" }} onPress={function () { return props.deleteAddress(props.auth.id, props.address.id); }}>
          <Feather_1.default name="trash" size={32} color={"red"}/>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    Container: {
        paddingLeft: 10,
        paddingVertical: 10,
    },
    StreetStyle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    others: {
        paddingRight: 5,
    },
});
var mapStatetoProps = function (state) {
    return {
        auth: state.auth,
        settings: state.settings,
    };
};
exports.default = react_redux_1.connect(mapStatetoProps, actions)(Address);
