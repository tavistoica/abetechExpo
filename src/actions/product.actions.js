import {
  GET_PRODUCTS,
  GET_CATEGORY,
  PRODUCTS_ERROR,
  SEARCH_PRODUCTS,
  GET_FAVORITE,
  SET_FAVORITE,
  DELETE_FAVORITE,
  CHANGE_SLIDER_INDEX,
} from "./types";
import HttpHelper from "../Helper/HttpHelper";

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

export const changeSliderItemAndIndex = (item, index) => {
  return async (dispatch) => {
    return dispatch({ type: CHANGE_SLIDER_INDEX, payload: { item, index } });
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
