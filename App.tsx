import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import Route from "./src/views/Route";
import { Provider } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/configureStore";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
//  @ts-ignore
import Toast from "react-native-toast-message";
import { StripeProvider } from "@stripe/stripe-react-native";
import { setStripeConf } from "./src/utils/FirebaseHelper";

// import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "react-apollo";

// const client = new ApolloClient({
//   uri: "http://192.168.1.5:3000",
// });

Icon.loadFont();

interface Stripe {
  stripe_pub_key: string;
  payment_enabled: Boolean;
}

const App: React.FC = () => {
  const [stripeConfig, setStripeConfig] = useState<Stripe>({
    stripe_pub_key: "",
    payment_enabled: false,
  });

  useEffect(() => {
    setStripeConf().then((res: any) => {
      setStripeConfig(res);
    });
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
  }, []);

  return (
    // <ApolloProvider client={client}>
    <StripeProvider
      publishableKey={stripeConfig.stripe_pub_key}
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier={`merchant.com.${"To-Be-Replaced"}`} // required for Apple Pay
    >
      <StatusBar hidden />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Route />
          <Toast ref={(ref: any) => Toast.setRef(ref)} />
        </PersistGate>
      </Provider>
    </StripeProvider>
    // </ApolloProvider>
  );
};

export default App;
