import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Picker,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { width } from "react-native-dimension";
import { Secondary_color, Primary_color } from "../../Helper/Common";
import { connect } from "react-redux";
import * as actions from "../../actions";

const filterCategory = (props, category) => {
  // this.setState({ loading: true, isVisibleFilterModal: false });
  props.setFilterVisibleFalse();
  const body = category === "all" ? {} : { category: category };
  props.getProducts(body);
};

const FilterMenu = (props) => {
  let [category, setCategory] = useState({ category: "all" });
  const filterHeight = Platform.OS === "ios" ? "45%" : "20%";

  useEffect(() => {
    props.getCategory();
  }, []);

  return (
    <Modal
      isVisible={props.isVisibleFilterModal}
      transparent={true}
      animationType="slide"
      onBackdropPress={() => {
        props.setFilterVisibleFalse();
      }}
      style={{
        width: width(100),
        height: "60%",
        // backgroundColor: "#fff",
        margin: 0,
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          // backgroundColor: "#fff",
          width: width(86),
          // paddingTop: 20,
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: Secondary_color(),
        }}
      >
        {/* <Text style={{ fontSize: 16, fontWeight: "bold" }}>Add Filter</Text> */}
        <Text
          style={{
            fontSize: 20,
            width: "92.4%",
            fontWeight: "bold",
            marginBottom: 0,
            color: "black",
            paddingBottom: 5,
            paddingTop: 5,
            textAlign: "center",
            backgroundColor: "#fff",
          }}
        >
          Category
        </Text>
        <View
          style={{
            width: width(80),
            height: filterHeight,
            borderWidth: 1,
            borderColor: "#000",
            backgroundColor: "#fff",
          }}
        >
          <Picker
            selectedValue={category.category}
            // style={styles.dropdownPickerStyle}
            mode="dropdown"
            onValueChange={(itemValue) => {
              console.log(itemValue);
              setCategory({ category: itemValue });
              console.log("category", category);
            }}
            // {filters}
          >
            <Picker.Item key={255} label="All" value="all" selectedValue />
            {props.category.map((item, i) => {
              return (
                <Picker.Item
                  key={i}
                  label={item.data.name}
                  value={item.data.name}
                />
              );
            })}
          </Picker>
        </View>
        <TouchableOpacity
          style={[
            styles.submit_btn,
            {
              marginTop: 15,
              marginBottom: 15,
              backgroundColor: Primary_color(),
            },
          ]}
          onPress={() => filterCategory(props, category.category)}
        >
          <Text style={[styles.signUpTxt, { color: Secondary_color() }]}>
            Filter
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  submit_btn: {
    height: 45,
    width: width(75),
    marginTop: 10,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
});
const mapStatetoProps = (state) => {
  return {
    category: state.products.category,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(FilterMenu);
