import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { width } from "react-native-dimension";
import ListItem from "../../../Component/ListItem";
import OsWrapper from "../../../Component/OsWrapper";
import LogoutButton from "../../../Component/LogoutButton";
import UserAvatar from "./UserAvatar";

const EditProfile = (props) => {
  const settingsArray = [
    { text: "Order History", redirect: "" },
    { text: "Manage Addresses", redirect: "manageAddresses" },
    { text: "Manage Payment Methods", redirect: "manageCards" },
    { text: "Change Password", redirect: "changePassword" },
    { text: "Technical Support", redirect: "" },
  ];

  return (
    <OsWrapper>
      <View style={{ flex: 16, flexDirection: "column" }}>
        <View style={styles.container}>
          <LogoutButton {...props} />
          <View style={styles.banner_container}>
            <View style={styles.searchBar}>
              <UserAvatar {...props} />
              <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "bold" }}>
                {`${props.auth.first_name} ${props.auth.last_name}`}
              </Text>
              <Text style={{ marginTop: 5, marginBottom: 10, fontSize: 15 }}>
                {`${props.auth.email} `}
              </Text>
              <ListItem
                text={"Manage Account Details"}
                redirect={"changeDetails"}
                {...props}
              />
              <FlatList
                data={settingsArray}
                style={{ padding: 10 }}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={({ item }) => (
                  <ListItem
                    text={item.text}
                    redirect={item.redirect}
                    {...props}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </OsWrapper>
  );
};

const styles = StyleSheet.create({
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
  searchBar: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default EditProfile;
