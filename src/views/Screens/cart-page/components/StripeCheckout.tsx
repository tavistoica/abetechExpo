
import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, CardFieldInput, useConfirmPayment, useStripe } from "@stripe/stripe-react-native";
import { doPost } from "../../../../utils/HttpHelper";
import RBSheet from "react-native-raw-bottom-sheet";
//  @ts-ignore
import { height } from "react-native-dimension";

interface Props {
  user: any;
  items: Object[];
  navigation: any;
  closeModal: () => void;
  clearCart: () => void;
}

const StipeCheckout: React.FC<Props> = ({user, items, closeModal, clearCart, navigation}) => {
  const stripe = useStripe();
  const [cardDetails, setCardDetails] = useState<CardFieldInput.Details>();
  const { loading } = useConfirmPayment();
  let orderCompletedModalRef = useRef(null);

  const openOrderCompletedModal = () => {
    //  @ts-ignore
    orderCompletedModalRef.open();
  };

  const closeOrderCompletedModal = () => {
    //  @ts-ignore
    orderCompletedModalRef.close();
    navigation.navigate("product_list");
  };

  const fetchPaymentIntentClientSecret = async (user: any, items: any) => {
    const result = await stripe.createToken({ type:'Card'});
    const response = await doPost('stripe/checkout', {user, items, tokenId: result.token?.id})
    const { error } = response.data;
    return { error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !user.email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    //2.Fetch the intent client secret from the backend
    try {
      const { error } = await fetchPaymentIntentClientSecret(user, items);
      //2. confirm the payment
      if (error) {
        alert("Unable to process payment");
      } else {
        openOrderCompletedModal()
        closeModal()
        clearCart()
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <View style={styles.container}>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
      <RBSheet
        ref={(ref) => {
          //  @ts-ignore
          orderCompletedModalRef = ref;
        }}
        height={height(50)}
        closeOnDragDown={true}
      >
      </RBSheet>
    </View>
  );
};
export default StipeCheckout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});