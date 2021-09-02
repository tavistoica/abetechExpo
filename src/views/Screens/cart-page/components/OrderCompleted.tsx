import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";

interface Props {
  user: any;
  items: Object[];
  closeModal: () => void;
  clearCart: () => void;
}

const OrderCompleted: React.FC<Props> = ({ user, items }) => {
  return (
    <View style={styles.container}>
      <Text>rANDOM</Text>
    </View>
  );
};
export default OrderCompleted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
});
