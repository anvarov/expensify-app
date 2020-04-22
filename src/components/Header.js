import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { startLogout } from "../actions/auth";

export const Header = ({ dispatchStartLogout }) => (
  <div>
    <h1>Expensify</h1>
    <NavLink activeClassName="is-active" to="/dashboard" exact>
      Dashboard
    </NavLink>
    <NavLink activeClassName="is-active" to="/create">
      Add Expense
    </NavLink>
    <button type="button" onClick={dispatchStartLogout}>
      Log out
    </button>
  </div>
);

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchStartLogout: () => dispatch(startLogout()),
  };
};
export default connect(undefined, mapDispatchToProps)(Header);
