import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    /* eslint-disable react/jsx-curly-newline, react/jsx-props-no-spreading */
    {...rest}
    component={(props) =>
      isAuthenticated ? (
        <div>
          <Redirect to="/dashboard" />
        </div>
      ) : (
        <div>
          <Component {...props} />
        </div>
      )
    }
    /* eslint-enable react/jsx-props-no-spreading, react/jsx-curly-newline */
  />
);

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.auth.uid,
  };
};

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps)(PublicRoute);
