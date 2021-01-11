import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
} from "react-native";
import { width, height } from "react-native-dimension";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Main_color, Secondary_color } from "../../Helper/Common";
import Spinner from "react-native-loading-spinner-overlay";
import Modal from "react-native-modal";
import Product from "../Component/Product";
import HttpHelper from "../../Helper/HttpHelper";
import Bottom from "./ProductDetails/Bottom";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Favs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      loading: false,
      showModal: false,
      cur_product: {},
    };
  }

  componentDidMount = () => {
    this.getFavProducts();
  };

  getFavProducts = () => {
    console.log(this.props.auth.id);
    this.props.getFavorite(this.props.auth.id);
  };

  clearFavs = () => {
    this.props.deleteFavorite(this.props.auth.id, null);
  };

  onAddCart = (product) => {
    HttpHelper.doPost(
      "add_cart",
      {
        user_id: this.props.auth.id,
        product_id: product.id,
      },
      (data) => {
        this.del_favorite(product);
      },
      (err) => {
        alert(err);
      }
    );
  };

  del_favorite = (product, user) => {
    this.props.deleteFavorite(user, product.id);
    console.log(this.props.favorite);
    if (this.props.favorite !== undefined && this.props.favorite.length > 0)
      this.props.getFavorite(this.props.auth.id);
  };

  goDetail = (item) => {
    this.setState({ showModal: true, cur_product: item });
  };

  header = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.openDrawer();
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
          onPress={() => this.clearFavs()}
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

  content() {
    return (
      <>
        <View style={styles.container}>
          <Spinner visible={this.state.loading} />
          {this.props.favorite.length === 0 ? (
            <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 5 }}>
              Nothing to show
            </Text>
          ) : (
            <FlatList
              data={this.props.favorite}
              renderItem={({ item, index }) => (
                <View style={{ flexDirection: "column", margin: 5 }}>
                  <Product
                    onPress={this.goDetail}
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
        <Modal
          isVisible={this.state.showModal}
          style={{
            width: width(100),
            height: height(100),
            backgroundColor: "#fff",
            margin: 0,
            padding: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Bottom
            item={this.state.cur_product}
            width={width(90)}
            page="favs"
            onAddCart={this.onAddCart}
            close={() => {
              this.setState({ showModal: false });
            }}
          />
        </Modal>
      </>
    );
  }

  render() {
    return (
      <>
        {Platform.OS === "ios" ? (
          <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
            {this.content()}
          </SafeAreaView>
        ) : (
          <View style={{ flex: 1, flexDirection: "column" }}>
            {this.content()}
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    paddingLeft: 10,
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
