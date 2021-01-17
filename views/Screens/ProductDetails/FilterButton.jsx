import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import FilterMenu from "../../Component/filterMenu";

const FilterButton = (props) => {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  return (
    <View style={styles.fixedView}>
      <FAB
        style={{ backgroundColor: props.settings.colors.main_color }}
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
});

export default FilterButton;
