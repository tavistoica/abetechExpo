import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Feather from "react-native-vector-icons/Feather";

interface Address {
  street: string;
  city: string;
  country: string;
  county: string;
  id: string;
}

interface Auth {
  id: string;
}

interface State {
  auth: Auth;
  settings: Settings;
}

interface Colors {
  fourth_color: string;
  main_color: string;
  primary_color: string;
  secondary_color: string;
  third_color: string;
}

interface Settings {
  colors: Colors;
  logo: string;
  errorMessage: string;
}

interface Props {
  address: Address;
  auth: Auth;
  settings: Settings;
  deleteAddress: (UserId: string, AddressId: string) => any;
}

const Address = (props: Props) => {
  return (
    <View
      style={[
        styles.Container,
        { backgroundColor: props.settings.colors.secondary_color },
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ flex: 6, flexDirection: "column" }}>
          <Text style={styles.StreetStyle}>{props.address.street}</Text>
          <Text style={styles.others}>City: {props.address.city}</Text>
          <Text style={styles.others}>County: {props.address.county}</Text>
          <Text style={styles.others}>Country: {props.address.country}</Text>
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

const mapStatetoProps = (state: State) => {
  return {
    auth: state.auth,
    settings: state.settings,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(Address);
