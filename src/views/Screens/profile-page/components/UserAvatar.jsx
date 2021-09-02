import React, { useState, useEffect } from "react";
import { View, Platform, Button } from "react-native";
import { Avatar } from "react-native-elements";
import { width, height } from "react-native-dimension";
import { GlobalImgs } from "../../../../assets/imgs";
import * as ImagePicker from "expo-image-picker";
import CustomModal from "../../../Component/CustomModal";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

const UserAvatar = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const requestCameraPermission = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        setImage(data.uri);
      }
    }
  };

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        console.log("REEEEES ", result);

        if (!result.cancelled) {
          setImage(result.uri);
        }
      }
    }
  };

  const onModalResult = (res) => {
    if (res === -1) {
      return;
    } else if (res === 0) {
      // take photo
      requestCameraPermission();
    } else if (res === 1) {
      // select from image gallery
      pickImage();
    }
  };

  return (
    <View>
      <CustomModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onModalResult={onModalResult}
        title="Select Avatar"
        buttons={["Take Photo from Camera", "Select from Image Library"]}
      />
      <Avatar
        rounded
        onPress={() => setIsModalVisible(true)}
        containerStyle={{ borderWidth: 2, borderColor: "#fff" }}
        size={width(25)}
        source={
          props.auth.photo == null || props.auth.photo.original == null
            ? GlobalImgs.default_user
            : {
                uri: props.auth.photo.original,
              }
        }
      />
    </View>
  );
};

export default UserAvatar;
