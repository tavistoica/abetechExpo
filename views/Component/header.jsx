import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Platform,
  SafeAreaView,
} from "react-native";
import { width } from "react-native-dimension";
import { Main_color, Secondary_color } from "../../Helper/Common";
import { connect } from "react-redux";
import * as actions from "../../actions";
import OsWrapper from "./OsWrapper";

const Header = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const searchProduct = () => {
    setLoading(true);
    props.searchProducts(searchText);
  };

  return (
    <OsWrapper>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput
          onChangeText={(value) => setSearchText(value)}
          autoFocus={false}
          onSubmitEditing={() => searchProduct()}
          placeholder="Search product..."
          placeholderTextColor="grey"
          autoCorrect={false}
          autoCapitalize="none"
          style={[styles.inputTxt, { borderColor: Main_color() }]}
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

const mapStatetoProps = (state) => {
  return {
    products: state.products.products,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(Header);
