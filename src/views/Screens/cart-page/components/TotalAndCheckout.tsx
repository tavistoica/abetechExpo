import React from "react";
import { View, Text, StyleSheet } from "react-native";
import stripe from "tipsi-stripe";
import { Button, Icon } from "react-native-elements";

interface Colors {
  third_color: string;
  fourth_color: string;
}

interface Auth {
  id: string;
}

interface Props {
  thirdColor: string;
  fourthColor: string;
  total: number;
  cart: any;
  auth: Auth;
  clearCart: (id: string) => any;
  getCart: () => any;
  cartTotal: () => any;
}

const TotalAndCheckout = (props: Props) => {
  const requestPayment = () => {
    return stripe
      .paymentRequestWithCardForm()
      .then((stripeTokenInfo) => {
        console.warn("Token created", { stripeTokenInfo });
        // props.doCheckout(stripeTokenInfo.tokenId);
      })
      .catch((error) => {
        console.warn("Payment failed", { error });
      });
  };

  return (
    <>
      <View style={[styles.container]}>
        <Text style={[styles.totalText, { color: props.thirdColor }]}>
          Total :
        </Text>
        <Text style={[styles.total, { color: props.fourthColor }]}>{`$${
          props.total
        }`}</Text>
      </View>
      <Button
        onPress={requestPayment}
        icon={
          <Icon name="credit-card" size={16} color="#fff" type="font-awesome" />
        }
        title="CheckOut"
      />
    </>
  );
};

const styles = StyleSheet.create({
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
    paddingTop: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
    width: "100%",
    paddingBottom: 16,
  },
});

export default TotalAndCheckout;
