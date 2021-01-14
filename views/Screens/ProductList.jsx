/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { width, height } from "react-native-dimension";
import {
  Primary_color,
  Secondary_color,
  Main_color,
  Third_color,
} from "../../Helper/Common";
import Spinner from "react-native-loading-spinner-overlay";
import Product from "../Component/Product";
import { FAB } from "react-native-paper";
import Header from "../Component/header";
import { connect } from "react-redux";
import * as actions from "../../actions";
import FilterMenu from "../Component/filterMenu";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ProductList = (props) => {
  const [loading, setLoading] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  this.props.getProducts({});

  const goDetail = (item, index) => {
    console.log(item, index);
    props.changeSliderItemAndIndex(item, index);
    props.navigation.navigate("product_detail", {
      product_item: item,
      product_index: index,
      products: props.products.products,
    });
  };

  const filterCategory = () => {
    setLoading(true);
    setIsFilterModalVisible(false);
    let body = category === "all" ? {} : { category };
    props.getProducts(body);
  };

  return (
    <Query
      query={gql`
        {
          products {
            title
            brand
            price
            promotion_price
            photos
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;
        return (
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Spinner visible={this.state.loading} />
            <Header navigation={this.props.navigation} />
            <View style={styles.container}>
              {data.products.length === 0 ? (
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", marginTop: 5 }}
                >
                  Nothing to show
                </Text>
              ) : (
                <FlatList
                  data={data.products}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        flexDirection: "column",
                        margin: 1,
                      }}
                    >
                      <Product
                        onPress={this.goDetail}
                        width={width(50)}
                        item={item}
                        index={index}
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
              {this.filter()}
            </View>
          </View>
        );
      }}
    </Query>
  );
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
  banner_container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  list_container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
  title_label: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft: 24,
    marginBottom: 24,
  },
  title: {},
  inputTxt: {
    textAlignVertical: "center",
    fontSize: 16,
    textAlign: "center",
    width: "100%",
    height: 40,
    backgroundColor: "#fff",

    borderWidth: 1,
    borderRadius: 10,
  },
  searchBar: {
    flex: 1,
    width: "100%",
  },
  formItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
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
    products: state.products,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(ProductList);
