import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./Screens/splash-page/Splash";
import BottomMenu from "./Component/bottom-menu/BottomMenu";
import FavoritePage from "./Screens/favorite-page/FavoritePage";
import Cart from "./Screens/cart-page/Cart";
import ChangeDetails from "./Screens/profile-page/components/ChangeDetails";
import ChangePassword from "./Screens/profile-page/components/ChangePassword";
import ManageAddresses from "./Screens/profile-page/components/ManageAddresses";
import ManageCards from "./Screens/profile-page/components/ManageCards";
import ProductPage from "./Screens/product-page/ProductPage";
import ProductDetailCard from "./Screens/discover-page/components/ProductDetailCard";
import ProductDetailShow from "./Screens/product-detail-page/ProductDetailShow";
import Chat from "./Screens/chat-page/Chat";
import Profile from "./Screens/profile-page/Profile";
import { navigationRef } from "./Component/RootNavigation";
import StripeCheckout from "./Screens/cart-page/components/StripeCheckout";

const Stack = createStackNavigator();
export default function Route() {
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="splash"
        >
          <Stack.Screen name="splash" component={Splash} />
          <Stack.Screen name="product_list" component={ProductPage} />
          <Stack.Screen name="favs" component={FavoritePage} />
          <Stack.Screen name="mycart" component={Cart} />
          <Stack.Screen name="chat" component={Chat} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="detailshow" component={ProductDetailShow} />
          <Stack.Screen name="discoveryPage" component={ProductDetailCard} />
          <Stack.Screen name="changeDetails" component={ChangeDetails} />
          <Stack.Screen name="changePassword" component={ChangePassword} />
          <Stack.Screen name="manageAddresses" component={ManageAddresses} />
          <Stack.Screen name="manageCards" component={ManageCards} />
          <Stack.Screen name="stripeCheckout" component={StripeCheckout} />
        </Stack.Navigator>
      </NavigationContainer>
      <BottomMenu />
    </>
  );
}
