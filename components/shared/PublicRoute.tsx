import React from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import { FeatureType } from '../../utils/enums';
import { RouteGuards } from '../../models/Helpers';
import { AuthState } from '../../models/Auth';
import { GetUserProfileAsync } from '../../store/actions/profileActions';
import { RequestOTPAsync } from '../../store/actions/otpActions';
import Loader from '../molecule/Loader';

const PublicRoute = (props: RouteGuards) => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const {
    isAuthenticated,
    isEmailVerified,
    isEmailVerifySent,
    user,
    profile,
  }: AuthState = useSelector((state) => state.auth);
  const { Component, pageProps } = props;

  const Authenticate = (compProps) => {
    if (!isAuthenticated) {
      return <Component {...compProps} />;
    }
    if (isAuthenticated && !profile) {
      dispatch(GetUserProfileAsync());
    }
  };

  React.useEffect(() => {
    if (profile) {
      if (isEmailVerified) Router.push('/dashboard');
      if (!isEmailVerified && !isEmailVerifySent) {
        if (Router.asPath !== '/signup') {
          dispatch(
            RequestOTPAsync({
              params: {
                email: user?.email,
                feature: FeatureType.VERIFY_EMAIL,
              },
            })
          );
        }
        Router.push('/signup/enter-otp');
      }
    }
  }, [profile]);

  return (
    <>
      {Authenticate(pageProps) || (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          height="80vh"
        >
          <Loader />
        </Box>
      )}
    </>
  );
};

export default PublicRoute;
