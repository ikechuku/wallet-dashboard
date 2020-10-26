import React from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { RouteGuards } from '../../models/Helpers';

const PrivateRoute = (props: RouteGuards) => {
  const { Component, pageProps = {} } = props;

  const { isAuthenticated, isEmailVerified } = useSelector(
    (state) => state.auth
  );

  const Authenticate = (compProps) => {
    if (true) {
      return <Component {...compProps} />;
    }
    if (isAuthenticated && !isEmailVerified) {
      Router.push('/signup/enter-otp');
    } else Router.push('/login');
  };

  return <>{Authenticate(pageProps) || <div />}</>;
};


export default PrivateRoute;
