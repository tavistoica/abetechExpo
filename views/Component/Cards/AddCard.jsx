import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import creditCardType from "credit-card-type";
import {
  Main_color,
  Primary_color,
  Secondary_color,
  Third_color,
  Fourth_color,
} from "../../../Helper/Common";
import { width } from "react-native-dimension";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import MonthPicker from "../MonthPicker";
import YearPicker from "../YearPicker";
import PropTypes from "prop-types";

const AddCard = (props) => {
  let [cardNumber, setCardNumber] = useState(null);
  let [cardName, setCardName] = useState("");
  let [ccv, setCcv] = useState(null);
  let [month, setMonth] = useState(null);
  let [year, setYear] = useState(null);
  let [type, setType] = useState("");
  let [numberLength, setNumberLength] = useState(16);
  let [cvvLength, setCvvLenght] = useState(3);

  const handleCardNumber = (value) => {
    setCardNumber(
      value
        .replace(/\s?/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
    );
    const cardTypeObj = creditCardType(value)[0];
    setCvvLenght(cardTypeObj.code.size);
    setNumberLength(cardTypeObj.lengths[0]);
    setType(cardTypeObj ? cardTypeObj.type : "unknown");
  };

  const AddCardButton = () => {
    props.addCard(props.auth.id, {
      cardName,
      cardNumber,
      ccv,
      month,
      year,
      type,
    });
    props.closeModal();
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={[styles.formItem, { marginBottom: 15, alignItems: "center" }]}
      >
        <Text style={{ fontSize: 20 }}>Add Card</Text>
      </View>
      <View />
      <View style={styles.formItem}>
        <View style={styles.textContainer}>
          <Text>Card Number:</Text>
        </View>
        <TextInput
          onChangeText={(value) => handleCardNumber(value)}
          placeholder="Ex: 1234 1234 1234 1234"
          keyboardType={"number-pad"}
          maxLength={numberLength + 3}
          style={styles.inputTxt}
          value={cardNumber}
        />
      </View>
      <View style={styles.formItem}>
        <View style={styles.textContainer}>
          <Text>Card Name:</Text>
        </View>
        <TextInput
          onChangeText={(value) => setCardName(value)}
          placeholder="Card name"
          autoCapitalize="words"
          style={styles.inputTxt}
          value={cardName}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={[styles.formItem, { flex: 1 }]}>
          <View style={styles.textContainer}>
            <Text>Expiration Date:</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.inputIOS}>
              <MonthPicker getPickedOption={(value) => setMonth(value)} />
            </View>
            <View style={[styles.inputIOS, styles.mLeft]}>
              <YearPicker getPickedOption={(value) => setYear(value)} />
            </View>
          </View>
        </View>
        <View style={[styles.formItem, { flex: 1 }]}>
          <View style={styles.textContainer}>
            <Text>Security code:</Text>
          </View>
          <View style={{ width: "50%" }}>
            <TextInput
              onChangeText={(value) => setCcv(value)}
              placeholder="CCV"
              keyboardType={"number-pad"}
              maxLength={cvvLength}
              style={styles.inputTxt}
              value={ccv}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: Primary_color() }]}
        onPress={() => AddCardButton()}
      >
        <Text style={[styles.buttonText, { color: Secondary_color() }]}>
          Add
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    width: "100%",
  },
  inputTxt: {
    textAlignVertical: "center",
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
  },
  formItem: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "flex-start",
    // alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  button: {
    width: width(70),
    padding: 10,
    marginTop: 15,
    margin: 5,
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textContainer: {
    marginLeft: 10,
  },
  mLeft: {
    marginLeft: 5,
  },
  inputIOS: {
    textAlignVertical: "center",
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    paddingRight: 10, // to ensure the text is never behind the icon
    width: "50%",
  },
});

const mapStatetoProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(AddCard);

AddCard.propTypes = {
  closeModal: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
