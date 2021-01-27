import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { View, ScrollView, Button, FlatList, SafeAreaView } from "react-native";
import CardComponent from "../../Component/Cards/CardComponent";
import AddCard from "../../Component/Cards/AddCard";
import RBSheet from "react-native-raw-bottom-sheet";
import { height } from "react-native-dimension";
import SideViewHeader from "../../Component/SideViewHeader";
import OsWrapper from "../../Component/OsWrapper";

const ManageCards = (props) => {
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
        {...props}
      />
      <FlatList
        data={props.auth.cards}
        renderItem={({ item }) => (
          <CardComponent
            card={{
              id: item.id,
              cardNumber: item.cardNumber,
              cardName: item.cardName,
              month: item.month,
              year: item.year,
              type: item.type,
            }}
          />
        )}
        keyExtractor={(_item, index) => index.toString()}
      />
      <View
        style={{
          marginTop: 20,
          marginBottom: "5%",
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button title="+ Add Card" onPress={() => openModal()} />
      </View>
      <RBSheet
        ref={(ref) => {
          AddressModal = ref;
        }}
        height={height(50)}
        closeOnDragDown={true}
        customStyles={{
          container: {
            alignItems: "center",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <AddCard closeModal={closeModal} />
      </RBSheet>
    </OsWrapper>
  );
};

const mapStatetoProps = (state) => {
  return {
    auth: state.auth,
    settings: state.settings,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(ManageCards);
