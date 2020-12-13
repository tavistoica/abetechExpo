// import { actionTypes } from "redux-form";
import {
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
  ADD_ADDRESS,
  GET_ADDRESSES,
  DELETE_ADDRESS,
  AUTH_ERROR,
  ADD_CARD,
  DELETE_CARD,
} from "../actions/types";

const initialState = {
  id: null,
  photo: null,
  first_name: null,
  last_name: null,
  contact_id: null,
  pass: null,
  email: null,
  phone: null,
  addresses: [],
  cards: [],
  createdAt: null,
  errorMessage: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_USER:
      return {
        ...state,
        id: action.payload.id,
        photo: action.payload.data.photo,
        first_name: action.payload.data.first_name,
        last_name: action.payload.data.last_name,
        contact_id: action.payload.data.contact_id,
        pass: action.payload.data.pass,
        email: action.payload.data.email,
        phone: action.payload.data.phone,
        addresses: action.payload.data.addresses,
        cards: action.payload.data.cards,
        createdAt: action.payload.data.createdAt,
      };
    case REGISTER_USER:
      return {
        ...state,
        id: action.payload,
      };
    case REMOVE_USER:
      return {
        id: null,
        photo: null,
        first_name: null,
        last_name: null,
        contact_id: null,
        pass: null,
        email: null,
        phone: null,
        cards: [],
        addresses: [],
        createdAt: null,
        errorMessage: null,
      };
    case ADD_CARD:
      return {
        ...state,
        cards: action.payload,
        errorMessage: null,
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: action.payload,
        errorMessage: null,
      };
    case GET_ADDRESSES:
      return {
        ...state,
        addresses: action.payload,
        errorMessage: null,
      };
    case ADD_ADDRESS:
      return {
        ...state,
        addresses: action.payload,
        errorMessage: null,
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        addresses: action.payload,
        errorMessage: null,
      };
    case SET_USER_ID:
      return {
        ...state,
        id: action.payload,
        errorMessage: null,
      };
    case SET_USER_PHOTO:
      return {
        ...state,
        photo: action.payload,
        errorMessage: null,
      };
    case SET_USER_FIRSTNAME:
      return {
        ...state,
        first_name: action.payload,
        errorMessage: null,
      };
    case SET_USER_LASTNAME:
      return { ...state, last_name: action.payload, errorMessage: null };
    case SET_USER_CONTACTID:
      return { ...state, contact_id: action.payload, errorMessage: null };
    case SET_USER_PASSWORDENCRYPTED:
      return { ...state, pass: action.payload, errorMessage: null };
    case SET_USER_EMAIL:
      return { ...state, favorite: action.payload, errorMessage: null };
    case SET_USER_PHONE:
      return { ...state, phone: action.payload, errorMessage: null };
    case SET_USER_CREATED_DATE:
      return { ...state, createdAt: action.payload, errorMessage: null };
    case AUTH_ERROR:
      return { ...(state = initialState), errorMessage: action.payload };
    default:
      return state;
  }
};
