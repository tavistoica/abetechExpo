import {
  GET_CART,
  CLEAR_CART,
  INCREMENT_CART_ITEM,
  DELETE_CART_ITEM,
  CART_ERROR,
} from "./types";
import HttpHelper from "../utils/HttpHelper";
import { store } from "../configureStore";

interface Product {
  quantity: number;
  title: string;
  createdAt: string;
}

export const getCart = () => {
  return async (dispatch: any) => {
    const state = store.getState();
    const currentCart = state.cart.cart;
    if (currentCart === undefined || currentCart === null) {
      dispatch({ type: GET_CART, payload: [] });
    } else {
      dispatch({ type: GET_CART, payload: currentCart });
    }
  };
};

export const setCart = (product: Product, increment: number) => {
  return async (dispatch: any) => {
    let currentCart = store.getState().cart.cart;
    if (currentCart === []) {
      product.quantity = 1;
      currentCart = [product];
    } else {
      const lookForItem = currentCart.filter((item: Product) => {
        return (
          item.title === product.title && item.createdAt === product.createdAt
        );
      });
      if (lookForItem.length > 0) {
        const indexOfItem = currentCart.findIndex(
          (item: Product) =>
            item.title === product.title && item.createdAt === product.createdAt
        );
        if (increment) currentCart[indexOfItem].quantity += 1;
        else if (!increment) currentCart[indexOfItem].quantity -= 1;
        if (currentCart[indexOfItem].quantity <= 0)
          currentCart.splice(indexOfItem, 1);
      } else {
        product.quantity = 1;
        currentCart.push(product);
      }
    }
    dispatch({
      type: INCREMENT_CART_ITEM,
      payload: currentCart,
    });
  };
};

export const deleteCartItem = (product: Product) => {
  return async (dispatch: any) => {
    try {
      let currentCart = store.getState().cart.cart;
      const lookForItem = currentCart.filter((item: Product) => {
        return (
          item.title === product.title && item.createdAt === product.createdAt
        );
      });
      if (lookForItem.length > 0) {
        const indexOfItem = currentCart.findIndex(
          (item: Product) =>
            item.title === product.title && item.createdAt === product.createdAt
        );
        currentCart.splice(indexOfItem, 1);
      }
      dispatch({
        type: DELETE_CART_ITEM,
        payload: currentCart,
      });
    } catch (error) {
      if (error.status === 400) {
        dispatch({
          type: CART_ERROR,
          payload: error.data.details[0].message,
        });
      } else {
        dispatch({
          type: CART_ERROR,
          payload: error.data,
        });
      }
    }
  };
};

export const clearCart = (user_id: string) => {
  return async (dispatch: any) => {
    try {
      await HttpHelper.doPost("clear_cart", {
        user_id,
      });
      dispatch({
        type: CLEAR_CART,
        payload: [],
      });
    } catch (error) {
      if (error.status === 400) {
        dispatch({
          type: CART_ERROR,
          payload: error.data.details[0].message,
        });
      } else {
        dispatch({
          type: CART_ERROR,
          payload: error.data,
        });
      }
    }
  };
};
