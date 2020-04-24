import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { startLogout } from "../actions/auth";

export const Header = ({ dispatchStartLogout }) => (
  <div className="header wrapper--header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Expensify</h1>
        </Link>
        <button
          type="button"
          onClick={dispatchStartLogout}
          className="button button--link"
        >
          Log out
        </button>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  dispatchStartLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchStartLogout: () => dispatch(startLogout()),
  };
};
export default connect(undefined, mapDispatchToProps)(Header);
