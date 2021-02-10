import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { width, height } from "react-native-dimension";
import Spinner from "react-native-loading-spinner-overlay";
import ProductCard from "../../Component/product-card/ProductCard";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import OsWrapper from "../../Component/OsWrapper";

const FavoritePage = (props) => {
  const favorites = useSelector((state) => state.products.favorite);

  // useEffect(() => {
  //   props.productsLoading();
  //   props.getFavorite(props.auth.id);
  //   setLoading(false);
  // }, []);

  // const clearFavs = () => {
  //   props.deleteFavorite(props.auth.id, null);
  // };

  return (
    <OsWrapper>
      <View style={styles.container}>
        <Spinner visible={props.productsStore.loading} />
        {props.favorite.length === 0 ? (
          <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 5 }}>
            Nothing to show
          </Text>
        ) : (
          <FlatList
            data={favorites}
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: "column" }}>
                <ProductCard
                  width={width(50)}
                  item={item}
                  index={index}
                  {...props}
                />
              </View>
            )}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            style={{ width: width(100) }}
            numColumns={2}
            keyExtractor={(_item, index) => index.toString()}
          />
        )}
      </View>
    </OsWrapper>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: width(100),
    height: height(100),
    backgroundColor: "#fff",
    margin: 0,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 16,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    width: width(100),
  },
});

const mapStateToProps = (state) => {
  return {
    favorite: state.products.favorite,
    auth: state.auth,
    settings: state.settings,
    productsStore: state.products,
  };
};

export default connect(
  mapStateToProps,
  actions
)(FavoritePage);
