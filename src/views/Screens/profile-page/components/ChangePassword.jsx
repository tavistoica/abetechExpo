import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { width } from "react-native-dimension";
import { connect } from "react-redux";
import * as actions from "../../../../actions";
import SideViewHeader from "../../../Component/SideViewHeader";
import OsWrapper from "../../../Component/OsWrapper";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.auth.username,
      email: this.props.auth.email,
      phone: this.props.auth.phone,
      pass: "",
      confirmpass: "",
      err_msg_name: "",
      err_msg_email: "",
      err_msg_phone: "",
      err_msg_pass: "",
      err_msg_confirmpass: "",
      status: "",
      loading: false,
      isModalVisible: false,
      photoUrl: "https://www.gradebacker.com" + global.image,
      base64Image: "",
    };
  }

  doUpdate = async () => {
    this.setState({
      err_msg_name: "",
      err_msg_email: "",
      err_msg_phone: "",
      err_msg_pass: "",
      err_msg_confirmpass: "",
    });
    if (this.state.name === "") {
      this.setState({ err_msg_name: "Please input username." });
      return;
    }
    if (this.state.email === "") {
      this.setState({ err_msg_email: "Please input email." });
      return;
    }
    if (this.state.phone === "") {
      this.setState({ err_msg_phone: "Please input phone number." });
      return;
    }
    if (this.state.pass === "") {
      this.setState({ err_msg_pass: "Please input password." });
      return;
    }
    if (this.state.confirmpass === "") {
      this.setState({ err_msg_confirmpass: "Please confirm password." });
      return;
    }
    if (this.state.confirmpass !== this.state.pass) {
      this.setState({ err_msg_confirmpass: "Please confirm password." });
      return;
    }

    this.setState({
      err_msg_name: "",
      err_msg_email: "",
      err_msg_phone: "",
      err_msg_pass: "",
      err_msg_confirmpass: "",
      status: "",
      loading: true,
    });

    try {
      let response = await axios({
        method: "post",
        url: api_base_url + "update",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          user_id: this.props.auth.id,
          username: this.state.name,
          password: this.state.pass,
          email: this.state.email,
          phone: this.state.phone,
          name: this.state.name,
          base64Image: this.state.base64Image,
        },
      });

      let data = await response.data;

      if (data.user != null && data.user !== 0) {
        // success
        let user_detail = null; // this code needs checking
        if (user_detail != null) {
          global.username = user_detail.username;
          global.email = user_detail.youremail;
          global.phone = user_detail.phone;
          global.image = user_detail.image;
        }
        this.setState({
          status: "Update success!",
          name: global.username,
          email: global.email,
          phone: global.phone,
          photoUrl: "https://www.gradebacker.com" + global.image,
          loading: false,
        });
      } else if (data.user == null) {
        this.setState({ status: Msg_Register_Failed, loading: false });
      } else {
        if (
          data.reponse.username != null &&
          data.reponse.username.length != null &&
          data.reponse.username.length > 0
        ) {
          this.setState({
            status: Msg_Register_Failed,
            err_msg_name: data.reponse.username[0],
            loading: false,
          });
        }
        if (
          data.reponse.email != null &&
          data.reponse.email.length != null &&
          data.reponse.email.length > 0
        ) {
          this.setState({
            err_msg_email: data.reponse.email[0],
            loading: false,
          });
        }
        if (
          data.reponse.phone != null &&
          data.reponse.phone.length != null &&
          data.reponse.phone.length > 0
        ) {
          this.setState({
            err_msg_phone: data.reponse.phone[0],
            loading: false,
          });
        }
        if (
          data.reponse.password != null &&
          data.reponse.password.length != null &&
          data.reponse.password.length > 0
        ) {
          this.setState({
            err_msg_pass: data.reponse.password[0],
            loading: false,
          });
        }
        this.setState({ status: Msg_Register_Failed, loading: false });
      }
    } catch (err) {
      this.setState({ status: err.message, loading: false });
    }
  };

  renderContent() {
    return (
      <View style={{ marginTop: "30%", marginHorizontal: "10%" }}>
        <View style={styles.formItem}>
          <TextInput
            onChangeText={(value) => this.setState({ name: value })}
            placeholder="Old Password"
            autoCapitalize="none"
            style={styles.inputTxt}
          />
        </View>
        {this.state.err_msg_name !== "" ? (
          <Text style={{ color: "#ff0000", textAlign: "center" }}>
            {this.state.err_msg_name}
          </Text>
        ) : null}
        <View style={styles.formItem}>
          <TextInput
            onChangeText={(value) => this.setState({ email: value })}
            placeholder="New Password"
            autoCorrect={true}
            autoCapitalize="none"
            style={styles.inputTxt}
          />
        </View>
        {this.state.err_msg_email != "" ? (
          <Text style={{ color: "#ff0000", textAlign: "center" }}>
            {this.state.err_msg_email}
          </Text>
        ) : null}
        <View style={styles.formItem}>
          <TextInput
            onChangeText={(value) => this.setState({ phone: value })}
            placeholder="Repeat Password"
            autoCapitalize="none"
            style={styles.inputTxt}
          />
        </View>
        {this.state.err_msg_phone != "" ? (
          <Text style={{ color: "#ff0000", textAlign: "center" }}>
            {this.state.err_msg_phone}
          </Text>
        ) : null}
        <View style={{ padding: 30, width: "100%", marginBottom: 20 }}>
          <TouchableOpacity
            onPress={this.doUpdate}
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
  }

  render() {
    return (
      <OsWrapper>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <SideViewHeader
            name="Change password"
            redirect={"profile"}
            navigation={this.props.navigation}
            {...this.props}
          />
          {this.renderContent()}
        </View>
      </OsWrapper>
    );
  }
}

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
    // justifyContent: "flex-start",
    alignItems: "center",
    // paddingLeft: 30,
    // paddingRight: 30,
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
    favorite: state.products,
    auth: state.auth,
    settings: state.settings,
  };
};

export default connect(
  mapStateToProps,
  actions
)(ChangePassword);
