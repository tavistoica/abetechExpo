import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  SafeAreaView,
  Text,
} from "react-native";
import { width } from "react-native-dimension";
import { Main_color, Secondary_color } from "../../Helper/Common";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import { connect } from "react-redux";
import * as actions from "../actions";
import FilterMenu from "./filterMenu";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      loading: false,
      searchText: "",
      category: "all",
      products: [],
      categories: [],
    };
  }

  searchProduct = () => {
    this.setState({ loading: true });
    this.props.searchProducts(this.state.searchText);
  };

  headerBeforePlatformCheck = () => {
    return (
      <>
        {/* <TouchableOpacity
          onPress={() => {
            this.props.navigation.openDrawer();
          }}
          style={styles.headerMenu}>
          <Entypo name="menu" size={32} color={Secondary_color()} />
        </TouchableOpacity> */}
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TextInput
            onChangeText={(value) => this.setState({ searchText: value })}
            autoFocus={false}
            onSubmitEditing={() => this.searchProduct()}
            placeholder="Search product..."
            placeholderTextColor="grey"
            autoCorrect={false}
            autoCapitalize="none"
            style={[styles.inputTxt, { borderColor: Main_color() }]}
          />
        </View>
        {/* <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('mycart');
          }}
          style={styles.headerCart}>
          <Entypo name="shopping-basket" size={28} color={Secondary_color()} />
        </TouchableOpacity> */}
      </>
    );
  };

  render() {
    return (
      <>
        {Platform.OS === "ios" ? (
          <>
            <SafeAreaView
              style={[styles.header, { backgroundColor: Main_color() }]}
            >
              {this.headerBeforePlatformCheck()}
            </SafeAreaView>
          </>
        ) : (
          <>
            <View style={[styles.header, { backgroundColor: Main_color() }]}>
              {this.headerBeforePlatformCheck()}
            </View>
          </>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  headerMenu: {
    width: width(10),
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: 10,
  },
  headerCart: {
    width: width(10),
    justifyContent: "center",
    alignItems: "center",
    // mpaddingRight: 20,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 55,
  },
  filter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: width(100),
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    width: width(100),
  },
  banner_container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  list_container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
  title_label: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft: 24,
    marginBottom: 24,
  },
  inputTxt: {
    textAlignVertical: "center",
    fontSize: 16,
    textAlign: "center",
    width: width(100),
    height: "90%",
    backgroundColor: "#fff",
    // borderWidth: 1,
    borderRadius: 5,
  },
  searchBar: {
    flex: 1,
    width: "100%",
  },
  formItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  submit_btn: {
    height: 45,
    width: width(75),
    marginTop: 10,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStatetoProps = (state) => {
  return {
    products: state.products.products,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(Header);
