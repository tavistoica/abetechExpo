"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var tipsi_stripe_1 = __importDefault(require("tipsi-stripe"));
var react_native_elements_1 = require("react-native-elements");
var TotalAndCheckout = function (props) {
    var requestPayment = function () {
        return tipsi_stripe_1.default
            .paymentRequestWithCardForm()
            .then(function (stripeTokenInfo) {
            console.warn("Token created", { stripeTokenInfo: stripeTokenInfo });
            // props.doCheckout(stripeTokenInfo.tokenId);
        })
            .catch(function (error) {
            console.warn("Payment failed", { error: error });
        });
    };
    return (<>
      <react_native_1.View style={[styles.container]}>
        <react_native_1.Text style={[styles.totalText, { color: props.thirdColor }]}>
          Total :
        </react_native_1.Text>
        <react_native_1.Text style={[styles.total, { color: props.fourthColor }]}>{"$" + props.total}</react_native_1.Text>
      </react_native_1.View>
      <react_native_elements_1.Button onPress={requestPayment} icon={<react_native_elements_1.Icon name="credit-card" size={16} color="#fff" type="font-awesome"/>} title="CheckOut"/>
    </>);
};
var styles = react_native_1.StyleSheet.create({
    total: {
        fontSize: 16,
        fontWeight: "bold",
        // marginTop: 5,
        flex: 5,
        textAlign: "right",
    },
    totalText: {
        fontSize: 15,
        flex: 1,
        fontWeight: "bold",
        marginTop: 1,
        paddingBottom: 16,
        width: "85%",
    },
    container: {
        flexDirection: "row",
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 5,
        width: "100%",
        paddingBottom: 16,
    },
});
exports.default = TotalAndCheckout;
