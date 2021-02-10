import {
  GET_PRODUCTS,
  GET_CATEGORY,
  PRODUCTS_ERROR,
  SEARCH_PRODUCTS,
  GET_FAVORITE,
  SET_FAVORITE,
  DELETE_FAVORITE,
  CHANGE_SLIDER_INDEX,
  PRODUCTS_LOADING,
} from "./types";
import HttpHelper from "../utils/HttpHelper";

export const getProducts = (body: object) => {
  return async (dispatch: any) => {
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

export const productsLoading = () => {
  return async (dispatch: any) => {
    dispatch({ type: PRODUCTS_LOADING });
  };
};

export const searchProducts = (search: string) => {
  return async (dispatch: any) => {
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

// export const changeSliderItemAndIndex = (item, index) => {
//   return async (dispatch: any) => {
//     return dispatch({ type: CHANGE_SLIDER_INDEX, payload: { item, index } });
//   };
// };

export const getCategory = (body: object) => {
  return async (dispatch: any) => {
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

export const getFavorite = (user_id: string) => {
  return async (dispatch: any) => {
    try {
      let response = [];
      if (user_id !== undefined) {
        response = await HttpHelper.doPost("get_favorite", {
          user_id,
        });
      }
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

export const setFavorite = (user_id: string, product_id: string) => {
  return async (dispatch: any) => {
    try {
      await HttpHelper.doPost("add_favorite", {
        user_id,
        product_id,
      });
      const response = await HttpHelper.doPost("get_favorite", {
        user_id,
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

export const deleteFavorite = (user_id: string, product_id: string) => {
  return async (dispatch: any) => {
    try {
      const response = await HttpHelper.doPost("del_favorite", {
        user_id,
        product_id,
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
