import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { View, ScrollView, Button, FlatList, SafeAreaView } from "react-native";
import Address from "../../Component/Address";
import AddAddress from "../../Component/AddAddress";
import RBSheet from "react-native-raw-bottom-sheet";
import { height } from "react-native-dimension";
import SideViewHeader from "../../Component/SideViewHeader";
import OsWrapper from "../../Component/OsWrapper";

const ManageAddresses = (props) => {
  let AddressModal = null;

  const openModal = () => {
    AddressModal.open();
  };
  const closeModal = () => {
    AddressModal.close();
  };

  return (
    <OsWrapper>
      <SideViewHeader
        name="Manage Cards"
        redirect={"profile"}
        navigation={props.navigation}
      />
      <ScrollView style={{ height: "100%" }}>
        <FlatList
          data={props.auth.addresses}
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
          <Button title="+ Add Address" onPress={() => openModal()} />
        </View>
      </ScrollView>
      <RBSheet
        ref={(ref) => {
          AddressModal = ref;
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
        <AddAddress closeModal={closeModal} />
      </RBSheet>
    </OsWrapper>
  );
};

const mapStatetoProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(ManageAddresses);
