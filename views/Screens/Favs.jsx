import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { width, height } from "react-native-dimension";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Main_color, Secondary_color } from "../../Helper/Common";
import Spinner from "react-native-loading-spinner-overlay";
import Modal from "react-native-modal";
import Product from "../Component/Product";
import Bottom from "./ProductDetails/Bottom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import OsWrapper from "../Component/OsWrapper";

const Favs = (props) => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currrentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    props.getFavorite(props.auth.id);
    setLoading(false);
  }, []);

  const clearFavs = () => {
    props.deleteFavorite(props.auth.id, null);
  };

  const goDetail = (product) => {
    setShowModal(true);
    setCurrentProduct(product);
  };

  header = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            props.navigation.openDrawer();
          }}
          style={styles.menu}
        >
          <Entypo name="menu" size={32} color={Secondary_color()} />
        </TouchableOpacity>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              fontSize: 20,
              color: Secondary_color(),
              fontWeight: "bold",
            }}
          >
            Favorites
          </Text>
        </View>
        <TouchableOpacity
          style={{ width: 30, marginRight: 10 }}
          onPress={() => props.deleteFavorite(props.auth.id, null)}
        >
          <MaterialCommunityIcons
            name="layers-remove"
            size={32}
            color={Secondary_color()}
          />
        </TouchableOpacity>
      </>
    );
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
            data={props.favorite}
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: "column", margin: 5 }}>
                <Product
                  onPress={goDetail}
                  width={width(45)}
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
      </View>
      <Modal isVisible={showModal} style={styles.modal}>
        <Bottom
          item={currrentProduct}
          width={width(90)}
          page="favs"
          onAddCart={props.setCart(currrentProduct)}
          close={() => setShowModal(false)}
        />
      </Modal>
    </OsWrapper>
  );
};

const styles = StyleSheet.create({
  menu: {
    paddingLeft: 10,
  },
  modal: {
    width: width(100),
    height: height(100),
    backgroundColor: "#fff",
    margin: 0,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    width: width(100),
    height: 55,
    backgroundColor: Main_color(),
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
  };
};

export default connect(
  mapStateToProps,
  actions
)(Favs);
