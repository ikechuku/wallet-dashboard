/* eslint-disable prefer-destructuring */
import * as React from 'react';
import * as Yup from 'yup';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Link, useTheme } from '@material-ui/core';
import { Text, Button } from '../../atoms';
import AuthErrors from '../../shared/AuthErrors';
import ResetPassForm from '../../forms/ForgotPassForm/ResetPassForm';
import { ResetPassState } from '../../../models/PasswordReset';
import {
  PassResetActions,
  ForgotPasswordAsync,
} from '../../../store/actions/passResetActions';
import { decryptionKey } from '../../../utils';
import { SimpleNav } from '../../molecule';

const SetPassword = () => {
  const dispatch = useDispatch();
  const {
    message,
    errors,
    isPasswordReset,
    resetToken: verified,
  }: ResetPassState = useSelector((state) => state.resetPass);

  let user;
  let userString;

  try {
    const params = Router.asPath.split('user=');
    // eslint-disable-next-line prefer-destructuring
    userString = params[1];
    user = JSON.parse(decryptionKey(userString));
  } catch {
    Router.replace(`/forgot-password`);
  }

  React.useEffect(() => {
    dispatch(PassResetActions({ resetToken: user.resetToken }));
  }, []);

  const theme = useTheme();
  return (
    <>
      <AuthErrors
        AuthActions={() => dispatch(PassResetActions())}
        message={message}
        errors={errors}
        condition={
          message === 'Reset Link sent successfully to Your Email' ||
          isPasswordReset
        }
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
            <Box width="100%" margin="2rem auto 1rem">
              <Text
                textAlign="center"
                margin="0 auto .2rem"
                variant="h4"
                color={theme.palette.primary.light}
                fontWeight="400"
                width="100%"
              >
                {verified
                  ? 'Set your new password'
                  : 'Reset Password Token is Invalid or has Expired'}
              </Text>
            </Box>
            {!verified ? (
              <Text
                color="rgba(0, 0, 0, .5)"
                variant="caption"
                className="invite-text"
                margin="0 auto"
              >
                If you want to receive a new link{' '}
                <Text color={theme.palette.info.light} variant="caption">
                  <Box display="inline-block" marginLeft="-8px">
                    <Button
                      padding="0"
                      fontSize=".8rem"
                      color={theme.palette.info.main}
                      colorTheme="transparent"
                      onClick={() => {
                        Yup.object()
                          .shape({
                            email: Yup.string().email(),
                          })
                          .isValid({ email: user.email })
                          .then((valid) => {
                            if (valid) {
                              dispatch(
                                ForgotPasswordAsync({
                                  params: { email: user.email },
                                })
                              );
                              Router.replace(
                                `/forgot-password/enter-token?user=${userString}`
                              );
                            } else Router.replace('/forgot-password');
                          });
                      }}
                    >
                      Resend
                    </Button>
                  </Box>
                </Text>
              </Text>
            ) : (
              <>
                <ResetPassForm user={user} />
                <Text
                  color="rgba(0, 0, 0, .5)"
                  variant="body1"
                  fontSize=".8rem"
                  className="invite-text"
                  textAlign="center"
                >
                  If you remembered your old password login here{' '}
                  <Text color={theme.palette.info.light} variant="caption">
                    <Link color="inherit" href="/login">
                      login here
                    </Link>
                  </Text>
                </Text>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SetPassword;
