import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { width } from "react-native-dimension";
import OsWrapper from "../../../Component/OsWrapper";

const Header = (props) => {
  const [searchText, setSearchText] = useState("");

  const searchProduct = () => {
    props.searchProducts(searchText);
  };

  return (
    <OsWrapper backColor={props.settings.colors.main_color}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput
          onChangeText={(value) => setSearchText(value)}
          autoFocus={false}
          onSubmitEditing={() => searchProduct()}
          placeholder="Search product..."
          placeholderTextColor="grey"
          autoCorrect={false}
          autoCapitalize="none"
          style={[
            styles.inputTxt,
            { borderColor: props.settings.colors.main_color },
          ]}
        />
      </View>
    </OsWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 55,
  },
  inputTxt: {
    textAlignVertical: "center",
    fontSize: 16,
    textAlign: "center",
    width: width(100),
    height: "90%",
    backgroundColor: "#fff",
    borderRadius: 5,
  },
});

export default Header;
