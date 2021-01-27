import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { width } from "react-native-dimension";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import SideViewHeader from "../../Component/SideViewHeader";
import Toast from "react-native-toast-message";
import OsWrapper from "../../Component/OsWrapper";

const ChangeDetails = (props) => {
  const [firstName, setFirstName] = useState(props.auth.first_name);
  const [lastName, setLastName] = useState(props.auth.last_name);
  const [email, setEmail] = useState(props.auth.email);
  const [phone, setPhone] = useState(props.auth.phone);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setBodyObject = () => {
    const obj = {};
    if (firstName !== props.auth.first_name) obj["first_name"] = firstName;
    if (lastName !== props.auth.last_name) obj["last_name"] = lastName;
    if (email !== props.auth.email) obj["email"] = email;
    if (phone !== props.auth.phone) obj["phone"] = phone;
    if (Object.keys(obj).length !== 0) {
      obj["user_id"] = props.auth.id;
    }
    return obj;
  };

  const doUpdate = async () => {
    setError("");
    if (firstName === "" || firstName === undefined) {
      setError("Please input first name.");
      return;
    } else if (lastName === "" || lastName === undefined) {
      setError("Please input last name");
      return;
    } else if (email === "" || email === undefined) {
      setError("Please input email.");
      return;
    } else if (phone === "" || phone === undefined) {
      setError("Please input phone number.");
      return;
    }
    setLoading(true);
    const bodyObject = setBodyObject();
    if (Object.keys(bodyObject).length !== 0) {
      await props.updateUser(bodyObject);
      if (!props.auth.updateUserErrorMessage)
        Toast.show({
          text1: "Account succesfully updated!",
          position: "top",
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 80,
        });
    }
  };

  const renderContent = () => {
    return (
      <View style={{ marginTop: "30%", marginHorizontal: "10%" }}>
        {error !== "" ? (
          <Text style={{ color: "#ff0000", textAlign: "center" }}>{error}</Text>
        ) : null}
        <View style={styles.formItem}>
          <AntDesignIcon size={24} color="#3434ff77" name="user" />
          <TextInput
            onChangeText={setFirstName}
            placeholder="first name"
            autoCapitalize="words"
            value={firstName}
            style={styles.inputTxt}
          />
        </View>
        <View style={styles.formItem}>
          <AntDesignIcon size={24} color="#3434ff77" name="user" />
          <TextInput
            onChangeText={setLastName}
            placeholder="last name"
            autoCapitalize="words"
            value={lastName}
            style={styles.inputTxt}
          />
        </View>
        <View style={styles.formItem}>
          <AntDesignIcon size={24} color="#3434ff77" name="mail" />
          <TextInput
            onChangeText={setEmail}
            placeholder="email"
            autoCapitalize="none"
            value={email}
            style={styles.inputTxt}
          />
        </View>
        <View style={styles.formItem}>
          <AntDesignIcon size={24} color="#3434ff77" name="phone" />
          <TextInput
            onChangeText={setPhone}
            placeholder="phone"
            autoCapitalize="none"
            value={phone}
            style={styles.inputTxt}
          />
        </View>
        <View style={{ padding: 30, width: "100%", marginBottom: 20 }}>
          <TouchableOpacity
            onPress={doUpdate}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#3434ff77",
              height: 40,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <OsWrapper>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <SideViewHeader
          name="Change details"
          redirect={"profile"}
          navigation={props.navigation}
          {...props}
        />
        {renderContent()}
      </View>
    </OsWrapper>
  );
};

const styles = StyleSheet.create({
  fixedView: {
    position: "absolute",
    marginRight: 16,
    right: 0,
    top: "0%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
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
  menu: {
    paddingTop: 20,
    paddingLeft: "10%",
  },
  list_container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
  title_label: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft: 24,
    marginBottom: 24,
  },
  title: {},
  inputTxt: {
    textAlignVertical: "center",
    fontSize: 16,
    height: "100%",
    textAlign: "center",
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    marginLeft: -40,
  },
  searchBar: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  formItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginLeft: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    settings: state.settings,
  };
};

export default connect(
  mapStateToProps,
  actions
)(ChangeDetails);
