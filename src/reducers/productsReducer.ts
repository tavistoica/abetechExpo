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
} from "../actions/types";

const initialState = {
  products: [],
  favorite: [],
  category: [],
  sliderIndex: null,
  sliderItem: null,
  errorMessage: null,
  loading: false,
};

interface Action {
  payload: any;
  type: string;
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case PRODUCTS_LOADING:
      return { ...state, loading: true };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    case SEARCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case PRODUCTS_ERROR:
      return {
        ...state,
        products: [],
        errorMessage: action.payload,
        loading: false,
      };
    case GET_FAVORITE:
      return { ...state, favorite: action.payload, loading: false };
    case SET_FAVORITE:
      return { ...state, favorite: action.payload, loading: false };
    case DELETE_FAVORITE:
      return { ...state, favorite: action.payload, loading: false };
    case CHANGE_SLIDER_INDEX:
      return {
        ...state,
        sliderIndex: action.payload.index,
        sliderItem: action.payload.item,
        loading: false,
      };
    default:
      return state;
  }
};
