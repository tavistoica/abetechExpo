import React from "react";
import { StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import Toast from "react-native-toast-message";

const ProductCartButton = (props) => {
  const onAddCart = (product) => {
    Toast.show({
      text1: "Item was added to Cart",
      position: "bottom",
      visibilityTime: 1000,
      autoHide: true,
      bottomOffset: 80,
    });
    props.setCart(product, true);
    props.cartTotal();
  };

  return (
    <Button
      style={styles.button}
      buttonStyle={{ backgroundColor: props.settings.colors.main_color }}
      onPress={() => onAddCart(props.item.data)}
      icon={
        <Icon name="shopping-cart" size={16} color="#fff" type="font-awesome" />
      }
      title=" Add to Cart"
    />
  );
};

const styles = StyleSheet.create({
  button: {
    paddingTop: 5,
    paddingHorizontal: 10,
    paddingBottom: 15,
    justifyContent: "flex-end",
  },
});

export default ProductCartButton;
