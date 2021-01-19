import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { width, height } from "react-native-dimension";
import { Msg_Login_Success } from "../../Helper/Constant";
import {
  _retrieveData,
  _storeData,
  _getUserDetail,
  _getSemesterSlug,
} from "../../Helper/Util";
import Spinner from "react-native-loading-spinner-overlay";
import Register from "./Register";
import RBSheet from "react-native-raw-bottom-sheet";

const SignIn = (props) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const RegisterModal = useRef(null);

  useEffect(() => {
    setLoading(false);
    setError(props.auth.errorMessage);
  }, [props.auth.errorMessage]);

  const close = () => {
    props.close();
  };

  const openRegister = () => {
    this.RegisterModal.open();
  };
  const closeRegister = () => {
    this.RegisterModal.close();
  };

  const doSign = async () => {
    setError("");
    setLoading(true);

    props.logUser(email, password);
    if (props.auth.errorMessage !== null) {
      setError(props.auth.errorMessage);
    } else if (props.auth.userId !== null) {
      await _storeData("user", props.auth);
      props.goHome();
      setStatus(Msg_Login_Success);
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <Spinner visible={loading} />
      <View style={styles.container}>
        <View style={styles.banner_container}>
          <View style={styles.title}>
            <Text style={styles.title_label}>Sign In</Text>
          </View>
          <View style={styles.title}>
            <Text style={{ color: "#ff0000" }}>{status}</Text>
          </View>
          <View style={styles.searchBar}>
            {error != "" ? (
              <Text style={{ color: "#ff0000" }}>{error}</Text>
            ) : null}
            <View style={styles.formItem}>
              <AntDesignIcon
                style={{ marginHorizontal: -30 }}
                size={24}
                color="#3434ff77"
                name="mail"
              />
              <TextInput
                onChangeText={(value) => setEmail(value)}
                placeholder="Your email"
                autoCapitalize="none"
                style={styles.inputTxt}
              />
            </View>
            <View style={styles.formItem}>
              <AntDesignIcon
                style={{ marginHorizontal: -30 }}
                size={24}
                color="#3434ff77"
                name="lock"
              />
              <TextInput
                onChangeText={(value) => setPassword(value)}
                placeholder="Your password"
                secureTextEntry={true}
                autoCapitalize="none"
                style={styles.inputTxt}
              />
            </View>
            <View style={{ padding: 10, width: "100%" }}>
              <TouchableOpacity
                onPress={() => doSign()}
                style={[
                  styles.button,
                  { backgroundColor: props.settings.colors.main_color },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: props.settings.colors.secondary_color },
                  ]}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ padding: 10, width: "100%" }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: props.settings.colors.main_color },
                ]}
                onPress={() => openRegister()}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: props.settings.colors.secondary_color },
                  ]}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <RBSheet
          ref={RegisterModal}
          height={height(93)}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          }}
        >
          <Register close={closeRegister} goHome={props.goHome} {...props} />
        </RBSheet>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: "20%",
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
  list_container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
  title_label: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    // marginLeft: 24,
    marginBottom: 24,
  },
  title: {},
  inputTxt: {
    textAlignVertical: "center",
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
  },
  searchBar: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  formItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginLeft: 40,
  },
  button: {
    width: width(70),
    padding: 10,
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

export default SignIn;
