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
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var react_native_dimension_1 = require("react-native-dimension");
var CartProduct_1 = __importDefault(require("../CartProduct"));
var CartContent = function (props) {
    var _a = react_1.useState(false), showModal = _a[0], setShowModal = _a[1];
    var _b = react_1.useState({}), currentProduct = _b[0], setCurrentProduct = _b[1];
    react_1.useEffect(function () {
        props.getCart();
    }, []);
    var goDetail = function (item) {
        setShowModal(true);
        setCurrentProduct(item);
    };
    var onMinus = function (item) {
        props.setCart(item, false);
        props.cartTotal();
    };
    var onPlus = function (item) {
        props.setCart(item, true);
        props.cartTotal();
    };
    var onRmv = function (item) {
        props.deleteCartItem(item);
        props.cartTotal();
    };
    return (<react_native_1.View style={styles.container}>
      {props.cart.length === 0 ? (<react_native_1.Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 5 }}>
          Cart is empty
        </react_native_1.Text>) : (<>
          <react_native_1.FlatList data={props.cart} renderItem={function (_a) {
        var item = _a.item;
        return (<react_native_1.View style={{ flexDirection: "column" }}>
                <CartProduct_1.default onPress={goDetail} onMinus={onMinus} onPlus={onPlus} onRmv={onRmv} item={item} {...props}/>
                <react_native_elements_1.Divider />
              </react_native_1.View>);
    }} 
    //Setting the number of column
    contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
    }} style={{ width: react_native_dimension_1.width(100) }} numColumns={1} keyExtractor={function (item, index) { return index.toString(); }}/>
        </>)}
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    CheckoutAndTotal: {
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
        marginBottom: 20,
    },
    menu: {
        paddingLeft: 10,
    },
    container: {
        flex: 16,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 30,
        paddingRight: 30,
        width: react_native_dimension_1.width(100),
    },
});
exports.default = CartContent;
