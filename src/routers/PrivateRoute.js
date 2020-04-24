import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import HeaderDefault from "../components/Header";
import Footer from "../components/Footer";

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
        <div className="wrapper">
          <HeaderDefault />
          <Component {...props} />
          <Footer />
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
