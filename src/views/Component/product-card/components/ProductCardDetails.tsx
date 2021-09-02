import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  width,
  height,
} from "../../../Screens/cart-page/components/node_modules/react-native-dimension";
import DiscountPrice from "./DiscountPrice";

const ProductCardDetails = (props) => {
  const thirdColor = props.settings.colors.third_color;
  const price = props.item.data.promotion_price
    ? props.item.data.promotion_price
    : props.item.data.price;

  return (
    <>
      <Text style={[styles.title, { color: thirdColor }]}>
        {props.item.data.title}
      </Text>
      <Text style={{ color: thirdColor }} numberOfLines={1}>
        {props.item.data.brand}
      </Text>
      {props.item.data.promotion_price !== "" && <DiscountPrice {...props} />}
      <Text style={styles.price}>${price}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "red",
    paddingBottom: "5%",
  },
});

export default ProductCardDetails;
