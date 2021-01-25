import {
  GET_PRODUCTS,
  GET_CATEGORY,
  PRODUCTS_ERROR,
  SEARCH_PRODUCTS,
  GET_FAVORITE,
  SET_FAVORITE,
  DELETE_FAVORITE,
  GET_CART,
  SET_CART,
  DELETE_CART,
  CLEAR_CART,
  INCREMENT_CART_ITEM,
  DECREMENT_CART_ITEM,
  DELETE_CART_ITEM,
  CART_ERROR,
  UPDATE_CART,
  CART_TOTAL,
  LOG_USER,
  REGISTER_USER,
  REMOVE_USER,
  SET_USER_ID,
  SET_USER_PHOTO,
  SET_USER_FIRSTNAME,
  SET_USER_LASTNAME,
  SET_USER_CONTACTID,
  SET_USER_PASSWORDENCRYPTED,
  SET_USER_EMAIL,
  SET_USER_PHONE,
  SET_USER_CREATED_DATE,
  DELETE_ADDRESS,
  ADD_ADDRESS,
  DELETE_CARD,
  ADD_CARD,
  CHANGE_SLIDER_INDEX,
  AUTH_ERROR,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  GET_APP_SETTINGS,
  SETTINGS_ERROR,
} from "./types";
import HttpHelper from "../Helper/HttpHelper";
import { store } from "../configureStore";
import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "../Helper/Constant";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const getProducts = (body) => {
  return async (dispatch) => {
    try {
      const response = await HttpHelper.doPost("product/get", body);
      if (response.data === null || response.data === undefined) {
        dispatch({
          type: GET_PRODUCTS,
          payload: [],
        });
      }
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data,
      });
    } catch (error) {
      if (error.status === 400) {
        dispatch({
          type: PRODUCTS_ERROR,
          payload: error.data.details[0].message,
        });
      } else {
        dispatch({
          type: PRODUCTS_ERROR,
          payload: error.data,
        });
      }
    }
  };
};

export const searchProducts = (search) => {
  return async (dispatch) => {
    try {
      const response = await HttpHelper.doPost("product/search", { search });
      dispatch({
        type: SEARCH_PRODUCTS,
        payload: response.data ? response.data : [],
      });
    } catch (error) {
      if (error.status === 400) {
        dispatch({
          type: PRODUCTS_ERROR,
          payload: error.data.details[0].message,
        });
      } else {
        dispatch({
          type: PRODUCTS_ERROR,
          payload: error.data,
        });
      }
    }
  };
};

export const getCategory = (body) => {
  return async (dispatch) => {
    try {
      const response = await HttpHelper.doPost("category/get", body);
      dispatch({
        type: GET_CATEGORY,
        payload: response.data,
      });
    } catch (error) {
      if (error.status === 400) {
        dispatch({
          type: PRODUCTS_ERROR,
          payload: error.data.details[0].message,
        });
      } else {
        dispatch({
          type: PRODUCTS_ERROR,
          payload: error.data,
        });
      }
    }
  };
};

export const getFavorite = (body) => {
  return async (dispatch) => {
    try {
      let response = [];
      if (body !== undefined) {
        response = await HttpHelper.doPost("get_favorite", {
          user_id: body,
        });
      }
      console.log("response", response);
      dispatch({
        type: GET_FAVORITE,
        payload: response.data ? response.data : response,
      });
    } catch (error) {
      if (error.status === 400) {
        dispatch({
          type: PRODUCTS_ERROR,
          payload: error.data.details[0].message,
        });
      } else {
        dispatch({
          type: PRODUCTS_ERROR,
          payload: error.data,
        });
      }
    }
  };
};

export const setFavorite = (user, product) => {
  return async (dispatch) => {
    try {
      await HttpHelper.doPost("add_favorite", {
        user_id: user,
        product_id: product,
      });
      const response = await HttpHelper.doPost("get_favorite", {
        user_id: user,
      });
      dispatch({
        type: SET_FAVORITE,
        payload: response.data,
      });
    } catch (error) {
      if (error.status === 400) {
        dispatch({
          type: PRODUCTS_ERROR,
          payload: error.data.details[0].message,
        });
      } else {
        dispatch({
          type: PRODUCTS_ERROR,
          payload: error.data,
        });
      }
    }
  };
};

