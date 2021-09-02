import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import Toast from "react-native-toast-message";
import { width, height } from "react-native-dimension";

const Product = (props) => {
  const onPress = () => {
    props.onPress(props.item, props.index);
  };

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

  console.log("props.item,", JSON.stringify(props.item));
  return (
    <Card
      containerStyle={{
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        width: "100%",
        padding: 0,
        flex: 1,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          width: props.width,
          padding: 0,
          flex: 4,
        }}
        onLongPress={props.onLongPressItem}
        onPress={() => onPress()}
        elevation={0}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.titleInfo}>
            <Text
              style={[
                styles.title,
                { color: props.settings.colors.third_color },
              ]}
            >
              {props.item.data.title}
            </Text>
          </View>
          <View style={[styles.info, { paddingTop: "5%" }]}>
            <Text
              style={[
                styles.brand,
                { color: props.settings.colors.third_color },
              ]}
              numberOfLines={1}
            >
              {props.item.data.brand}
            </Text>
          </View>
          {props.item.data.promotion_price === null ||
          props.item.data.promotion_price === "" ? (
            <View style={styles.info}>
              <Text
                style={[
                  styles.price,
                  { color: "red", paddingBottom: "3%", paddingTop: "3%" },
                ]}
              >
                ${props.item.data.price}
              </Text>
            </View>
          ) : (
            <View>
              <View style={[styles.info, { paddingTop: 5 }]}>
                <Text
                  style={[
                    {
                      color: props.settings.colors.fourth_color,
                      textDecorationLine: "line-through",
                    },
                  ]}
                >
                  ${props.item.data.price}
                </Text>
                <Text
                  style={[
                    {
                      color: props.settings.colors.fourth_color,
                    },
                  ]}
                >
                  (-
                  {((props.item.data.price - props.item.data.promotion_price) /
                    props.item.data.price) *
                    100}
                  %)
                </Text>
              </View>
              <View style={styles.info}>
                <Text
                  style={[styles.price, { color: "red", paddingBottom: "5%" }]}
                >
                  ${props.item.data.promotion_price}
                </Text>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <Button
        style={{
          paddingTop: 5,
          paddingHorizontal: 10,
          paddingBottom: 15,
          justifyContent: "flex-end",
        }}
        onPress={() =>
          onAddCart({ ...props.item.data, product_id: props.item.id })
        }
        icon={
          <Icon
            name="shopping-cart"
            size={16}
            color="#fff"
            type="font-awesome"
          />
        }
        title="   Add to Cart"
      />
      {/* <Modal isVisible={showModal} style={styles.modal}>
        <Bottom
          item={props.item.data}
          width={width(90)}
          page="favs"
          onAddCart={props.setCart(props.item.data)}
          close={() => setShowModal(false)}
        />
      </Modal> */}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modal: {
    width: width(100),
    height: height(100),
    backgroundColor: "#fff",
    margin: 0,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
  brand: {},
  price: {
    fontSize: 20,
  },
  info: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    paddingLeft: 4,
    paddingRight: 4,
  },
  titleInfo: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    paddingLeft: 4,
    paddingRight: 4,
  },
});

export default Product;
