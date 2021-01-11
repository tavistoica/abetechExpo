import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
} from "react-native";
import { Button, Icon, Divider } from "react-native-elements";
import { width, height } from "react-native-dimension";
import Entypo from "react-native-vector-icons/Entypo";
import {
  Main_color,
  Secondary_color,
  Third_color,
  Fourth_color,
} from "../../Helper/Common";
import Spinner from "react-native-loading-spinner-overlay";
import CartProduct from "../Component/CartProduct";
import HttpHelper from "../../Helper/HttpHelper";
import { setStripeConf } from "../../Helper/FirebaseHelper";
import stripe from "tipsi-stripe";
import { connect } from "react-redux";
import * as actions from "../../actions";

class MyCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      loading: false,
      showModal: false,
      payment_enabled: true,
      total: 0,
      cur_product: {},
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
    this.stripeConf();
    this.props.getCart();
    this.getCartProducts();
    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.stripeConf();
      this.getCartProducts();
    });
  };

  getCartProducts = () => {
    this.setState({ loading: true });
    this.props.getCart();
    this.setState({ loading: false });
    this.props.cartTotal();
  };

  rmvCartItem = (product_id) => {
    this.props.deleteCart(this.props.auth.id, product_id);
  };

  goDetail = (item) => {
    this.setState({ showModal: true, cur_product: item });
  };

  onMinus = (item) => {
    this.props.setCart(item, false);
    this.props.cartTotal();
  };

  onPlus = (item) => {
    this.props.setCart(item, true);
    this.props.cartTotal();
  };

  onRmv = (item) => {
    this.props.deleteCartItem(item);
    this.props.cartTotal();
  };

  doCheckout = (tokenId) => {
    this.setState({ loading: true });
    let checkout_items = [];
    for (let i = 0; i < this.props.cart.length; i++) {
      checkout_items.push({
        product_id: this.props.cart[i].data.id,
        quantity: this.state.cart[i].data.quantity,
      });
    }
    HttpHelper.doPost(
      "stripe/checkout",
      {
        user: this.props.auth,
        items: checkout_items,
        tokenId: tokenId,
      },
      (data) => {
        if (data.status === "success") {
          this.clearCart();
          alert(
            "You paid successfully to buy these products. \n Please leave your address in message box for delivery."
          );
          this.setState({ status: "success", loading: false });
        } else {
          if (data.data != null && data.data.raw != null) {
            alert(data.data.raw.message);
          }
          this.setState({ status: "failed", loading: false });
        }
        console.log("payment result : ", data);
      },
      (err) => {
        alert(err);
        this.setState({ status: err.message, loading: false });
      }
    );
  };

  clearCart = () => {
    this.props.clearCart(this.props.auth.id);
    this.getCartProducts();
  };

  requestPayment = () => {
    return stripe
      .paymentRequestWithCardForm()
      .then((stripeTokenInfo) => {
        console.warn("Token created", { stripeTokenInfo });
        this.doCheckout(stripeTokenInfo.tokenId);
      })
      .catch((error) => {
        console.warn("Payment failed", { error });
      });
  };

  header = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.openDrawer();
          }}
          style={styles.menu}
        >
          <Entypo name="menu" size={32} color={Secondary_color()} />
        </TouchableOpacity>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              fontSize: 20,
              color: Secondary_color(),
              fontWeight: "bold",
            }}
          >
            My Cart
          </Text>
        </View>
        <TouchableOpacity
          style={{ width: 30, marginRight: 15 }}
          onPress={() => this.clearCart()}
        >
          <Entypo name="shopping-basket" size={22} color={Secondary_color()} />
        </TouchableOpacity>
      </>
    );
  };

  CheckoutAndTotal = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            fontSize: 15,
            fontWeight: "bold",
            marginTop: 5,
            width: "100%",
            paddingBottom: 16,
            color: Third_color(),
          }}
        >
          <Text
            style={{
              fontSize: 15,
              justifyContent: "flex-start",
              fontWeight: "bold",
              marginTop: 5,
              paddingBottom: 16,
              color: Third_color(),
              width: "85%",
            }}
          >
            Total :
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: Fourth_color(),
              fontWeight: "bold",
              marginTop: 5,
              justifyContent: "flex-end",
            }}
          >
            {` ${this.props.total}`}
          </Text>
        </View>
        <Button
          onPress={this.requestPayment}
          icon={
            <Icon
              name="credit-card"
              size={16}
              color="#fff"
              type="font-awesome"
            />
          }
          disabled={!this.state.payment_enabled}
          title="CheckOut"
        />
      </>
    );
  };

  cartContent = () => {
    return (
      <>
        <Spinner visible={this.state.loading} />
        <View style={styles.container}>
          {this.props.cart.length === 0 ? (
            <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 5 }}>
              Cart is empty
            </Text>
          ) : (
            <>
              <FlatList
                data={this.props.cart}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: "column" }}>
                    <CartProduct
                      onPress={this.goDetail}
                      onMinus={this.onMinus}
                      onPlus={this.onPlus}
                      onRmv={this.onRmv}
                      item={item}
                    />
                    <Divider />
                  </View>
                )}
                //Setting the number of column
                contentContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
                style={{ width: width(100) }}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
              />
              {Platform.OS === "ios" ? (
                <SafeAreaView style={styles.CheckoutAndTotal}>
                  <Divider />
                  {this.CheckoutAndTotal()}
                </SafeAreaView>
              ) : (
                <View style={styles.CheckoutAndTotal}>
                  <Divider />
                  {this.CheckoutAndTotal()}
                </View>
              )}
            </>
          )}
        </View>
      </>
    );
  };

  render() {
    return (
      <>
        {Platform.OS === "ios" ? (
          <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
            {this.cartContent()}
          </SafeAreaView>
        ) : (
          <View style={{ flex: 1, flexDirection: "column" }}>
            {this.cartContent()}
          </View>
        )}
      </>
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
  menu: {
    paddingLeft: 10,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    width: width(100),
    height: 55,
    backgroundColor: Main_color(),
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
  banner_container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  list_container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
  title_label: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft: 24,
    marginBottom: 24,
  },
  title: {},
  searchBar: {
    flex: 1,
    width: "100%",
  },
  formItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  submit_btn: {
    height: 45,
    width: width(75),
    marginTop: 10,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    total: state.cart.cartTotal,
    auth: state.auth,
  };
};

export default connect(
  mapStateToProps,
  actions
)(MyCart);
