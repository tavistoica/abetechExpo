import React from "react";
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

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  onPress = () => {
    this.props.onPress(this.props.item, this.props.index);
  };

  onAddCart = (product) => {
    Toast.show({
      text1: "Item was added to Cart",
      position: "bottom",
      visibilityTime: 1000,
      autoHide: true,
      bottomOffset: 80,
    });
    this.props.setCart(product);
    this.props.cartTotal();
  };

  onLoaded = () => {
    this.setState({ loading: false });
  };

  render() {
    return (
      <Card
        containerStyle={{
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          width: "100%",
          // borderRadius: 10,
          padding: 0,
          flex: 1,
        }}
      >
        <View style={{ height: "100%" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: this.props.width,
              padding: 0,
              flex: 4,
            }}
            onLongPress={this.onLongPressItem}
            onPress={this.onPress}
            elevation={0}
          >
            <View
              style={{
                width: "100%",
                // borderRadius: 20,
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
                    this.props.item.photos == null ||
                    this.props.item.photos.length == null ||
                    this.props.item.photos.length === 0 ||
                    this.props.item.photos[0] == null
                      ? ""
                      : this.props.item.photos[0],
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
                {this.props.item.promotion_price ? (
                  <View
                    style={{
                      position: "absolute",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "red",
                      marginTop: "3%",
                      marginLeft: "3%",
                      padding: "2%",
                      // textAlign: "center",
                      // alignContent: "center",
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      {console.log(this.props.item.promotion_price)}On Sale
                    </Text>
                  </View>
                ) : null}
              </ImageBackground>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.titleInfo}>
                <Text
                  style={[styles.title, { color: Third_color() }]}
                  // numberOfLines={2}
                >
                  {this.props.item.title}
                </Text>
              </View>
              <View style={[styles.info, { paddingTop: "5%" }]}>
                <Text
                  style={[styles.brand, { color: Third_color() }]}
                  numberOfLines={1}
                >
                  {this.props.item.brand}
                </Text>
              </View>
              {this.props.item.promotion_price === null ||
              this.props.item.promotion_price === "" ? (
                <View style={styles.info}>
                  <Text
                    style={[
                      styles.price,
                      { color: "red", paddingBottom: "3%", paddingTop: "3%" },
                    ]}
                  >
                    ${this.props.item.price}
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
                      ${this.props.item.price}
                    </Text>
                    <Text
                      style={[
                        {
                          color: Fourth_color(),
                        },
                      ]}
                    >
                      (-
                      {((this.props.item.price -
                        this.props.item.promotion_price) /
                        this.props.item.price) *
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
                      ${this.props.item.promotion_price}
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
            onPress={() => this.onAddCart(this.props.item)}
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
      </Card>
    );
  }
}

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
    // backgroundColor : '#f00',
    textAlign: "center",
  },
  brand: {},
  price: {
    // fontWeight: "bold",
    fontSize: 20,
    // marginLeft: 8,
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
