import { GET_APP_SETTINGS, SETTINGS_ERROR } from "../actions/types";

interface Action {
  type: string;
  payload: any;
}

const initialState = {
  colors: {},
  logo: "",
  errorMessage: null,
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_APP_SETTINGS:
      return {
        ...state,
        colors: action.payload.colors,
        logo: action.payload.logo.original,
        stripe: action.payload.stripe,
        errorMessage: null,
      };
    case SETTINGS_ERROR:
      return { ...state, colors: {}, errorMessage: action.payload };
    default:
      return state;
  }
};
