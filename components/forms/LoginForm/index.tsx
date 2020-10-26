import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Box, Link, useTheme, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LoginFormStyle from './loginForm.style';
import Text from '../../atoms/Text';
import TextField from '../../molecule/TextField';
import Button from '../../atoms/Button';
import { LogInAsync } from '../../../store/actions/authActions';
import { loginValidationSchema } from '../../../validation/authValidator';
import { AuthState } from '../../../models/Auth';

const LoginForm = () => {
  const [obscurePass, setObscurePass] = React.useState(true);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isLoading }: AuthState = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      dispatch(LogInAsync({ params: values }));
    },
  });

  const change = (name, e) => {
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
  };

  return (
    <LoginFormStyle>
      <Box margin="2rem 0 1rem">
        <Text color={theme.palette.primary.light} variant="caption">
          Sign-in
        </Text>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Box width="100%" margin=".6rem 0 1.3rem">
            <TextField
              variant="combo"
              onChange={(e) => change('email', e)}
              label="Email"
              labelPosition="in"
              value={formik.values.email}
              params={{
                name: 'email',
                error: formik.touched.email && Boolean(formik.errors.email),
                helperText: formik.touched.email ? formik.errors.email : '',
              }}
            />
          </Box>
          <Box width="100%" margin=".6rem 0">
            <TextField
              onChange={(e) => change('password', e)}
              bgColor="#fff"
              type={obscurePass ? 'password' : 'text'}
              labelPosition="in"
              label="Password"
              endIcon={
                <IconButton onClick={() => setObscurePass(!obscurePass)}>
                  {obscurePass ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              }
              value={formik.values.password}
              params={{
                name: 'password',
                error:
                  formik.touched.password && Boolean(formik.errors.password),
                helperText: formik.touched.password
                  ? formik.errors.password
                  : '',
              }}
            />
          </Box>
          <Box textAlign="left" width="100%">
            <Link href="/forgot-password">
              <Text
                color={theme.palette.info.main}
                variant="caption"
                className="invite-text"
              >
                Forgot password?
              </Text>
            </Link>
          </Box>
          <Button
            padding=".6rem"
            margin="2.5rem 0 1.5rem"
            isLoading={isLoading}
            params={{ type: 'submit', disabled: !formik.isValid }}
            width="100%"
            fontWeight="300"
          >
            Log in
          </Button>
          <Text
            fontSize=".9rem"
            color="rgba(0,0,0,.3)"
            variant="subtitle1"
            className="invite-text"
          >
            Not a member yet?{' '}
            <Link href="/signup">
              <Text color={theme.palette.primary.light} variant="caption">
                Sign Up
              </Text>
            </Link>
          </Text>
        </Box>
      </form>
    </LoginFormStyle>
  );
};

export default LoginForm;
