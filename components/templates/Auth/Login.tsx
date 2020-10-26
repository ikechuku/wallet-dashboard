import * as React from 'react';
import Router from 'next/router';
import { Box, Link, useTheme } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Text from '../../atoms/Text';
import LoginForm from '../../forms/LoginForm';
import AuthErrors from '../../shared/AuthErrors';
import { AuthActions } from '../../../store/actions/authActions';
import { AuthState } from '../../../models/Auth';
import { SimpleNav } from '../../molecule';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const { message, errors, isAuthenticated }: AuthState = useSelector(
    (state) => state.auth
  );

  const theme = useTheme();

  React.useEffect(() => {
    Router.prefetch('/forgot-password');
  }, []);

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
              Router.replace('/');
            }}
          />
          <Box className="form-con auth">
            <Box>
              <Box margin="2rem auto 3rem">
                <Text
                  textAlign="center"
                  margin="0 auto .2rem"
                  variant="h4"
                  color={theme.palette.primary.light}
                  fontWeight="400"
                  width="80%"
                >
                  Welcome back!
                </Text>
                <Text
                  margin="0 auto"
                  css="opacity: .6;"
                  color={theme.palette.primary.contrastText}
                  textAlign="center"
                  variant="body2"
                >
                  Dolor sit amet consectetur adipisicing elit.
                </Text>
              </Box>
              <LoginForm />
              <Text
                padding="1.2rem 1rem"
                color="rgba(0,0,0,.3)"
                textAlign="center"
                margin="0 auto"
                variant="body1"
                fontSize=".8rem"
              >
                By continuing you accept our{' '}
                <Link target="blank" href="https://www.google.com">
                  <Text variant="caption" color={theme.palette.primary.light}>
                    Terms of Use
                  </Text>
                </Link>{' '}
                and{' '}
                <Link target="blank" href="https://www.google.com">
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

export default LoginFormPage;
