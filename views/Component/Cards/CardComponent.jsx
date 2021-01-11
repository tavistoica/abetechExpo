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
import * as actions from "../../../actions";
import Feather from "react-native-vector-icons/Feather";
import PropTypes from "prop-types";

const CardComponent = (props) => {
  return (
    <View style={styles.Container}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ flex: 6, flexDirection: "column" }}>
          <Text style={styles.StreetStyle}>
            {props.card.type}
            {" ****"}
            {props.card.cardNumber.substr(props.card.cardNumber.length - 4)}
          </Text>
          <Text style={styles.others}>{props.card.cardName}</Text>
          <Text style={styles.others}>
            {props.card.month}/{props.card.year}
          </Text>
        </View>
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center" }}
          onPress={() => props.deleteCard(props.auth.id, props.card.id)}
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

CardComponent.propTypes = {
  auth: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
};
