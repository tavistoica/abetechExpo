"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var AddToCartButton_1 = __importDefault(require("./components/AddToCartButton"));
var ProductImage_1 = __importDefault(require("./components/ProductImage"));
var AddToFavorite_1 = __importDefault(require("../AddToFavorite"));
var OnSaleTag_1 = __importDefault(require("./components/OnSaleTag"));
var ProductCardDetails_1 = __importDefault(require("./components/ProductCardDetails"));
var ProductCard = function (props) {
    var onPress = function () {
        props.navigation.navigate("detailshow", {
            product: props.item,
            btnflag: true,
            close: function () {
                props.navigation.navigate("product_list");
            },
        });
    };
    return (<react_native_elements_1.Card containerStyle={styles.containerStyle}>
      <react_native_1.TouchableOpacity style={[styles.container, { width: props.width }]} onPress={onPress}>
        <ProductImage_1.default photo={props.item.data.photos[0].original} {...props}>
          <AddToFavorite_1.default {...props} style={{
        alignItems: "flex-end",
        marginRight: "2%",
        marginTop: "2%",
    }}/>
          <OnSaleTag_1.default {...props}/>
        </ProductImage_1.default>
        <ProductCardDetails_1.default {...props}/>
      </react_native_1.TouchableOpacity>
      <AddToCartButton_1.default {...props}/>
    </react_native_elements_1.Card>);
};
var styles = react_native_1.StyleSheet.create({
    containerStyle: {
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        width: "100%",
        padding: 0,
        flex: 1,
    },
    container: {
        alignItems: "center",
        flexDirection: "column",
        flex: 1,
    },
});
exports.default = ProductCard;
