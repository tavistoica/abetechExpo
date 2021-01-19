import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import { width } from "react-native-dimension";
import CartProduct from "../CartProduct";

interface Props {
  setCart: (item: any, increment: boolean) => any;
  cartTotal: () => any;
  deleteCartItem: (item: any) => any;
  getCart: () => any;
  cart: any[];
}

const CartContent = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    props.getCart();
  }, []);

  const goDetail = (item: any) => {
    setShowModal(true);
    setCurrentProduct(item);
  };

  const onMinus = (item: any) => {
    props.setCart(item, false);
    props.cartTotal();
  };

  const onPlus = (item: any) => {
    props.setCart(item, true);
    props.cartTotal();
  };

  const onRmv = (item: any) => {
    props.deleteCartItem(item);
    props.cartTotal();
  };
  console.log("caaart", props.cart);

  return (
    <View style={styles.container}>
      {props.cart.length === 0 ? (
        <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 5 }}>
          Cart is empty
        </Text>
      ) : (
        <>
          <FlatList
            data={props.cart}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "column" }}>
                <CartProduct
                  onPress={goDetail}
                  onMinus={onMinus}
                  onPlus={onPlus}
                  onRmv={onRmv}
                  item={item}
                  {...props}
                />
                <Divider />
              </View>
            )}
            //Setting the number of column
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            style={{ width: width(100) }}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  CheckoutAndTotal: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 20,
  },
  menu: {
    paddingLeft: 10,
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

export default CartContent;
