import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./Screens/Splash";
import BottomMenu from "./Component/BottomMenu";
import Favs from "./Screens/Favs";
import MyCart from "./Screens/MyCart";
import DiscoveryPage from "./Screens/DiscoverPage";
import ChangeDetails from "./Screens/Profile/ChangeDetails";
import ChangePassword from "./Screens/Profile/ChangePassword";
import ManageAddresses from "./Screens/Profile/ManageAddresses";
import ManageCards from "./Screens/Profile/ManageCards";
import ProductList from "./Screens/ProductList";
import ProductDetailCard from "./Screens/ProductDetailCard";
import ProductDetailShow from "./Screens/ProductDetailShow";
import Chat from "./Screens/Chat";
import Profile from "./Screens/Profile";
import { navigationRef } from "./Component/RootNavigation";

const Stack = createStackNavigator();
export default function Route() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="splash"
      >
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="product_list" component={ProductList} />
        <Stack.Screen name="product_detail" component={ProductDetailCard} />
        <Stack.Screen name="favs" component={Favs} />
        <Stack.Screen name="mycart" component={MyCart} />
        <Stack.Screen name="chat" component={Chat} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="detailshow" component={ProductDetailShow} />
        <Stack.Screen name="discoveryPage" component={DiscoveryPage} />
        <Stack.Screen name="changeDetails" component={ChangeDetails} />
        <Stack.Screen name="changePassword" component={ChangePassword} />
        <Stack.Screen name="manageAddresses" component={ManageAddresses} />
        <Stack.Screen name="manageCards" component={ManageCards} />
      </Stack.Navigator>
      <BottomMenu />
    </NavigationContainer>
  );
}
