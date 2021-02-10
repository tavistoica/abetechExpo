import React, { useState, useEffect, useRef } from "react";
import { Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import CardContent from "./CardContent";
import CardStack from "react-native-card-stack-swiper";
import { connect } from "react-redux";
import * as actions from "../../../../actions";
import Toast from "react-native-toast-message";

const ProductDetailCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const swiper = useRef();

  useEffect(() => {
    props.getProducts({});
    getProducts();
    setLoading(false);
  }, []);

  const getProducts = async () => {
    const productElements = props.products.map((product, index) => (
      <CardContent
        key={index}
        goChat={goChat}
        onSwipedBottom={() => onSwipedBottom(product)}
        onSwipedLeft={() => onSwipedLeft(product)}
        onSwipedRight={() => onSwipedRight(product)}
        onSwipedTop={() => onShowDetail(product)}
        item={product}
        {...props}
      />
    ));
    setProducts(productElements);
  };

  const goChat = () => {
    if (props.auth.contact_id === null || props.auth.contact_id === "") {
      Toast.show({
        type: "error",
        style: { orderLeftColor: "red" },
        text1: "Login in order to message the seller.",
        position: "top",
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 40,
      });
    } else {
      props.navigation.navigate("chat", {
        contact_id: props.auth.contact_id,
      });
    }
  };

  // const goNewContact = () => {
  //   setLoading(true);
  //   HttpHelper.doPost(
  //     "create_contact",
  //     {
  //       user_id: props.auth.id,
  //       user_data: props.auth.data,
  //     },
  //     (data) => {
  //       setLoading(false);
  //       if (data.status === "success") {
  //         // success
  //         goContact(data);
  //       }
  //     },
  //     (err) => {
  //       setLoading(false);
  //       alert(err);
  //     }
  //   );
  // };

  // add to cart
  const onSwipedBottom = (product) => {
    props.setCart(product.data, true);
    props.cartTotal();
    Toast.show({
      type: "info",
      style: { orderLeftColor: "red" },
      text1: "Item added to the cart",
      position: "top",
      visibilityTime: 500,
      autoHide: true,
      topOffset: 40,
    });
  };

  // see next product
  const onSwipedLeft = (product) => {};

  // add favorite
  const onSwipedRight = (product) => {
    props.setFavorite(props.auth.id, product.id);
    Toast.show({
      type: "info",
      style: { orderLeftColor: "red" },
      text1: "Item added to favorite.",
      position: "top",
      visibilityTime: 500,
      autoHide: true,
      topOffset: 40,
    });
  };

  const onShowDetail = (product) => {
    props.navigation.navigate("detailshow", {
      product: product,
      btnflag: false,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {products.length > 0 && !loading ? (
        <CardStack
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: "red",
          }}
          renderNoMoreCards={() => {
            return <Text styles={{ marginTop: "49%" }}>That's all we got</Text>;
          }}
          ref={swiper}
        >
          {products}
        </CardStack>
      ) : (
        <Spinner loading={loading} size="large" />
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    sliderIndex: state.products.sliderIndex,
    cart: state.cart,
    auth: state.auth,
    settings: state.settings,
  };
};

export default connect(
  mapStateToProps,
  actions
)(ProductDetailCard);
