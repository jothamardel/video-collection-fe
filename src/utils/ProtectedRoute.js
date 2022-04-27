import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';


const RouteAuthenticated = ({ user: { user }, component: Component, path }) => {
  
  // if (!user.fullname) {
  //   return <Redirect to="/login" />;
  // }

  return <Route component={Component} path={path} />;
};

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(RouteAuthenticated);