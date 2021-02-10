import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import { width, height } from "react-native-dimension";
import { SliderBox } from "react-native-image-slider-box";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import SideViewHeader from "../../Component/SideViewHeader";
import OsWrapper from "../../Component/OsWrapper";

const ProductDetailShow = (props) => {
  const [images, setImages] = useState([]);
  const item = props.route.params.product;
  const tmpImages = [];

  useEffect(() => {
    item.data.photos.map((photo, index) => {
      tmpImages.push({ uri: photo.original });
    });
    setImages(tmpImages);
  }, []);
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <OsWrapper>
        <SideViewHeader redirect="product_list" {...props} />
      </OsWrapper>
      <View style={styles.info}>
        <ScrollView>
          <SliderBox
            ImageComponentStyle={{
              width: "100%",
              height: height(40),
              backgroundColor: "#fff",
              marginTop: 5,
            }}
            images={images}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            dotStyle={{
              width: 12,
              height: 12,
              borderRadius: 12,
              marginHorizontal: 10,
              padding: 0,
              margin: 0,
            }}
          />
          <View style={styles.row}>
            <Text
              style={[
                styles.info_data,
                { color: props.settings.colors.third_color },
              ]}
            >
              {item.data.title}
            </Text>
          </View>
          <View style={styles.row}>
            {item.data.promotion_price == null ||
            item.data.promotion_price == "" ? (
              <Text
                style={[
                  styles.info_data,
                  { color: props.settings.colors.third_color },
                ]}
              >
                ${item.data.price}
              </Text>
            ) : (
              <Text
                style={[
                  styles.info_data,
                  { color: props.settings.colors.third_color },
                ]}
              >
                <Text
                  style={[
                    styles.info_data,
                    {
                      color: props.settings.colors.third_color,
                      textDecorationLine: "line-through",
                    },
                  ]}
                >
                  ${item.data.price}
                </Text>
                / ${item.data.promotion_price}
              </Text>
            )}
          </View>
          <View style={styles.row}>
            <Text
              style={[
                styles.info_title,
                { color: props.settings.colors.fourth_color },
              ]}
            >
              Brand:
            </Text>
            <Text
              style={[
                styles.info_data,
                { color: props.settings.colors.third_color },
              ]}
            >
              {item.data.brand}
            </Text>
            <Text
              style={[
                styles.info_title,
                { color: props.settings.colors.fourth_color },
              ]}
            >
              Color:
            </Text>
            <Text
              style={[
                styles.info_data,
                { color: props.settings.colors.third_color },
              ]}
            >
              {item.data.color}
            </Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[
                styles.info_title,
                { color: props.settings.colors.fourth_color },
              ]}
            >
              Size
            </Text>
            <View style={{ flex: 1 }} />
            <Text
              style={[
                styles.info_data,
                { color: props.settings.colors.third_color },
              ]}
            >
              {item.data.size}
            </Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[
                styles.info_title,
                { color: props.settings.colors.fourth_color },
              ]}
            >
              Description
            </Text>
          </View>
          <Divider />
          <View style={styles.row}>
            <Text
              style={[
                styles.desc,
                { color: props.settings.colors.third_color },
              ]}
            >
              {item.data.description}
            </Text>
          </View>
          <View style={{ marginBottom: 60 }} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  price: {
    fontSize: 22,
    color: "#f00",
  },
  desc: {
    fontSize: 16,
    flexWrap: "wrap",
  },
  info_title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  info_data: {
    fontSize: 20,
    justifyContent: "space-between",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "center",
  },
  info: {
    flex: 16,
    backgroundColor: "#fff",
  },
});

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    sliderIndex: state.products.sliderIndex,
    sliderItem: state.products.sliderItem,
    cart: state.cart,
    auth: state.auth,
    settings: state.settings,
  };
};

export default connect(
  mapStateToProps,
  actions
)(ProductDetailShow);
