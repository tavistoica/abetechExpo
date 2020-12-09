import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  Main_color,
  Primary_color,
  Secondary_color,
  Third_color,
  Fourth_color,
} from "../../../Helper/Common";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Feather from "react-native-vector-icons/Feather";

const CardComponent = (props) => {
  console.log(props);
  return (
    <View style={styles.Container}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ flex: 6, flexDirection: "column" }}>
          <Text style={styles.StreetStyle}>{props.card.cardNumber}</Text>
          <Text style={styles.others}>{props.card.cardName}</Text>
          <Text style={styles.others}>
            {props.card.month}/{props.card.year}
          </Text>
        </View>
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center" }}
          onPress={() => props.deleteAddress(props.auth.id, props.address.id)}
        >
          <Feather name="trash" size={32} color={"red"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: Secondary_color(),
    paddingLeft: 10,
    paddingVertical: 10,
  },
  StreetStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  others: {
    paddingRight: 5,
  },
});

const mapStatetoProps = (state) => {
  return {
    category: state.products.category,
    auth: state.auth,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(CardComponent);
