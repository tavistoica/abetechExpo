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
  Button,
  FlatList,
  SafeAreaView,
} from "react-native";
import {
  Main_color,
  Primary_color,
  Secondary_color,
  Third_color,
  Fourth_color,
} from "../../../Helper/Common";
import Address from "../../Component/Address";
import AddAddress from "../../Component/AddAddress";
import Feather from "react-native-vector-icons/Feather";
import RBSheet from "react-native-raw-bottom-sheet";
import { height } from "react-native-dimension";

class ManageAddresses extends React.Component {
  constructor(props) {
    super(props);
  }

  openModal = () => {
    this.AddressModal.open();
  };
  closeModal = () => {
    this.AddressModal.close();
  };

  header() {
    return (
      <View
        style={{
          flexDirection: "row",
          textAlignVertical: "center",
          textAlign: "center",
          width: "100%",
          marginBottom: "5%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("edit_profile");
          }}
          style={{ flex: 1, marginLeft: "5%" }}
        >
          <Feather name="arrow-left" size={32} color={Third_color()} />
        </TouchableOpacity>
        <View
          style={{
            flex: 3,
            textAlign: "center",
            textAlignVertical: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            Manage Addresses
          </Text>
        </View>
      </View>
    );
  }

  render() {
    console.log("ododo", this.props.auth.addresses);

    return (
      <>
        <SafeAreaView>
          {this.header()}
          <ScrollView style={{ height: "100%" }}>
            <FlatList
              data={this.props.auth.addresses}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flexDirection: "column",
                    margin: 1,
                    marginHorizontal: 10,
                  }}
                >
                  <Address
                    address={{
                      id: item.id,
                      city: item.city,
                      street: item.street,
                      county: item.county,
                      country: item.country,
                    }}
                  />
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <View
              style={{
                marginTop: 20,
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button title="+ Add Address" onPress={() => this.openModal()} />
            </View>
          </ScrollView>
          <RBSheet
            ref={(ref) => {
              this.AddressModal = ref;
            }}
            height={height(50)}
            // openDuration={250}
            closeOnDragDown={true}
            customStyles={{
              container: {
                // justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              },
            }}
          >
            <AddAddress closeModal={this.closeModal} />
          </RBSheet>
        </SafeAreaView>
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
