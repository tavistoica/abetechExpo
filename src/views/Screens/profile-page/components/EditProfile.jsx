import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { width } from "react-native-dimension";
import ImagePicker from "react-native-image-picker";
import CustomModal from "../../../Component/CustomModal";
import ListItem from "../../../Component/ListItem";
import OsWrapper from "../../../Component/OsWrapper";
import LogoutButton from "../../../Component/LogoutButton";
import UserAvatar from "./UserAvatar";

const EditProfile = (props) => {
  const [base64Image, setBase64Image] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const requestCameraPermission = async () => {
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
          setBase64Image(response.data);
        }
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const requestImagGalleryPermission = async () => {
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
          setBase64Image(response.data);
        }
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const onModalResult = (res) => {
    setIsModalVisible(false);
    if (res === -1) {
      return;
    } else if (res === 0) {
      // take photo
      requestCameraPermission();
    } else if (res === 1) {
      // select from image gallery
      requestImagGalleryPermission();
    }
  };

  const settingsArray = [
    { text: "Order History", redirect: "" },
    { text: "Manage Addresses", redirect: "manageAddresses" },
    { text: "Manage Payment Methods", redirect: "manageCards" },
    { text: "Change Password", redirect: "changePassword" },
    { text: "Technical Support", redirect: "" },
  ];

  return (
    <OsWrapper>
      <View style={{ flex: 16, flexDirection: "column" }}>
        <CustomModal
          isModalVisible={isModalVisible}
          onModalResult={onModalResult}
          title="Select Avatar"
          buttons={["Take Photo from Camera", "Select from Image Library"]}
        />
        <View style={styles.container}>
          <LogoutButton {...props} />
          <View style={styles.banner_container}>
            <View style={styles.searchBar}>
              <UserAvatar {...props} />
              <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "bold" }}>
                {`${props.auth.first_name} ${props.auth.last_name}`}
              </Text>
              <Text style={{ marginTop: 5, marginBottom: 10, fontSize: 15 }}>
                {`${props.auth.email} `}
              </Text>
              <ListItem
                text={"Manage Account Details"}
                redirect={"changeDetails"}
                {...props}
              />
              <FlatList
                data={settingsArray}
                style={{ padding: 10 }}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={({ item }) => (
                  <ListItem
                    text={item.text}
                    redirect={item.redirect}
                    {...props}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </OsWrapper>
  );
};

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