export const deleteFavorite = (user, body) => {
  return async (dispatch) => {
    try {
      const response = await HttpHelper.doPost("del_favorite", {
        user_id: user,
        product_id: body,
      });
      dispatch({
        type: DELETE_FAVORITE,
        payload: response.data,
      });
    } catch (error) {
      if (error.status === 400) {
        dispatch({
          type: PRODUCTS_ERROR,
          payload: error.data.details[0].message,
        });
      } else {
        dispatch({
          type: PRODUCTS_ERROR,
          payload: error.data,
        });
      }
    }
  };
};

export const getCart = () => {
  return async (dispatch) => {
    const currentCart = store.getState().cart.cart;
    if (currentCart === undefined || currentCart === null) {
      dispatch({ type: GET_CART, payload: [] });
    } else {
      dispatch({ type: GET_CART, payload: currentCart });
    }
  };
};

export const setCart = (product, increment) => {
  return async (dispatch) => {
    let currentCart = store.getState().cart.cart;
    if (currentCart === []) {
      product.quantity = 1;
      currentCart = [product];
    } else {
      const lookForItem = currentCart.filter((item) => {
        return (
          item.title === product.title && item.createdAt === product.createdAt
        );
      });
      if (lookForItem.length > 0) {
        const indexOfItem = currentCart.findIndex(
          (item) =>
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

export const deleteCartItem = (product) => {
  return async (dispatch) => {
    try {
      let currentCart = store.getState().cart.cart;
      const lookForItem = currentCart.filter((item) => {
        return (
          item.title === product.title && item.createdAt === product.createdAt
        );
      });
      if (lookForItem.length > 0) {
        const indexOfItem = currentCart.findIndex(
          (item) =>
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

export const clearCart = (body) => {
  return async (dispatch) => {
    try {
      await HttpHelper.doPost("clear_cart", {
        user_id: body,
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

export const updateUser = (body) => {
  return async (dispatch) => {
    try {
      const respone = await HttpHelper.doPost("users/update", body);
      dispatch({
        type: UPDATE_USER,
        payload: respone.data,
      });
    } catch (error) {
      if (error.status === 400) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: error.data.details[0].message,
        });
      } else {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: error.data,
        });
      }
    }
  };
};

export const incrementCartItem = (i) => {
  return async (dispatch) => {
    dispatch({
      type: INCREMENT_CART_ITEM,
      payload: i,
    });
  };
};

export const decrementCartItem = (i) => {
  return async (dispatch) => {
    dispatch({
      type: DECREMENT_CART_ITEM,
      payload: i,
    });
  };
};

export const cartTotal = () => {
  return async (dispatch) => {
    dispatch({
      type: CART_TOTAL,
    });
  };
};

export const updateCart = (array) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_CART,
      payload: array,
    });
  };
};

export const logUser = (email, password) => {
  return async (dispatch) => {
    if (email === "") {
      return dispatch({
        type: AUTH_ERROR,
        payload: "Please input email",
      });
    }
    if (password === "") {
      return dispatch({
        type: AUTH_ERROR,
        payload: "Please input password",
      });
    }

    try {
      const response = await HttpHelper.doPost("Auth/login", {
        email: email,
        pass: password,
      });
      if (response.err !== undefined) {
        return dispatch({
          type: AUTH_ERROR,
          payload: response.err,
        });
      }
      return dispatch({
        type: LOG_USER,
        payload: response,
      });
    } catch (error) {
      return dispatch({
        type: AUTH_ERROR,
        payload: error,
      });
    }
  };
};

export const deleteAddress = (user_id, address_id) => {
  return async (dispatch) => {
    try {
      const response = await HttpHelper.doPost("users/deleteAddress", {
        user_id,
        address_id,
      });
      if (Array.isArray(response.data)) {
        dispatch({
          type: DELETE_ADDRESS,
          payload: response.data,
        });
      }
    } catch (error) {
      return dispatch({
        type: AUTH_ERROR,
        payload: error,
      });
    }
  };
};

export const deleteCard = (user_id, card_id) => {
  return async (dispatch) => {
    try {
      const response = await HttpHelper.doPost("users/deleteCard", {
        user_id,
        card_id,
      });
      if (Array.isArray(response.data)) {
        dispatch({
          type: DELETE_CARD,
          payload: response.data,
        });
      }
    } catch (error) {
      return dispatch({
        type: AUTH_ERROR,
        payload: error,
      });
    }
  };
};

export const addAddress = (user_id, address) => {
  return async (dispatch) => {
    try {
      const response = await HttpHelper.doPost("users/addAddress", {
        user_id,
        address,
      });
      if (Array.isArray(response.data)) {
        dispatch({
          type: ADD_ADDRESS,
          payload: response.data,
        });
      }
    } catch (error) {
      return dispatch({
        type: AUTH_ERROR,
        payload: error,
      });
    }
  };
};

export const setContactId = (contactId) => {
  return async (dispatch) => {
    return dispatch({ type: SET_USER_CONTACTID, payload: contactId });
  };
};

export const removeUser = () => {
  return async (dispatch) => {
    return dispatch({ type: REMOVE_USER });
  };
};

export const changeSliderItemAndIndex = (item, index) => {
  return async (dispatch) => {
    return dispatch({ type: CHANGE_SLIDER_INDEX, payload: { item, index } });
  };
};

export const registerUser = (
  first_name,
  last_name,
  phone,
  pass,
  confirmpass,
  term_checked,
  email,
  base64Image
) => {
  return async (dispatch) => {
    if (first_name === "") {
      return dispatch({
        type: AUTH_ERROR,
        payload: "Please input first name.",
      });
    }
    if (last_name === "") {
      return dispatch({
        type: AUTH_ERROR,
        payload: "Please input last name.",
      });
    }
    if (email === "") {
      return dispatch({
        type: AUTH_ERROR,
        payload: "Please input email.",
      });
    }
    if (phone === "") {
      return dispatch({
        type: AUTH_ERROR,
        payload: "Please input phone number.",
      });
    }
    if (pass === "") {
      return dispatch({
        type: AUTH_ERROR,
        payload: "Please input password.",
      });
    }
    if (confirmpass === "") {
      return dispatch({
        type: AUTH_ERROR,
        payload: "Please confirm password.",
      });
    }
    if (confirmpass !== this.state.pass) {
      return dispatch({
        type: AUTH_ERROR,
        payload: "Please confirm password.",
      });
    }
    if (term_checked === false) {
      return dispatch({
        type: AUTH_ERROR,
        payload: "Please check the term agreement.",
      });
    }

    try {
      const response = await HttpHelper.doPost("Auth/signup", {
        first_name,
        last_name,
        email,
        phone,
        pass,
        base64Image,
      });
      if (response.data.id != null) {
        // success
        return dispatch({
          type: REGISTER_USER,
          payload: response.data,
        });
      }
      return dispatch({
        type: AUTH_ERROR,
        payload: JSON.stringify(response),
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.err,
      });
    }
  };
};

export const addCard = (user_id, card) => {
  return async (dispatch) => {
    try {
      const response = await HttpHelper.doPost("users/addCard", {
        user_id,
        card,
      });
      if (Array.isArray(response.data)) {
        dispatch({
          type: ADD_CARD,
          payload: response.data,
        });
      }
    } catch (error) {
      return dispatch({
        type: AUTH_ERROR,
        payload: error,
      });
    }
  };
};
export const getAppSettings = () => {
  return async (dispatch) => {
    try {
      const colors = await firebase
        .firestore()
        .collection("setting")
        .doc("color")
        .get();
      const logo = await firebase
        .firestore()
        .collection("setting")
        .doc("logo")
        .get();
      let settings = {
        colors: colors.data(),
        logo: logo.data(),
      };
      return dispatch({
        type: GET_APP_SETTINGS,
        payload: settings,
      });
    } catch (error) {
      return dispatch({
        type: SETTINGS_ERROR,
        payload: error,
      });
    }
  };
};
