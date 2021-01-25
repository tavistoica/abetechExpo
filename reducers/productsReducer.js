import {
  GET_PRODUCTS,
  GET_CATEGORY,
  PRODUCTS_ERROR,
  SEARCH_PRODUCTS,
  GET_FAVORITE,
  SET_FAVORITE,
  DELETE_FAVORITE,
  CHANGE_SLIDER_INDEX,
} from "../actions/types";

const initialState = {
  products: [],
  favorite: [],
  category: [],
  sliderIndex: null,
  sliderItem: null,
  errorMessage: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case SEARCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case PRODUCTS_ERROR:
      return { ...state, products: [], errorMessage: action.payload };
    case GET_FAVORITE:
      return { ...state, favorite: action.payload };
    case SET_FAVORITE:
      return { ...state, favorite: action.payload };
    case DELETE_FAVORITE:
      console.log("DELETE", action.payload);
      return { ...state, favorite: action.payload };
    case CHANGE_SLIDER_INDEX:
      return {
        ...state,
        sliderIndex: action.payload.index,
        sliderItem: action.payload.item,
      };
    default:
      return state;
  }
};
