import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  TextInput,
  Platform,
  SafeAreaView,
} from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { width, height } from "react-native-dimension";
import Entypo from "react-native-vector-icons/Entypo";
import Spinner from "react-native-loading-spinner-overlay";
import LeftMsg from "../Component/LeftMsg";
import RightMsg from "../Component/RightMsg";
import { _getAllMsgs } from "../../Helper/FirebaseHelper";
import HttpHelper from "../../Helper/HttpHelper";
import CustomModal from "../Component/CustomModal";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      loading: false,
      messages: [],
      msg: "",
      isModalVisible: false,
      contact_id: this.props.route.params.contact_id,
    };
  }

  componentDidMount() {
    this.getOldMsgs();
    this.focusListener = this.props.navigation.addListener("focus", () => {
      if (this.scrollView != null) {
        this.scrollView.scrollToEnd({ animated: true });
      }
    });
  }

  getOldMsgs = async () => {
    this.setState({ loading: true });
    let msgs = await _getAllMsgs(this.state.contact_id);
    this.setState({ loading: false, messages: msgs });
  };

  addMessage = (msg_obj) => {
    let cur_messages = this.state.messages;
    cur_messages.push(msg_obj);
    this.setState({ messages: cur_messages });
  };

  sendMessage = async () => {
    if (this.state.msg === "") return;
    Keyboard.dismiss();
    HttpHelper.doPost(
      "write_msg",
      {
        user_id: this.props.auth.id,
        contact_id: this.state.contact_id,
        message: this.state.msg,
      },
      (data) => {
        if (data.data === "success") {
          this.setState({ msg: "" });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };

  sendImage = (photo) => {
    this.setState({ loading: true });
    HttpHelper.doPost(
      "write_msg",
      {
        user_id: this.props.auth.id,
        contact_id: this.state.contact_id,
        photo: photo,
      },
      (data) => {
        if (data.data === "success") {
          this.setState({ msg: "" });
        }
        this.setState({ loading: false });
      },
      (err) => {
        console.log(err);
        this.setState({ loading: false });
      }
    );
  };

  uploadImage = (base64Image) => {
    this.setState({ loading: true });
    HttpHelper.doPost(
      "image_upload_base64",
      {
        base64Image: base64Image,
      },
      (data) => {
        if (data.status == "success") {
          this.sendImage(data.photo);
        }
        this.setState({ loading: false });
      },
      (err) => {
        console.log(err);
        this.setState({ loading: false });
      }
    );
  };

  requestCameraPermission = async () => {
    try {
      const options = {
        title: "Select Avatar",
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
        quality: 0.4,
      };
      ImagePicker.launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else {
          this.uploadImage(response.data);
        }
      });
    } catch (err) {
      console.warn(err);
    }
  };

  requestImagGalleryPermission = async () => {
    try {
      const options = {
        title: "Select Avatar",
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
        quality: 0.4,
      };
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
          this.uploadImage(response.data);
        }
      });
    } catch (err) {
      console.warn(err);
    }
  };

  onModalResult = (res) => {
    this.setState({ isModalVisible: false });
    if (res === -1) {
      return;
    } else if (res === 0) {
      // take photo
      this.requestCameraPermission();
    } else if (res === 1) {
      // select from image gallery
      this.requestImagGalleryPermission();
    }
  };

  header = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.openDrawer();
          }}
          style={styles.menu}
        >
          <Entypo
            name="menu"
            size={32}
            color={this.props.settings.colors.secondary_color}
          />
        </TouchableOpacity>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              fontSize: 20,
              color: this.props.settings.colors.secondary_color,
              fontWeight: "bold",
            }}
          >
            Owner
          </Text>
        </View>
        <TouchableOpacity style={{ width: 30 }} />
      </>
    );
  };

  sendBar = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.setState({ isModalVisible: true })}
        >
          <AntDesignIcon
            name="camera"
            style={{
              color: this.props.settings.colors.secondary_color,
              fontWeight: "bold",
            }}
            size={32}
          />
        </TouchableOpacity>
        <TextInput
          onChangeText={(value) => this.setState({ msg: value })}
          placeholder="message"
          autoCapitalize="none"
          multiline={true}
          value={this.state.msg}
          style={styles.inputTxt}
        />
        <TouchableOpacity
          style={[
            styles.btn,
            { backgroundColor: props.settings.colors.primary_color },
          ]}
          onPress={() => this.sendMessage()}
        >
          <MaterialIcons
            name="send"
            style={{
              color: props.settings.colors.secondary_color,
              fontWeight: "bold",
            }}
            size={32}
          />
        </TouchableOpacity>
      </>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, height: height(100), flexDirection: "column" }}>
        <CustomModal
          isModalVisible={this.state.isModalVisible}
          onModalResult={this.onModalResult}
          title="Select Image"
          buttons={["Take Photo from Camera", "Select from Image Library"]}
        />
        {Platform.OS === "ios" ? (
          <SafeAreaView
            style={[
              styles.header,
              { backgroundColor: this.props.settings.colors.main_color },
            ]}
          >
            {this.header()}
          </SafeAreaView>
        ) : (
          <View
            style={[
              styles.header,
              { backgroundColor: this.props.settings.colors.main_color },
            ]}
          >
            {this.header()}
          </View>
        )}
        <View style={styles.container}>
          <Spinner visible={this.state.loading} />
          <ScrollView
            ref={(ref) => {
              this.scrollView = ref;
            }}
            onContentSizeChange={() =>
              this.scrollView.scrollToEnd({ animated: true })
            }
            style={styles.scroller_container}
          >
            <View style={styles.msg_list}>
              {this.state.messages.map((message, index) =>
                message.from == null ? null : message.from ==
                  this.props.auth.id ? (
                  <RightMsg key={index} message={message} />
                ) : (
                  <LeftMsg key={index} message={message} />
                )
              )}
            </View>
          </ScrollView>
        </View>
        {Platform.OS === "ios" ? (
          <SafeAreaView
            style={[
              styles.msg_input,
              { backgroundColor: this.props.settings.colors.secondary_color },
            ]}
          >
            {this.sendBar()}
          </SafeAreaView>
        ) : (
          <View
            style={[
              styles.msg_input,
              { backgroundColor: this.props.settings.colors.secondary_color },
            ]}
          >
            {this.sendBar()}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    paddingLeft: 10,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    width: width(100),
    height: 55,
  },
  container: {
    flex: 16,
    flexDirection: "column",
    paddingTop: 5,
    width: width(100),
  },
  scroller_container: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
    width: "100%",
    height: "100%",
    marginBottom: 20,
  },
  msg_list: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },
  msg_input: {
    flex: 1,
    height: 55,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: width(100),
  },
  inputTxt: {
    textAlignVertical: "center",
    borderColor: "#fff",
    width: width(70),
    height: "70%",
    textAlign: "left",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    width: width(10),
  },
});

const mapStatetoProps = (state) => {
  return {
    auth: state.auth,
    settings: state.settings,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(Chat);
