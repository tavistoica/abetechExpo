import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { width, height } from "react-native-dimension";
import Spinner from "react-native-loading-spinner-overlay";
import Modal from "react-native-modal";
import ProductCard from "../Component/product-card/ProductCard";
import Bottom from "./ProductDetails/Bottom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import OsWrapper from "../Component/OsWrapper";

const Favs = (props) => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currrentProduct, setCurrentProduct] = useState({});
  const favorites = useSelector((state) => state.products.favorite);

  useEffect(() => {
    props.getFavorite(props.auth.id);
    setLoading(false);
  }, []);

  // const clearFavs = () => {
  //   props.deleteFavorite(props.auth.id, null);
  // };

  const goDetail = (product) => {
    setShowModal(true);
    setCurrentProduct(product);
  };

  return (
    <OsWrapper>
      <View style={styles.container}>
        <Spinner visible={loading} />
        {props.favorite.length === 0 ? (
          <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 5 }}>
            Nothing to show
          </Text>
        ) : (
          <FlatList
            data={favorites}
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: "column", margin: 5 }}>
                <ProductCard
                  width={width(45)}
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
            keyExtractor={(_item, index) => index.toString()}
          />
        )}
      </View>
      <Modal isVisible={showModal} style={styles.modal}>
        <Bottom
          item={currrentProduct}
          width={width(90)}
          page="favs"
          onAddCart={() => props.setCart(currrentProduct)}
          close={() => setShowModal(false)}
          {...props}
        />
      </Modal>
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
  };
};

export default connect(
  mapStateToProps,
  actions
)(Favs);
