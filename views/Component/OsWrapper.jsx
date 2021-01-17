import React from "react";
import { Platform, SafeAreaView, View, StyleSheet } from "react-native";

const OsWrapper = (props) => {
  const iosStyle = props.styleIOS ? props.styleIOS : styles.defaultStyle;
  const androidStyle = props.styleAndroid
    ? props.styleAndroid
    : styles.defaultStyle;
  const backColor = props.backColor ? props.backColor : "#fff";

  return (
    <>
      {Platform.OS === "ios" ? (
        <SafeAreaView style={[iosStyle, { backgroundColor: backColor }]}>
          {props.children}
        </SafeAreaView>
      ) : (
        <View style={[androidStyle, { backgroundColor: backColor }]}>
          {props.children}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  defaultStyle: { flex: 1, flexDirection: "column" },
});

export default OsWrapper;
