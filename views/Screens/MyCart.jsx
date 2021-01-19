import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { width } from "react-native-dimension";
import Entypo from "react-native-vector-icons/Entypo";
import { setStripeConf } from "../../Helper/FirebaseHelper";
import stripe from "tipsi-stripe";
import { connect } from "react-redux";
import * as actions from "../../actions";
import TotalAndCheckout from "../Component/cart/TotalAndCheckout";
import OsWrapper from "../Component/OsWrapper";
import SideViewHeader from "../Component/SideViewHeader";
import CartContent from "../Component/cart/CartContent";

class MyCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment_enabled: true,
      total: 0,
      products: [],
    };
  }

  async stripeConf() {
    const settings = await setStripeConf();
    if (settings) {
      this.setState({ payment_enabled: settings.payment_enabled });
      stripe.setOptions({
        publishableKey: settings.stripe_pub_key,
      });
    }
  }

  componentDidMount = () => {
    // this.stripeConf();
    this.getCartProducts();
  };

  getCartProducts = () => {
    this.props.getCart();
    this.props.cartTotal();
  };

  clearCart = () => {
    this.props.clearCart(this.props.auth.id);
    this.getCartProducts();
  };

  render() {
    return (
      <OsWrapper>
        <SideViewHeader
          {...this.props}
          name={"Cart"}
          redirect={"product_list"}
        />
        <CartContent {...this.props} />
        <View style={styles.bottom}>
          <TotalAndCheckout {...this.props} />
        </View>
      </OsWrapper>
    );
  }
}

const styles = StyleSheet.create({
  CheckoutAndTotal: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: "2%",
    paddingHorizontal: "2%",
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
    width: width(100),
  },
});

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    total: state.cart.cartTotal,
    auth: state.auth,
    settings: state.settings,
    mainColor: state.settings.colors.main_color,
    secondaryColor: state.settings.colors.secondary_color,
    thirdColor: state.settings.colors.third_color,
    fourthColor: state.settings.colors.fourth_color,
  };
};

export default connect(
  mapStateToProps,
  actions
)(MyCart);
