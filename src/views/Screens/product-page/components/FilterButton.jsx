import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FilterMenu from "./FilterMenu";
import IonIcons from "react-native-vector-icons/Ionicons";

const FilterButton = (props) => {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  return (
    <View
      style={[
        styles.fixedView,
        { backgroundColor: props.settings.colors.main_color },
      ]}
    >
      {/* <FAB
        style={{ backgroundColor: props.settings.colors.main_color }}
        medium
        color="white"
        icon="filter"
        onPress={() => setIsFilterModalVisible(true)}
      /> */}
      <IonIcons
        name={"ios-options"}
        color={props.settings.colors.secondary_color}
        size={40}
        onPress={() => setIsFilterModalVisible(true)}
      />
      <FilterMenu
        IsFilterModalVisible={isFilterModalVisible}
        category={props.products.category}
        setIsFilterModalVisible={setIsFilterModalVisible}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fixedView: {
    position: "absolute",
    margin: 10,
    right: 0,
    bottom: "0%",
    justifyContent: "center",
    paddingHorizontal: 7,
    paddingVertical: 7,
    borderRadius: 40,
  },
});

export default FilterButton;
