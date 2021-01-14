import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Input, Button, Avatar } from "react-native-elements";
import { GlobalImgs, HomeImgs } from "@assets/imgs";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { width, height, totalSize } from "react-native-dimension";
import {
  api_base_url,
  Msg_Login_Success,
  Msg_Login_Failed,
} from "../../Helper/Constant";
import {
  _retrieveData,
  _storeData,
  _getUserDetail,
  _getSemesterSlug,
} from "../../Helper/Util";
import Spinner from "react-native-loading-spinner-overlay";
import HttpHelper from "../../Helper/HttpHelper";
import {
  Main_color,
  Primary_color,
  Secondary_color,
  Third_color,
  Fourth_color,
} from "../../Helper/Common";
import { connect } from "react-redux";
import Register from "./Register";
import RBSheet from "react-native-raw-bottom-sheet";
import * as actions from "../../actions";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      loading: false,
      status: "",
      email: "",
      password: "",
      err_msg: "",
    };
  }

  close = () => {
    this.props.close();
  };

  openRegister = () => {
    this.RegisterModal.open();
  };
  closeRegister = () => {
    this.RegisterModal.close();
  };

  doSign = async () => {
    this.setState({
      err_msg: "",
      loading: true,
    });

    await this.props.logUser(this.state.email, this.state.password);
    if (this.props.auth.errorMessage !== null) {
      this.setState({ loading: false });
      this.setState({ err_msg: this.props.auth.errorMessage });
    } else if (this.props.auth.userId !== null) {
      await _storeData("user", this.props.auth);
      this.props.goHome();
      this.setState({ status: Msg_Login_Success, loading: false });
    } else {
      this.setState({ status: this.props.auth.errorMessage, loading: false });
    }
  };

  render() {
    return (
      <>
        <Spinner visible={this.state.loading} />
        <View style={styles.container}>
          <View style={styles.banner_container}>
            <View style={styles.title}>
              <Text style={styles.title_label}>Sign In</Text>
            </View>
            <View style={styles.title}>
              <Text style={{ color: "#ff0000" }}>{this.state.status}</Text>
            </View>
            <View style={styles.searchBar}>
              {this.state.err_msg != "" ? (
                <Text style={{ color: "#ff0000" }}>{this.state.err_msg}</Text>
              ) : null}
              <View style={styles.formItem}>
                <AntDesignIcon
                  style={{ marginHorizontal: -30 }}
                  size={24}
                  color="#3434ff77"
                  name="mail"
                />
                <TextInput
                  onChangeText={(value) => this.setState({ email: value })}
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
                  onChangeText={(value) => this.setState({ password: value })}
                  placeholder="Your password"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  style={styles.inputTxt}
                />
              </View>
              {/* {this.state.err_msg != "" ? (
                <Text style={{ color: "#ff0000" }}>{this.state.err_msg}</Text>
              ) : null} */}

              <View style={{ padding: 10, width: "100%" }}>
                <TouchableOpacity
                  onPress={() => this.doSign()}
                  style={[styles.button, { backgroundColor: Primary_color() }]}
                >
                  <Text
                    style={[styles.buttonText, { color: Secondary_color() }]}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ padding: 10, width: "100%" }}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: Primary_color() }]}
                  onPress={() => this.openRegister()}
                >
                  <Text
                    style={[styles.buttonText, { color: Secondary_color() }]}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <RBSheet
            ref={(ref) => {
              this.RegisterModal = ref;
            }}
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
            <Register close={this.closeRegister} goHome={this.goHome} />
          </RBSheet>
        </View>
      </>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(SignIn);

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
