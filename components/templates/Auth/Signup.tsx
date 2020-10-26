import * as React from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Box, useTheme } from '@material-ui/core';
import Text from '../../atoms/Text';
import SignUpForm from '../../forms/SignupForm';
import AuthErrors from '../../shared/AuthErrors';
import { AuthState } from '../../../models/Auth';
import { AuthActions } from '../../../store/actions/authActions';
import { SimpleNav } from '../../molecule';

const SignFormPage = () => {
  const dispatch = useDispatch();
  const { message, errors, isAuthenticated }: AuthState = useSelector(
    (state) => state.auth
  );

  React.useEffect(() => {
    Router.prefetch('/signup/otp-email');
    Router.prefetch('/signup/enter-otp');
    Router.prefetch('/signup/success');
    Router.prefetch('/dashboard');
  }, []);

  const theme = useTheme();
  return (
    <>
      <AuthErrors
        AuthActions={() => dispatch(AuthActions())}
        message={message}
        errors={errors}
        condition={isAuthenticated}
      />
      <>
        <Box display="flex" flexDirection="column" className="form-hd">
          <SimpleNav
            show={['lg', 'md', 'xl']}
            pop={() => {
              Router.back();
            }}
          />
          <Box className="form-con auth">
            <Box>
              <Text
                margin="1rem auto .7rem"
                textAlign="center"
                variant="h4"
                color={theme.palette.primary.light}
                fontWeight="400"
                width="80%"
              >
                What account would you like to create?
              </Text>
              <Box
                margin=".5rem auto"
                justifyContent="center"
                display="flex"
                alignItems="center"
              >
                <Text
                  css="opacity: .3"
                  color={theme.palette.primary.contrastText}
                  textAlign="center"
                  variant="subtitle1"
                >
                  Already A Member?
                </Text>
                &nbsp;
                <Link href="/login">Login</Link>
              </Box>
              <SignUpForm />
              <Text
                padding="1.2rem 1rem"
                color="rgba(0,0,0,.3)"
                textAlign="center"
                margin="0 auto"
                variant="body1"
                fontSize=".8rem"
              >
                By continuing you accept our{' '}
                <Link target="blank" href="http://www.google.com">
                  <Text variant="caption" color={theme.palette.primary.light}>
                    Terms of Use
                  </Text>
                </Link>{' '}
                and{' '}
                <Link target="blank" href="http://www.google.com">
                  <Text variant="caption" color={theme.palette.primary.light}>
                    Privacy Policy
                  </Text>
                </Link>
              </Text>
            </Box>
          </Box>
        </Box>
      </>
    </>
  );
};

export default SignFormPage;
