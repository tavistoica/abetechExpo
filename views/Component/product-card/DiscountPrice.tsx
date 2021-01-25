import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DiscountPrice = (props) => {
  const fourthColor = props.settings.colors.fourth_color;
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
    },
    currentColor: {
      color: fourthColor,
    },
    textDec: {
      textDecorationLine: "line-through",
    },
  });
  return (
    <View style={styles.container}>
      <Text style={[styles.currentColor, styles.textDec]}>
        ${props.item.data.price}
      </Text>
      <Text style={styles.currentColor}>
        (-
        {((props.item.data.price - props.item.data.promotion_price) /
          props.item.data.price) *
          100}
        %)
      </Text>
    </View>
  );
};

export default DiscountPrice;
