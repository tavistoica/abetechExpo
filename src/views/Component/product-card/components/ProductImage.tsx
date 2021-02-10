import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { StyleSheet, View, ImageBackground } from "react-native";

const ProductImage = (props) => {
  return (
    <View style={[styles.container, { width: props.width }]}>
      {props.photo ? (
        <ImageBackground
          source={{
            uri: props.photo && props.photo,
          }}
          style={styles.image}
        >
          {props.children}
        </ImageBackground>
      ) : (
        <Spinner visible={true} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    aspectRatio: 1,
    resizeMode: "center",
  },
});

export default ProductImage;
