import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { width } from "react-native-dimension";
import ImagePicker from "react-native-image-picker";
import CustomModal from "../../Component/CustomModal";
import {
  _retrieveData,
  _storeData,
  _getUserDetail,
} from "../../../Helper/Util";
import Spinner from "react-native-loading-spinner-overlay";
import ListItem from "../../Component/ListItem";
import OsWrapper from "../../Component/OsWrapper";
import LogoutButton from "../../Component/LogoutButton";
import UserAvatar from "../../Component/UserAvatar";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "",
      loading: false,
      isModalVisible: false,
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

  render() {
    return (
      <OsWrapper>
        <View style={{ flex: 16, flexDirection: "column" }}>
          <Spinner visible={this.state.loading} />
          <CustomModal
            isModalVisible={this.state.isModalVisible}
            onModalResult={this.onModalResult}
            title="Select Avatar"
            buttons={["Take Photo from Camera", "Select from Image Library"]}
          />
          <View style={styles.container}>
            <LogoutButton {...this.props} />
            <View style={styles.banner_container}>
              <View style={styles.searchBar}>
                <UserAvatar {...this.props} />
                <Text
                  style={{ marginTop: 10, fontSize: 20, fontWeight: "bold" }}
                >
                  {`${this.props.auth.first_name} ${this.props.auth.last_name}`}
                </Text>
                <Text style={{ marginTop: 5, marginBottom: 10, fontSize: 15 }}>
                  {`${this.props.auth.email} `}
                </Text>
                <ListItem
                  text={"Manage Account Details"}
                  redirect={"changeDetails"}
                  {...this.props}
                />

                <ScrollView style={{ width: width(100), padding: 10 }}>
                  <ListItem text={"Order History"} {...this.props} />
                  <ListItem
                    text={"Manage Addresses"}
                    redirect={"manageAddresses"}
                    {...this.props}
                  />
                  <ListItem
                    text={"Manage Payment Methods"}
                    redirect={"manageCards"}
                    {...this.props}
                  />
                  <ListItem
                    text={"Change Password"}
                    redirect={"changePassword"}
                    {...this.props}
                  />
                  <ListItem text={"Technical Support"} {...this.props} />
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </OsWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
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
  searchBar: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default EditProfile;
