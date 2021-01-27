/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { width } from "react-native-dimension";
import Spinner from "react-native-loading-spinner-overlay";
import ProductCard from "../Component/product-card/ProductCard";
import Header from "../Component/header";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import FilterButton from "./ProductDetails/FilterButton";
// import { Query } from "react-apollo";
// import gql from "graphql-tag";

const ProductList = (props) => {
  const [loading, setLoading] = useState(true);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    props.getProducts({});
    setLoading(false);
  }, []);

  // return (
  // <Query
  //   query={gql`
  //     {
  //       products {
  //         title
  //         brand
  //         price
  //         promotion_price
  //         photos
  //       }
  //     }
  //   `}
  // >
  //   {({ loading, error, data }) => {
  // if (error) return <p>{error}</p>;
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Spinner visible={loading} />
      <Header {...props} />
      <View style={styles.container}>
        {props.products.length === 0 ? (
          <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 5 }}>
            Nothing to show
          </Text>
        ) : (
          <FlatList
            data={products}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: "column",
                  margin: 1,
                }}
              >
                <ProductCard
                  width={width(50)}
                  item={item}
                  index={index}
                  {...props}
                />
              </View>
            )}
            //Setting the number of column
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            style={{ width: width(100) }}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
        <FilterButton setLoading={setLoading} {...props} />
      </View>
    </View>
  );
  //   }}
  // </Query>
  // );
};

const styles = StyleSheet.create({
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

const mapStatetoProps = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
    products: state.products.products,
    favorite: state.products.favorite,
    settings: state.settings,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(ProductList);
