import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Picker } from "react-native";
import Modal from "react-native-modal";
import { width } from "react-native-dimension";
import { connect } from "react-redux";
import * as actions from "../../../../actions";

const FilterMenu = (props) => {
  let [category, setCategory] = useState({ category: "all" });

  useEffect(() => {
    props.getCategory();
  }, []);

  const filterCategory = (props, category) => {
    props.setIsFilterModalVisible(false);
    const body = category === "all" ? {} : { category: category };
    props.getProducts(body);
  };

  return (
    <Modal
      isVisible={props.IsFilterModalVisible}
      transparent={true}
      animationType="slide"
      onBackdropPress={() => {
        props.setIsFilterModalVisible(false);
      }}
      style={{
        width: width(100),
        margin: 0,
        padding: 0,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: width(86),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            width: "92.4%",
            fontWeight: "bold",
            marginBottom: 0,
            color: "black",
            textAlign: "center",
            backgroundColor: "#fff",
          }}
        >
          Category
        </Text>
        <View
          style={{
            width: width(80),
            borderWidth: 1,
            borderColor: "#000",
            backgroundColor: "#fff",
          }}
        >
          <Picker
            selectedValue={category.category}
            mode="dropdown"
            onValueChange={(itemValue) => {
              setCategory({ category: itemValue });
            }}
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
              backgroundColor: props.settings.colors.main_color,
            },
          ]}
          onPress={() => filterCategory(props, category.category)}
        >
          <Text
            style={[
              {
                color: props.settings.colors.secondary_color,
                fontWeight: "bold",
              },
            ]}
          >
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
