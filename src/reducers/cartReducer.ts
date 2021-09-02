import {
  GET_CART,
  DELETE_CART,
  CLEAR_CART,
  CART_ERROR,
  INCREMENT_CART_ITEM,
  DECREMENT_CART_ITEM,
  UPDATE_CART,
  DELETE_CART_ITEM,
  CART_TOTAL,
} from "../actions/types";

interface Product {
  id: string;
  quantity: number;
  title: string;
  createdAt: string;
  promotion_price: string;
  price: string;
}

interface InitialState {
  cart: Product[];
  cartTotal: number;
  errorMessage: string;
}

const initialState: InitialState = {
  cart: [],
  cartTotal: 0,
  errorMessage: "",
};

interface Action {
  payload: any;
  type: string;
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case DELETE_CART:
      return {
        ...state,
        cart: [],
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    case INCREMENT_CART_ITEM:
      return {
        ...state,
        cart: action.payload,
      };
    case DECREMENT_CART_ITEM:
      const indexDecrement = state.cart.findIndex(
        (item: Product) => item.id === action.payload.id
      );
      state.cart[indexDecrement].quantity += 1;
      return {
        ...state,
        cart: state.cart,
      };
    case DELETE_CART_ITEM:
      return {
        ...state,
        cart: action.payload,
      };
    case CART_TOTAL:
      const cart = [...state.cart];
      let total = 0;
      cart.forEach((item) => {
        total +=
          item.promotion_price !== ""
            ? parseInt(item.promotion_price) * item.quantity
            : parseInt(item.price) * item.quantity;
      });
      return {
        ...state,
        cartTotal: total,
      };
    case UPDATE_CART:
      return { ...state, cart: action.payload };
    case CART_ERROR:
      return { ...state, cart: [], errorMessage: action.payload };
    default:
      return state;
  }
};
