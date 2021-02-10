import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Button } from "react-native-elements";
import { width } from "react-native-dimension";
import ProductImage from "../../../Component/product-card/components/ProductImage";

const CartProduct = (props) => {
  const [loading, setLoading] = useState(true);

  const onPress = () => {
    props.onPress(props.item);
  };

  const onLoaded = () => {
    setLoading(false);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 120,
        width: width(95),
        padding: 0,
      }}
      onPress={onPress}
      elevation={2}
    >
      <ProductImage photo={props.item.photos[0].original} {...props} />
      <View
        style={{
          flex: 1,
          padding: 8,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <View style={styles.info}>
          <Text
            style={[styles.title, { color: props.settings.colors.third_color }]}
            numberOfLines={1}
          >
            {props.item.title}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.brand} numberOfLines={1}>
              {props.item.brand}
            </Text>
            <View style={{ flex: 1 }} />
            {props.item.promotion_price == null ||
            props.item.promotion_price == "" ? (
              <Text
                style={[
                  styles.price,
                  { color: props.settings.colors.fourth_color },
                ]}
              >
                ${props.item.price}
              </Text>
            ) : (
              <Text
                style={[
                  styles.price,
                  { color: props.settings.colors.fourth_color },
                ]}
              >
                ${props.item.promotion_price}
              </Text>
            )}
          </View>
        </View>
        <View style={{ flex: 1 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", marginRight: 16 }}>
            <Button
              type="outline"
              icon={
                <Icon
                  size={18}
                  color={props.settings.colors.third_color}
                  name="minus"
                  type="font-awesome"
                />
              }
              onPress={() => props.onMinus(props.item)}
            />
            <Text
              style={[
                styles.brand,
                {
                  color: props.settings.colors.third_color,
                  textAlignVertical: "center",
                  width: 28,
                  textAlign: "center",
                },
              ]}
              numberOfLines={1}
            >
              {props.item.quantity}
            </Text>
            <Button
              type="outline"
              icon={
                <Icon
                  size={18}
                  color={props.settings.colors.third_color}
                  name="plus"
                  type="font-awesome"
                />
              }
              onPress={() => props.onPlus(props.item)}
            />
          </View>
          <Button
            type="outline"
            icon={
              <Icon
                size={18}
                color={props.settings.colors.third_color}
                name="trash"
                type="font-awesome"
              />
            }
            onPress={() => props.onRmv(props.item)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bgImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    width: "100%",
    fontSize: 16,
    textAlign: "left",
  },
  brand: {},
  price: {
    fontWeight: "bold",
    marginLeft: 8,
  },
  info: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    paddingLeft: 4,
    paddingRight: 4,
    width: "100%",
  },
});

export default CartProduct;
