import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import AddToCartButton from "./components/AddToCartButton";
import ProductImage from "./components/ProductImage";
import AddToFavorite from "../AddToFavorite";
import OnSaleTag from "./components/OnSaleTag";
import ProductCardDetails from "./components/ProductCardDetails";

const ProductCard = (props: any) => {
  const onPress = () => {
    props.navigation.navigate("detailshow", {
      product: props.item,
      btnflag: true,
      close: () => {
        props.navigation.navigate("product_list");
      },
    });
  };

  return (
    <Card containerStyle={styles.containerStyle}>
      <TouchableOpacity
        style={[styles.container, { width: props.width }]}
        onPress={onPress}
      >
        <ProductImage photo={props.item.data.photos[0].original} {...props}>
          <AddToFavorite
            {...props}
            style={{
              alignItems: "flex-end",
              marginRight: "2%",
              marginTop: "2%",
            }}
          />
          <OnSaleTag {...props} />
        </ProductImage>
        <ProductCardDetails {...props} />
      </TouchableOpacity>
      <AddToCartButton {...props} />
    </Card>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderColor: "white",
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

export default ProductCard;
