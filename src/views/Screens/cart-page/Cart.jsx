import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { setStripeConf } from "../../../utils/FirebaseHelper";
import stripe from "tipsi-stripe";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import TotalAndCheckout from "./components/TotalAndCheckout";
import OsWrapper from "../../Component/OsWrapper";
import SideViewHeader from "../../Component/SideViewHeader";
import CartContent from "./components/CartContent";

const Cart = (props) => {
  const [paymentEnabled, setPaymentEnabled] = useState(true);

  useEffect(() => {
    getCartProducts();
  }, []);

  const stripeConf = async () => {
    const settings = await setStripeConf();
    if (settings) {
      setPaymentEnabled(settings.payment_enabled);
      stripe.setOptions({
        publishableKey: settings.stripe_pub_key,
      });
    }
  };

  const getCartProducts = () => {
    props.getCart();
    props.cartTotal();
  };

  const clearCart = () => {
    props.clearCart(props.auth.id);
    this.getCartProducts();
  };

  return (
    <OsWrapper>
      <SideViewHeader {...props} name={"Cart"} redirect={"product_list"} />
      <View style={styles.content}>
        <CartContent {...props} />
      </View>
      <View style={styles.bottom}>
        <TotalAndCheckout {...props} />
      </View>
    </OsWrapper>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: "2%",
    paddingHorizontal: "2%",
  },
  content: {
    flex: 5,
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
)(Cart);
