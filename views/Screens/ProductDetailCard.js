import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { width } from "react-native-dimension";
import Entypo from "react-native-vector-icons/Entypo";
import Spinner from "react-native-loading-spinner-overlay";
import Main from "./ProductDetails/Main";
import HttpHelper from "../../Helper/HttpHelper";
import { _storeData } from "../../Helper/Util";
import CardStack, { Card } from "react-native-card-stack-swiper";
// import Toast from "react-native-simple-toast";
import { Main_color, Secondary_color, Third_color } from "../../Helper/Common";
import { connect } from "react-redux";
import * as actions from "../actions";
import Feather from "react-native-vector-icons/Feather";

import BottomMenu from "../Component/BottomMenu";

class ProductDetailCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isGalleryVisible: false,
      showModal: false,
      galleryIndex: 0,
      imgs: [],
      first_padding: 55,
      cur_product: {},
      products: this.props.route.params.products,
      product_item: this.props.route.params.product_item,
      product_index: this.props.route.params.product_index,
    };
  }

  componentDidMount = () => {
    this.getProducts(this.state.product_item);

    this.focusListener = this.props.navigation.addListener("focus", () => {
      if (global.cur_page_name === "product_detail_show") {
        try {
          this.swiper.goBackFromTop();
        } catch (err) {
          console.log("go_back_top_err", err);
        }
      }
      global.cur_page_name = "product_card_show";
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.state.product_index, nextProps.route.params.product_index);
    console.log(
      this.state.product_index != nextProps.route.params.product_index
    );
    return this.state.product_index != nextProps.route.params.product_index;
  }

  componentDidUpdate() {
    console.log("Component re-rendered.");
  }

  // UNSAFE_componentWillReceiveProps(props) {
  //   this.props = props;
  //   this.setState({
  //     // first_padding: 55,
  //     products: [],
  //     product_item: this.props.route.params.product_item,
  //     product_index: this.props.route.params.product_index,
  //   });
  //   this.getProducts(this.props.route.params.product_item);
  // }

  getProducts = (cur_item) => {
    this.setState({ loading: true });

    let cur_index = 0;
    for (let i = 0; i < this.props.products.length; i++) {
      if (this.props.products[i].id === cur_item.id) {
        cur_index = i;
        break;
      }
    }
    // console.log('products', this.props.products.length);
    this.setState({
      loading: false,
      product_index: cur_index,
    });
  };

  viewStyle() {
    return {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    };
  }

  goChat = () => {
    try {
      if (
        this.props.auth.contact_id === null ||
        this.props.auth.contact_id === ""
      ) {
        this.goNewContact();
      } else {
        this.props.navigation.navigate("chat", {
          contact_id: this.props.auth.contact_id,
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  goContact = async (data) => {
    try {
      this.props.auth.contact_id = data.contact_id;
      await _storeData("user", this.props.auth);

      this.props.navigation.navigate("chat", {
        contact_id: this.props.auth.contact_id,
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  goNewContact = () => {
    this.setState({ loading: true });
    HttpHelper.doPost(
      "create_contact",
      {
        user_id: this.props.auth.id,
        user_data: this.props.auth.data,
      },
      (data) => {
        this.setState({ loading: false });
        if (data.status === "success") {
          // success
          this.goContact(data);
        }
      },
      (err) => {
        this.setState({ loading: false });
        alert(err);
      }
    );
  };

  // see detail
  onSwipedTop = (product) => {
    // console.log('product', product)
    // this.setState({
    //     cur_product : product,
    //     showModal : true
    // })
  };

  // add to cart
  onSwipedBottom = (product) => {
    this.props.setCart(product);
    this.props.cartTotal();
    // Toast.show("This product is added to cart.", Toast.SHORT);
    this.removeProductFromStack(product);
  };

  // see next product
  onSwipedLeft = (product) => {};

  // add favorite
  onSwipedRight = (product) => {
    this.props.setFavorite(this.props.auth.id, product.id);
    // Toast.show("This product added to favorites.", Toast.SHORT);
    this.removeProductFromStack(product);
  };

  removeProductFromStack = (product) => {
    let index = 0;
    for (var i = 0; i < this.state.products.length; i++) {
      if (this.state.products[i].id === product.id) {
        index = i;
      }
    }
    let tmp_products = this.state.products.slice();
    tmp_products.splice(index, 1);
    this.setState({ products: tmp_products });
  };

  onShowDetail = (product) => {
    this.props.navigation.navigate("detailshow", {
      product: product,
      btnflag: false,
    });
  };

  onShowDetailByButton = (product) => {
    this.props.navigation.navigate("detailshow", {
      product: product,
      btnflag: true,
    });
  };

  header = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("product_list");
          }}
          style={styles.menu}
        >
          <Feather name="arrow-left" size={32} color="#fff" />
        </TouchableOpacity>
        {/* <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        > */}
        {/* <Text
            style={{
              fontSize: 20,
              color: Secondary_color(),
              fontWeight: "bold",
            }}
          >
            Product Detail
          </Text> */}
        {/* </View> */}
      </>
    );
  };

  content() {
    return (
      <>
        {this.state.products.length > 0 ? (
          <CardStack
            style={{
              flex: 16,
              justifyContent: "center",
              alignItems: "center",
              // marginTop: "14%",
              maxHeight: "60%",
            }}
            cardContainerStyle={{ maxHeight: "60%" }}
            renderNoMoreCards={() => {
              return <Text>No More Products</Text>;
            }}
            secondCardZoom={1.02}
            initialIndex={this.props.sliderIndex}
            loop={true}
            ref={(swiper) => {
              this.swiper = swiper;
            }}
          >
            {this.props.products.map((product, index) => (
              <Card
                style={{
                  // flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={index}
                onSwipedBottom={() => this.onSwipedBottom(product)}
                onSwipedLeft={() => this.onSwipedLeft(product)}
                onSwipedRight={() => this.onSwipedRight(product)}
                onSwipedTop={() => this.onShowDetail(product)}
              >
                <Main
                  goChat={this.goChat}
                  onSwipedBottom={this.onSwipedBottom}
                  onSwipedLeft={this.onSwipedLeft}
                  onSwipedRight={this.onSwipedRight}
                  onSwipedTop={this.onShowDetailByButton}
                  item={product}
                  width={width(90)}
                />
              </Card>
            ))}
          </CardStack>
        ) : null}
      </>
    );
  }

  render() {
    console.log("this.state.product_index", this.state.product_index);

    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Spinner visible={this.state.loading} />
        <View style={{ flex: 1, flexDirection: "column" }} />
        {Platform.OS === "ios" ? (
          <SafeAreaView style={{ flex: 5, flexDirection: "column" }}>
            {this.content()}
          </SafeAreaView>
        ) : (
          <View style={{ flex: 5, flexDirection: "column" }}>
            {this.content()}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    paddingLeft: 10,
  },
  header: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    width: width(100),
    height: 50,
  },
  container: {
    flex: 16,
    width: 30,
    marginRight: 10,
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
  summary: {
    marginTop: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title_label: {
    color: "#3434ff77",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  title_val: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  title: {
    marginTop: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputTxt: {
    textAlignVertical: "center",
    fontSize: 16,
    textAlign: "center",
    flex: 1,
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
});

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    sliderIndex: state.products.sliderIndex,
    sliderItem: state.products.sliderItem,
    cart: state.cart,
    auth: state.auth,
  };
};

export default connect(
  mapStateToProps,
  actions
)(ProductDetailCard);
