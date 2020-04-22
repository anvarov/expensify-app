import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import HeaderDefault from "../components/Header";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  /* eslint-disable no-unused-expressions, react/jsx-props-no-spreading, react/jsx-curly-newline */
  <Route
    {...rest}
    component={(props) =>
      isAuthenticated ? (
        <div>
          <HeaderDefault />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
  /* eslint-enable no-unused-expressions, react/jsx-props-no-spreading, react/jsx-curly-newline */
);
const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.auth.uid,
  };
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default connect(mapStateToProps)(PrivateRoute);
