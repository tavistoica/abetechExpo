import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { Third_color, Fourth_color } from "../../Helper/Common";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Toast from "react-native-toast-message";
import { width, height } from "react-native-dimension";

const Product = (props) => {
  const [showModal, setShowModal] = useState(false);

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
      <View style={{ height: "100%" }}>
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
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
              flex: 1,
              justifyContent: "flex-start",
            }}
          >
            <ImageBackground
              source={{
                uri:
                  props.item.data.photos == null ||
                  props.item.data.photos.length == null ||
                  props.item.data.photos.length === 0 ||
                  props.item.data.photos[0] == null
                    ? ""
                    : props.item.data.photos[0].original,
              }}
              indicatorProps={{
                size: 30,
                borderWidth: 0,
                color: "rgba(150, 150, 150, 1)",
                unfilledColor: "rgba(200, 200, 200, 0.2)",
              }}
              style={{
                flex: 1,
                width: "100%",
                aspectRatio: 1,
                resizeMode: "contain",
              }}
            >
              {props.item.data.promotion_price ? (
                <View
                  style={{
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "red",
                    marginTop: "3%",
                    marginLeft: "3%",
                    padding: "2%",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    On Sale
                  </Text>
                </View>
              ) : null}
            </ImageBackground>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.titleInfo}>
              <Text style={[styles.title, { color: Third_color() }]}>
                {props.item.data.title}
              </Text>
            </View>
            <View style={[styles.info, { paddingTop: "5%" }]}>
              <Text
                style={[styles.brand, { color: Third_color() }]}
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
                        color: Fourth_color(),
                        textDecorationLine: "line-through",
                      },
                    ]}
                  >
                    ${props.item.data.price}
                  </Text>
                  <Text
                    style={[
                      {
                        color: Fourth_color(),
                      },
                    ]}
                  >
                    (-
                    {((props.item.data.price -
                      props.item.data.promotion_price) /
                      props.item.data.price) *
                      100}
                    %)
                  </Text>
                </View>
                <View style={styles.info}>
                  <Text
                    style={[
                      styles.price,
                      { color: "red", paddingBottom: "5%" },
                    ]}
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
          onPress={() => onAddCart(props.item.data)}
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
      </View>
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

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    sliderIndex: state.products.sliderIndex,
    sliderItem: state.products.sliderItem,
    cart: state.cart,
    auth: state.auth,
  };
};

export default connect(
  mapStateToProps,
  actions
)(Product);
