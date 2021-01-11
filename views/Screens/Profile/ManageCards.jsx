import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { View, ScrollView, Button, FlatList, SafeAreaView } from "react-native";
import CardComponent from "../../Component/Cards/CardComponent";
import AddCard from "../../Component/Cards/AddCard";
import RBSheet from "react-native-raw-bottom-sheet";
import { height } from "react-native-dimension";
import SideViewHeader from "../../Component/SideViewHeader";

const ManageCards = (props) => {
  let AddressModal = null;

  const openModal = () => {
    AddressModal.open();
  };
  const closeModal = () => {
    AddressModal.close();
  };
  return (
    <>
      <SafeAreaView>
        <SideViewHeader
          name="Manage Cards"
          redirect={"edit_profile"}
          navigation={props.navigation}
        />
        <ScrollView style={{ height: "100%" }}>
          <FlatList
            data={props.auth.cards}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: "column",
                  margin: 1,
                  marginHorizontal: 10,
                }}
              >
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
            <Button title="+ Add Card" onPress={() => openModal()} />
          </View>
        </ScrollView>
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
      </SafeAreaView>
    </>
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
)(ManageCards);
