import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import TotalAndCheckout from "./components/TotalAndCheckout";
import OsWrapper from "../../Component/OsWrapper";
import SideViewHeader from "../../Component/SideViewHeader";
import CartContent from "./components/CartContent";

const Cart = (props) => {
  useEffect(() => {
    getCartProducts();
  }, []);

  const getCartProducts = () => {
    props.getCart();
    props.cartTotal();
  };

  //  Not used
  const clearCart = () => {
    props.clearCart(props.auth.id);
    getCartProducts();
  };

  return (
    <OsWrapper>
      <SideViewHeader {...props} name={"Cart"} redirect={"product_list"} />
      <View style={styles.content}>
        <CartContent {...props} />
      </View>
      <View style={styles.bottom}>
        <TotalAndCheckout {...props} clearCart={clearCart} />
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
    stripeSettings: state.settings.stripe,
  };
};

export default connect(
  mapStateToProps,
  actions
)(Cart);
