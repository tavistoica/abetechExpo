import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useConfirmPayment, StripeProvider } from "@stripe/stripe-react-native";
import RBSheet from "react-native-raw-bottom-sheet";
//  @ts-ignore
import { height } from "react-native-dimension";
import StripeCheckout from "./StripeCheckout";
import { navigationRef } from "../../../Component/RootNavigation";

interface Colors {
  third_color: string;
  fourth_color: string;
}

interface Auth {
  id: string;
  email: string;
}

interface Props {
  thirdColor: string;
  fourthColor: string;
  total: number;
  cart: any;
  auth: Auth;
  stripeSettings: any;
  navigation: any;
  clearCart: () => void;
  getCart: () => any;
  cartTotal: () => any;
}

const TotalAndCheckout = (props: Props) => {
  const { loading } = useConfirmPayment();
  let stripeCheckoutRef = useRef(null);

  const openModal = (email: string, navigation: any) => {
    if (email) {
      //  @ts-ignore
      stripeCheckoutRef.open();
    } else {
      navigation.navigate("profile");
    }
  };

  const closeModal = () => {
    //  @ts-ignore
    stripeCheckoutRef.close();
  };

  return (
    <StripeProvider publishableKey={props.stripeSettings.pub_key}>
      <View style={[styles.container]}>
        <Text style={[styles.totalText, { color: props.thirdColor }]}>
          Total :
        </Text>
        <Text style={[styles.total, { color: props.fourthColor }]}>{`$${
          props.total
        }`}</Text>
      </View>
      <Button
        disabled={loading}
        title="Checkout"
        onPress={() => openModal(props.auth.email, props.navigation)}
      />
      <RBSheet
        ref={(ref) => {
          //  @ts-ignore
          stripeCheckoutRef = ref;
        }}
        height={height(50)}
        closeOnDragDown={true}
      >
        <StripeCheckout
          user={props.auth}
          items={props.cart}
          closeModal={() => closeModal()}
          clearCart={() => props.clearCart()}
          navigation={props.navigation}
        />
      </RBSheet>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  total: {
    fontSize: 16,
    fontWeight: "bold",
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
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default TotalAndCheckout;
