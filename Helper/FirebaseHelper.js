import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDVgELSaiPsUxlY8hPa5SZXEzDt8t1gAg",
  authDomain: "abetech-app.firebaseapp.com",
  databaseURL: "https://abetech-app.firebaseio.com",
  projectId: "abetech-app",
  storageBucket: "abetech-app.appspot.com",
  messagingSenderId: "sender-id",
  appId: "1:250630133346:android:c6b2635edf26d77626633b",
  measurementId: "G-measurement-id",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const _getAppSetting = async () => {
  try {
    const color = await firebase
      .firestore()
      .collection("setting")
      .doc("color")
      .get();
    const logo = await firebase
      .firestore()
      .collection("setting")
      .doc("logo")
      .get();
    let setting = {
      color: color.data(),
      logo: logo.data(),
    };
    return setting;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const _getAllMsgs = async (contact_id) => {
  try {
    const msg_list_ref = await firebase
      .firestore()
      .collection("chatting/" + contact_id + "/msg_list")
      .orderBy("date_time", "asc")
      .get();
    let msg_list = [];
    msg_list_ref.forEach(function(doc) {
      msg_list.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return msg_list;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const setStripeConf = async () => {
  try {
    const paymentInfoRef = await firebase
      .firestore()
      .collection("setting")
      .doc("payment")
      .get();
    let payment_enabled = paymentInfoRef.data().enabled;

    const stripeInfoRef = await firebase
      .firestore()
      .collection("setting")
      .doc("stripe")
      .get();
    let stripe_pub_key = stripeInfoRef.data().pub_key;
    return { payment_enabled, stripe_pub_key };
  } catch (err) {
    alert(err);
  }
};

export { _getAppSetting, _getAllMsgs, setStripeConf };
