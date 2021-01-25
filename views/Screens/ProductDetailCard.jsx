import React, { useState, useEffect, useRef } from "react";
import { Text } from "react-native";
import { width } from "react-native-dimension";
import Spinner from "react-native-loading-spinner-overlay";
import Main from "./ProductDetails/Main";
import HttpHelper from "../../Helper/HttpHelper";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { connect } from "react-redux";
import * as actions from "../../actions";
import OsWrapper from "../Component/OsWrapper";

const ProductDetailCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const swiper = useRef();

  useEffect(() => {
    props.getProducts({});
    getProducts({});
  }, [index]);

  const getProducts = (currItem) => {
    setLoading(true);
    setProducts(props.products);
    let tempIndex = 0;
    for (let i = 0; i < props.products.length; i++) {
      if (props.products[i].id === currItem.id) {
        tempIndex = i;
        break;
      }
    }
    setLoading(false);
    setIndex(tempIndex);
  };

  const goChat = () => {
    try {
      if (props.auth.contact_id === null || props.auth.contact_id === "") {
        goNewContact();
      } else {
        props.navigation.navigate("chat", {
          contact_id: props.auth.contact_id,
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const goContact = async (data) => {
    try {
      props.auth.contact_id = data.contact_id;
      props.navigation.navigate("chat", {
        contact_id: props.auth.contact_id,
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  const goNewContact = () => {
    setLoading(true);
    HttpHelper.doPost(
      "create_contact",
      {
        user_id: props.auth.id,
        user_data: props.auth.data,
      },
      (data) => {
        setLoading(false);
        if (data.status === "success") {
          // success
          goContact(data);
        }
      },
      (err) => {
        setLoading(false);
        alert(err);
      }
    );
  };

  // see detail
  const onSwipedTop = (product) => {};

  // add to cart
  const onSwipedBottom = (product) => {
    props.setCart(product);
    props.cartTotal();
    removeProductFromStack(product);
  };

  // see next product
  const onSwipedLeft = (product) => {};

  // add favorite
  const onSwipedRight = (product) => {
    props.setFavorite(props.auth.id, product.id);
    removeProductFromStack(product);
  };

  const removeProductFromStack = (product) => {
    let indexTemp = 0;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === product.id) {
        indexTemp = i;
      }
    }
    let tmp_products = products.slice();
    tmp_products.splice(indexTemp, 1);
    setProducts(tmp_products);
  };

  const onShowDetail = (product) => {
    props.navigation.navigate("detailshow", {
      product: product,
      btnflag: false,
    });
  };

  const onShowDetailByButton = (product) => {
    props.navigation.navigate("detailshow", {
      product: product,
      btnflag: true,
    });
  };

  return (
    <OsWrapper>
      <Spinner loading={loading} />
      {products.length > 0 ? (
        <CardStack
          style={{
            flex: 1,
            alignItems: "center",
          }}
          renderNoMoreCards={() => {
            return <Text>No More Products</Text>;
          }}
          secondCardZoom={1}
          initialIndex={props.sliderIndex}
          loop={true}
          ref={swiper}
        >
          {props.products.map((product, index) => (
            <Card
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
              key={index}
              onSwipedBottom={() => onSwipedBottom(product)}
              onSwipedLeft={() => onSwipedLeft(product)}
              onSwipedRight={() => onSwipedRight(product)}
              onSwipedTop={() => onShowDetail(product)}
            >
              <Main
                goChat={goChat}
                onSwipedBottom={onSwipedBottom}
                onSwipedLeft={onSwipedLeft}
                onSwipedRight={onSwipedRight}
                onSwipedTop={onShowDetailByButton}
                item={product}
                width={width(90)}
                {...props}
              />
            </Card>
          ))}
        </CardStack>
      ) : null}
    </OsWrapper>
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
