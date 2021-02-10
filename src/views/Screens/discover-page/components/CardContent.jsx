import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { height } from "react-native-dimension";
import CardButtons from "./CardButtons";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          height: height(92),
        }}
      >
        <Image
          source={{
            uri:
              this.props.item.data.photos === null ||
              this.props.item.data.photos[0] === null
                ? ""
                : this.props.item.data.photos[0].original,
          }}
          indicatorProps={{
            color: "rgba(150, 150, 150, 1)",
            unfilledColor: "rgba(200, 200, 200, 0.2)",
          }}
          style={{
            width: "100%",
            height: "60%",
            marginTop: 0,
          }}
        />
        <View style={styles.info}>
          <View style={styles.row}>
            <Text
              style={[
                styles.title,
                { color: this.props.settings.colors.main_color },
              ]}
              numberOfLines={1}
            >
              {this.props.item.data.title}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.price, { color: "red" }]}>
              {this.props.item.data.promotion_price && (
                <Text
                  style={{
                    color: this.props.settings.colors.fourth_color,
                    textDecorationLine: "line-through",
                    fontSize: 15,
                  }}
                >
                  ${this.props.item.data.price}
                </Text>
              )}
              {this.props.item.data.promotion_price
                ? " $" + this.props.item.data.promotion_price
                : " $" + this.props.item.data.price}
            </Text>
          </View>
          <View style={styles.row}>
            <Text
              numberOfLines={2}
              style={[
                styles.desc,
                { color: this.props.settings.colors.third_color },
              ]}
            >
              {this.props.item.data.description}
            </Text>
          </View>
        </View>
        <CardButtons {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  brand: {},
  price: {
    fontSize: 20,
  },
  desc: {
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "4%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  info: {
    width: "100%",
    height: "22%",
  },
  buttons: {
    width: "100%",
    height: "10%",
    marginBottom: 6,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
});
