import FilterMenu from "../../Component/filterMenu";

const FilterButton = (props) => {
  return (
    <View style={styles.fixedView}>
      <FAB
        style={styles.fab}
        medium
        color="white"
        icon="filter"
        onPress={props.setFilterVisibleFalse}
      />
      <FilterMenu
        isFilterModalVisible={props.isFilterModalVisible}
        category={props.products.category}
        categories={props.categories}
        setFilterVisibleFalse={props.setFilterVisibleFalse}
      />
    </View>
  );
};

export default FilterButton;
