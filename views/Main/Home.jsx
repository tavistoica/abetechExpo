import React from "react";
import {
  BackHandler,
  Share,
  View,
  Text,
  Dimensions,
  Button,
  LogBox,
  StatusBar,
  ImageBackground,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { GlobalImgs } from "@assets/imgs";
import { width, height, totalSize } from "react-native-dimension";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Avatar } from "react-native-elements";
import EditProfile from "../Screens/Profile/EditProfile";
import ProductList from "../Screens/ProductList";
import ProductDetailCard from "../Screens/ProductDetailCard";
import ProductDetailShow from "../Screens/ProductDetailShow";
import Chat from "../Screens/Chat";
import { _retrieveData, _storeData, _removeData } from "../../Helper/Util";
import HttpHelper from "../../Helper/HttpHelper";
import Favs from "../Screens/Favs";
import MyCart from "../Screens/MyCart";
import {
  Main_color,
  Primary_color,
  Secondary_color,
  Third_color,
  Fourth_color,
} from "../../Helper/Common";
import SideMenu from "../Component/sideMenu";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Provider } from "react-redux";
import { store } from "../../configureStore";
import BottomMenu from "../Component/BottomMenu";
import DiscoveryPage from "../Screens/DiscoverPage";
import ChangeDetails from "../Screens/Profile/ChangeDetails";
import ChangePassword from "../Screens/Profile/ChangePassword";
import ManageAddresses from "../Screens/Profile/ManageAddresses";
import ManageCards from "../Screens/Profile/ManageCards";

const Drawer = createDrawerNavigator();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }

  render() {
    return (
      <>
        <StatusBar hidden />
        <Provider store={store}>
          <Drawer.Navigator
            initialRouteName="product_list"
            drawerType={
              Dimensions.get("window").width >= 768 ? "permanent" : "front"
            }
            drawerStyle={styles.drawerStyle}
            drawerContent={(props) => <SideMenu {...props} />}
            overlayColor={20}
          >
            <Drawer.Screen name="product_list" component={ProductList} />
            <Drawer.Screen
              name="product_detail"
              component={ProductDetailCard}
            />
            <Drawer.Screen name="favs" component={Favs} />
            <Drawer.Screen name="mycart" component={MyCart} />
            <Drawer.Screen name="chat" component={Chat} />
            <Drawer.Screen name="edit_profile" component={EditProfile} />
            <Drawer.Screen name="detailshow" component={ProductDetailShow} />
            <Drawer.Screen name="discoveryPage" component={DiscoveryPage} />
            <Drawer.Screen name="changeDetails" component={ChangeDetails} />
            <Drawer.Screen name="changePassword" component={ChangePassword} />
            <Drawer.Screen name="manageAddresses" component={ManageAddresses} />
            <Drawer.Screen name="manageCards" component={ManageCards} />
          </Drawer.Navigator>
        </Provider>
        <BottomMenu {...this.props} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  drawerStyle: {
    backgroundColor: "#fff",
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    width: width(70),
  },
  userInfo: {
    marginTop: height(8),
    marginBottom: height(2),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  drawerItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
  },
  drawerItem_icon: {
    marginRight: 7,
  },
  drawerItem_txt: {
    fontSize: 20,
    fontWeight: "bold",
    borderBottomColor: "#B034CD",
    borderBottomWidth: 1,
  },
});

const mapStatetoProps = (state) => {
  return {
    products: state.products.products,
    auth: state.auth,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(Home);
