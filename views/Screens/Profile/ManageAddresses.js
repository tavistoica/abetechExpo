import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  FlatList,
  SafeAreaView,
} from "react-native";

class ManageAddresses extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <SafeAreaView>
          <Text style={{ color: "black" }}>
            {this.props.auth.addresses.length}
          </Text>
        </SafeAreaView>
        {console.log(this.props.auth.addresses)}
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
)(ManageAddresses);
