import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import {
  Primary_color,
  Secondary_color,
  Main_color,
  Third_color,
} from "../../../Helper/Common";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import FilterMenu from "../../Component/filterMenu";

const FilterButton = (props) => {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  return (
    <View style={styles.fixedView}>
      <FAB
        style={styles.fab}
        medium
        color="white"
        icon="filter"
        onPress={() => setIsFilterModalVisible(true)}
      />
      <FilterMenu
        IsFilterModalVisible={isFilterModalVisible}
        category={props.products.category}
        setIsFilterModalVisible={setIsFilterModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fixedView: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: "0%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  fab: {
    backgroundColor: Main_color(),
  },
});

const mapStatetoProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(FilterButton);
