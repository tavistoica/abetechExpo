import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import SignIn from "../../Auth/SignIn";
import EditProfile from "./components/EditProfile";

const Profile = (props) => {
  return props.auth.id ? <EditProfile {...props} /> : <SignIn {...props} />;
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
)(Profile);
