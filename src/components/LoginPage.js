import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ dispatchStartLogin }) => (
  <div>
    <button onClick={dispatchStartLogin} type="button">
      Login
    </button>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  dispatchStartLogin: () => dispatch(startLogin()),
});

LoginPage.propTypes = {
  dispatchStartLogin: PropTypes.func.isRequired,
};
export default connect(undefined, mapDispatchToProps)(LoginPage);
