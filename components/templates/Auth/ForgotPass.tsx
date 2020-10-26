import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { Box, useTheme } from '@material-ui/core';
import { Text } from '../../atoms';
import AuthErrors from '../../shared/AuthErrors';
import ForgotPassForm from '../../forms/ForgotPassForm/ForgotPassForm';
import { PassResetActions } from '../../../store/actions/passResetActions';
import { ResetPassState } from '../../../models/PasswordReset';
import { SimpleNav } from '../../molecule';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { message, errors, isResetLinkSent }: ResetPassState = useSelector(
    (state) => state.resetPass
  );

  const theme = useTheme();
  return (
    <>
      <AuthErrors
        AuthActions={() => dispatch(PassResetActions())}
        message={message}
        errors={errors}
        condition={isResetLinkSent}
      />
      <Box
        display="flex"
        flexDirection="column"
        className="form-hd"
        style={{ height: '90%' }}
      >
        <SimpleNav
          show={['lg', 'md', 'xl']}
          pop={() => {
            Router.back();
          }}
        />
        <Box className="form-con">
          <Box>
            <Box margin="2rem auto 2rem">
              <Text
                textAlign="center"
                margin="0 auto .2rem"
                variant="h4"
                color={theme.palette.primary.light}
                fontWeight="400"
                width="80%"
              >
                Forgot Password?
              </Text>
              <Text
                margin="0 auto"
                css="opacity: .3"
                color={theme.palette.primary.contrastText}
                textAlign="center"
                width="80%"
                variant="body2"
              >
                Don&apos;t worry, just enter the email address you registered
                with and we will send you a link to reset your password
              </Text>
            </Box>
            <ForgotPassForm />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForgotPassword;
