import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface Props {
  item: any;
  goChat: () => any;
  onSwipedBottom: (item: any) => any;
  onSwipedRight: (item: any) => any;
  onSwipedTop: (item: any) => any;
  settings: { colors: Colors };
}

interface Colors {
  main_color: string;
  secondary_color: string;
  primary_color: string;
}

const CardButtons = (props: Props) => {
  return (
    <View style={styles.buttons}>
      <TouchableOpacity style={styles.smallButtons} onPress={props.goChat}>
        <MaterialIcons
          color={props.settings.colors.main_color}
          name="chat"
          size={24}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.bigButtons,
          {
            backgroundColor: props.settings.colors.main_color,
          },
        ]}
        onPress={() => props.onSwipedRight(props.item)}
      >
        <AntDesignIcon
          color={props.settings.colors.secondary_color}
          name="heart"
          size={26}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.bigButtons,
          {
            backgroundColor: props.settings.colors.primary_color,
          },
        ]}
        onPress={() => props.onSwipedBottom(props.item)}
      >
        <AntDesignIcon
          color={props.settings.colors.secondary_color}
          name="shoppingcart"
          size={26}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.smallButtons}
        onPress={() => props.onSwipedTop(props.item)}
      >
        <FontAwesome
          color={props.settings.colors.main_color}
          name="info"
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    width: "100%",
    height: "10%",
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  smallButtons: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  bigButtons: {
    padding: 16,
    borderRadius: 40,
  },
});

export default CardButtons;
