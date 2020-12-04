import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  Main_color,
  Primary_color,
  Secondary_color,
  Third_color,
  Fourth_color,
} from "../../Helper/Common";
import { width } from "react-native-dimension";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import * as actions from "../actions";

const AddAddress = (props) => {
  let [street, setStreet] = useState("");
  let [city, setCity] = useState("");
  let [country, setCountry] = useState("");
  let [county, setCounty] = useState("");

  const AddAddressButton = (props, street, city, county, country) => {
    props.addAddress(props.auth.id, { street, city, county, country });
    props.closeModal();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.formItem, { marginBottom: 30 }]}>
        <Text style={{ fontSize: 20 }}>Add Address</Text>
      </View>
      <View style={styles.formItem}>
        <TextInput
          onChangeText={(value) => setStreet(value)}
          placeholder="Enter street"
          autoCapitalize="true"
          style={styles.inputTxt}
        />
      </View>
      <View style={styles.formItem}>
        <TextInput
          onChangeText={(value) => setCity(value)}
          placeholder="Enter city"
          autoCapitalize="true"
          style={styles.inputTxt}
        />
      </View>
      <View style={styles.formItem}>
        <TextInput
          onChangeText={(value) => setCounty(value)}
          placeholder="Enter county"
          autoCapitalize="true"
          style={styles.inputTxt}
        />
      </View>
      <View style={styles.formItem}>
        <TextInput
          onChangeText={(value) => setCountry(value)}
          placeholder="Enter county"
          autoCapitalize="true"
          style={styles.inputTxt}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: Primary_color() }]}
        onPress={() => AddAddressButton(props, street, city, county, country)}
      >
        <Text style={[styles.buttonText, { color: Secondary_color() }]}>
          Add
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    width: "100%",
  },
  inputTxt: {
    textAlignVertical: "center",
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
  },
  formItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  button: {
    width: width(70),
    padding: 10,
    marginTop: 30,
    margin: 5,
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
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
)(AddAddress);
