import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Modal from "react-native-modal";

const CustomModal = (props) => {
  const onModalResult = (res) => {
    // props.setIsModalVisible(false);
    props.onModalResult(res);
  };

  return (
    <Modal
      isVisible={props.isModalVisible}
      onBackdropPress={() => props.setIsModalVisible(false)}
    >
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <Text style={{ alignSelf: "center", fontSize: 20 }}>{props.title}</Text>
        {props.buttons.map((btn_name, index) => {
          return (
            <Button
              title={btn_name}
              type="solid"
              buttonStyle={styles.button}
              key={index}
              onPress={() => onModalResult(index)}
            />
          );
        })}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 6,
  },
});

export default CustomModal;
