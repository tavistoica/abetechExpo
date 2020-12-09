import "react-native-gesture-handler";
import React, { Component } from "react";
import Route from "./views/Route";
import reduxThunk from "redux-thunk";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./views/reducers";
import Icon from "react-native-vector-icons/MaterialIcons";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./configureStore";
import { Container, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

Icon.loadFont();
//createStore(reducers, undefined, applyMiddleware(reduxThunk))

class App extends Component {
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Route />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
