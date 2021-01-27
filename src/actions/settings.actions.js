import { GET_APP_SETTINGS, SETTINGS_ERROR } from "./types";
import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "../Helper/Constant";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
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
