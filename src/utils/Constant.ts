const api_base_url =
  "https://us-central1-abetech-app.cloudfunctions.net/AppApi/";
const Msg_Login_Success = "Login succeed!";
const Msg_Login_Failed = "Login failed!";
const Msg_Register_Success = "Signup succeed!";
const Msg_Register_Failed = "Signup failed!";
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

export {
  firebaseConfig,
  api_base_url,
  Msg_Login_Success,
  Msg_Login_Failed,
  Msg_Register_Success,
  Msg_Register_Failed,
};
