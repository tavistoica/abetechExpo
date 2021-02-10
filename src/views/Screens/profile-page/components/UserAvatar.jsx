import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-elements";
import { width, height } from "react-native-dimension";
import { GlobalImgs } from "../../../../assets/imgs";

const UserAvatar = (props) => {
  return (
    <View>
      <Avatar
        rounded
        onPress={() => props.showModal()}
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
