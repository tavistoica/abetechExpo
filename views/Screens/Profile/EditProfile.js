import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Input, Button, Avatar } from "react-native-elements";
import { GlobalImgs, HomeImgs } from "@assets/imgs";
import { width, height, totalSize } from "react-native-dimension";
import Entypo from "react-native-vector-icons/Entypo";
import ImagePicker from "react-native-image-picker";
import MyModal from "../../../customComponent/MyModal";
import { FAB } from "react-native-paper";
import { api_base_url, Msg_Register_Failed } from "../../../Helper/Constant";
import {
  _retrieveData,
  _storeData,
  _getUserDetail,
} from "../../../Helper/Util";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../actions";
import {
  Main_color,
  Primary_color,
  Secondary_color,
  Third_color,
  Fourth_color,
} from "../../../Helper/Common";
import Register from "../../Auth/Register";
import SignIn from "../../Auth/SignIn";
import RBSheet from "react-native-raw-bottom-sheet";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "",
      loading: false,
      isModalVisible: false,
      photoUrl: "https://www.gradebacker.com" + global.image,
      base64Image: "",
    };
  }

  openRegister = () => {
    this.RegisterModal.open();
  };
  closeRegister = () => {
    this.RegisterModal.close();
  };

  requestCameraPermission = async () => {
    try {
      const options = {
        title: "Select Avatar",
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
      };
      ImagePicker.launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else {
          this.setState({
            photoUrl: response.uri,
            base64Image: response.data,
          });
        }
      });
    } catch (err) {
      console.warn(err);
    }
  };

  requestImagGalleryPermission = async () => {
    try {
      const options = {
        title: "Select Avatar",
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
      };
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
          this.setState({
            photoUrl: response.uri,
            base64Image: response.data,
          });
        }
      });
    } catch (err) {
      console.warn(err);
    }
  };

  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  listItem = (text, redirect) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate(redirect);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            // margin: 1,
            // textAlign: "center",
            backgroundColor: Secondary_color(),
            width: "100%",
            // height: "100%",
            marginBottom: 1,
            paddingVertical: 12,
            textAlignVertical: "center",

            color: "#fff",
          }}
        >
          <Text
            style={{
              width: "100%",
              // paddingLeft: 20,
              // height: "100%",
              fontSize: 20,
              textAlign: "center",
              textAlignVertical: "center",
              // marginBottom: 10,
              color: "#fff",
            }}
          >
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  onModalResult = (res) => {
    this.setState({ isModalVisible: false });
    if (res === -1) {
      return;
    } else if (res === 0) {
      // take photo
      this.requestCameraPermission();
    } else if (res === 1) {
      // select from image gallery
      this.requestImagGalleryPermission();
    }
  };

  profileContent = () => {
    return (
      <>
        <View style={{ flex: 16, flexDirection: "column" }}>
          <Spinner visible={this.state.loading} />
          <MyModal
            isModalVisible={this.state.isModalVisible}
            onModalResult={this.onModalResult}
            title="Select Avatar"
            buttons={["Take Photo from Camera", "Select from Image Library"]}
          />
          <View style={styles.container}>
            <View style={styles.fixedView}>
              <FAB
                style={styles.fab}
                small
                color="white"
                icon="login"
                onPress={() => {
                  this.props.removeUser();
                  this.props.clearCart();
                  this.props.deleteFavorite();
                }}
              />
            </View>
            <View style={styles.banner_container}>
              <View style={styles.searchBar}>
                <View>
                  <Avatar
                    rounded
                    onPress={() => this.showModal()}
                    containerStyle={{ borderWidth: 2, borderColor: "#fff" }}
                    size={width(25)}
                    source={
                      this.props.auth.photo == null ||
                      this.props.auth.photo.original == null
                        ? GlobalImgs.default_user
                        : {
                            uri: this.props.auth.photo.original,
                          }
                    }
                  />
                </View>
                <Text
                  style={{ marginTop: 10, fontSize: 20, fontWeight: "bold" }}
                >
                  {`${this.props.auth.first_name} ${this.props.auth.last_name}`}
                </Text>
                <Text style={{ marginTop: 5, marginBottom: 10, fontSize: 15 }}>
                  {`${this.props.auth.email} `}
                </Text>
                {this.listItem("Manage Account Details", "changeDetails")}

                <ScrollView style={{ width: width(100), padding: 10 }}>
                  {this.listItem("Order History")}
                  {this.listItem("Manage Addresses", "manageAddresses")}
                  {this.listItem("Manage Payment Methods")}
                  {this.listItem("Change Password", "changePassword")}
                  {this.listItem("Technical Support")}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  render() {
    return (
      <>
        {Platform.OS === "ios" ? (
          <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
            {this.props.auth.id ? this.profileContent() : <SignIn />}
          </SafeAreaView>
        ) : (
          <View style={{ flex: 1, flexDirection: "column" }}>
            {this.profileContent()}
          </View>
        )}
      </>
    );
    // return <View style={{ flex: 1, flexDirection: "column" }} />;
  }
}

const styles = StyleSheet.create({
  fixedView: {
    position: "absolute",
    marginRight: 16,
    right: 0,
    top: "0%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "flex-start",
    alignItems: "center",
    // paddingLeft: 30,
    // paddingRight: 30,
    paddingTop: 30,
    paddingBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  title: {},
  inputTxt: {
    textAlignVertical: "center",
    fontSize: 16,
    height: "100%",
    textAlign: "center",
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    marginLeft: -40,
  },
  searchBar: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  fab: {
    backgroundColor: Main_color(),
  },
  formItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginLeft: 10,
  },
});

const mapStatetoProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(EditProfile);
