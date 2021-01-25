import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OnSaleTag = (props) => {
  return (
    <>
      {props.item.data.promotion_price ? (
        <View style={styles.container}>
          <Text style={styles.text}>On Sale</Text>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    marginTop: "3%",
    marginLeft: "3%",
    padding: "2%",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default OnSaleTag;
