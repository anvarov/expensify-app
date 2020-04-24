import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ dispatchStartLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p>It is time to get control of your expenses</p>
      <button className="button" onClick={dispatchStartLogin} type="button">
        Login with Google
      </button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  dispatchStartLogin: () => dispatch(startLogin()),
});

LoginPage.propTypes = {
  dispatchStartLogin: PropTypes.func.isRequired,
};
export default connect(undefined, mapDispatchToProps)(LoginPage);
