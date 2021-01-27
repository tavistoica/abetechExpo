"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var native_1 = require("@react-navigation/native");
var stack_1 = require("@react-navigation/stack");
var Splash_1 = __importDefault(require("./Screens/Splash"));
var BottomMenu_1 = __importDefault(require("./Component/BottomMenu"));
var Favs_1 = __importDefault(require("./Screens/Favs"));
var MyCart_1 = __importDefault(require("./Screens/MyCart"));
var ChangeDetails_1 = __importDefault(require("./Screens/Profile/ChangeDetails"));
var ChangePassword_1 = __importDefault(require("./Screens/Profile/ChangePassword"));
var ManageAddresses_1 = __importDefault(require("./Screens/Profile/ManageAddresses"));
var ManageCards_1 = __importDefault(require("./Screens/Profile/ManageCards"));
var ProductList_1 = __importDefault(require("./Screens/ProductList"));
var ProductDetailCard_1 = __importDefault(require("./Screens/ProductDetailCard"));
var ProductDetailShow_1 = __importDefault(require("./Screens/ProductDetailShow"));
var Chat_1 = __importDefault(require("./Screens/Chat"));
var Profile_1 = __importDefault(require("./Screens/Profile"));
var RootNavigation_1 = require("./Component/RootNavigation");
var Stack = stack_1.createStackNavigator();
function Route() {
    return (<native_1.NavigationContainer ref={RootNavigation_1.navigationRef}>
      <Stack.Navigator screenOptions={{
        headerShown: false,
    }} initialRouteName="splash">
        <Stack.Screen name="splash" component={Splash_1.default}/>
        <Stack.Screen name="product_list" component={ProductList_1.default}/>
        <Stack.Screen name="favs" component={Favs_1.default}/>
        <Stack.Screen name="mycart" component={MyCart_1.default}/>
        <Stack.Screen name="chat" component={Chat_1.default}/>
        <Stack.Screen name="profile" component={Profile_1.default}/>
        <Stack.Screen name="detailshow" component={ProductDetailShow_1.default}/>
        <Stack.Screen name="discoveryPage" component={ProductDetailCard_1.default}/>
        <Stack.Screen name="changeDetails" component={ChangeDetails_1.default}/>
        <Stack.Screen name="changePassword" component={ChangePassword_1.default}/>
        <Stack.Screen name="manageAddresses" component={ManageAddresses_1.default}/>
        <Stack.Screen name="manageCards" component={ManageCards_1.default}/>
      </Stack.Navigator>
      <BottomMenu_1.default />
    </native_1.NavigationContainer>);
}
exports.default = Route;
