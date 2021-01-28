import {
  INCREMENT_CART_ITEM,
  DECREMENT_CART_ITEM,
  UPDATE_CART,
  CART_TOTAL,
  LOG_USER,
  REGISTER_USER,
  REMOVE_USER,
  SET_USER_CONTACTID,
  DELETE_ADDRESS,
  ADD_ADDRESS,
  DELETE_CARD,
  ADD_CARD,
  AUTH_ERROR,
  UPDATE_USER,
  UPDATE_USER_ERROR,
} from "./types";
import HttpHelper from "../utils/HttpHelper";

interface updateBody {
  first_name?: any;
  last_name?: any;
  email?: any;
  phone?: any;
  user_id?: any;
}

export const updateUser = (body: updateBody) => {
  return async (dispatch: any) => {
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

export const incrementCartItem = (i: number) => {
  return async (dispatch: any) => {
    dispatch({
      type: INCREMENT_CART_ITEM,
      payload: i,
    });
  };
};

export const decrementCartItem = (i: number) => {
  return async (dispatch: any) => {
    dispatch({
      type: DECREMENT_CART_ITEM,
      payload: i,
    });
  };
};

export const cartTotal = () => {
  return async (dispatch: any) => {
    dispatch({
      type: CART_TOTAL,
    });
  };
};

export const updateCart = (array: object[]) => {
  return async (dispatch: any) => {
    dispatch({
      type: UPDATE_CART,
      payload: array,
    });
  };
};

export const logUser = (email: string, password: string) => {
  return async (dispatch: any) => {
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

export const registerUser = (
  first_name: string,
  last_name: string,
  phone: string,
  pass: string,
  confirmpass: string,
  term_checked: boolean,
  email: string,
  base64Image: string
) => {
  return async (dispatch: any) => {
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
    if (confirmpass !== pass) {
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

export const removeUser = () => {
  return async (dispatch: any) => {
    return dispatch({ type: REMOVE_USER });
  };
};

export const setContactId = (contactId: string) => {
  return async (dispatch: any) => {
    return dispatch({ type: SET_USER_CONTACTID, payload: contactId });
  };
};

export const addCard = (user_id: string, card: string) => {
  return async (dispatch: any) => {
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

export const deleteAddress = (user_id: string, address_id: string) => {
  return async (dispatch: any) => {
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

export const deleteCard = (user_id: string, card_id: string) => {
  return async (dispatch: any) => {
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

export const addAddress = (user_id: string, address: string) => {
  return async (dispatch: any) => {
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
