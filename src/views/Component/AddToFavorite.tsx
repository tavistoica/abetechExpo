import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface Props {
  item: any;
  auth: Auth;
  favorite: any;
  settings: Settings;
  style: object;
  setFavorite: (userId: string, product: object) => void;
  deleteFavorite: (userId: string, product: object) => void;
  getProducts: (query: object) => void;
}

interface Auth {
  id: string;
}

interface Settings {
  colors: {
    secondary_color: string;
  };
}

const AddToFavorite = (props: Props) => {
  const [icon, setIcon] = useState("favorite-border");

  useEffect(() => {
    if (props.favorite)
      setIcon(
        props.favorite.filter((item: { id: any }) => item.id === props.item.id)
          .length > 0
          ? "favorite"
          : "favorite-border"
      );
  }, []);

  return (
    <TouchableOpacity
      onPress={async () => {
        if (icon !== "favorite") {
          props.setFavorite(props.auth.id, props.item.id);
        } else {
          props.deleteFavorite(props.auth.id, props.item.id);
        }
        props.getProducts({});
        setIcon(icon === "favorite" ? "favorite-border" : "favorite");
      }}
      style={props.style}
    >
      <MaterialIcons
        name={icon}
        color={props.settings.colors.secondary_color}
        size={26}
        style={{ color: "red" }}
      />
    </TouchableOpacity>
  );
};

export default AddToFavorite;
