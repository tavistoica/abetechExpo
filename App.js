import "react-native-gesture-handler";
import React, { Component } from "react";
import { StatusBar } from "react-native";
import Route from "./views/Route";
import { Provider } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./configureStore";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import BottomMenu from "./views/Component/BottomMenu";

const client = new ApolloClient({
  uri: "http://192.168.1.5:3000",
});

Icon.loadFont();
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
      <ApolloProvider client={client}>
        <StatusBar hidden />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Route />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </PersistGate>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
