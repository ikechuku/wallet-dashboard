import * as React from 'react';
import { Box, IconButton, useTheme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Router from 'next/router';
import { VisibilityOff, Visibility, Done } from '@material-ui/icons';
import LoginFormStyle from './form.style';
import TextField from '../../molecule/TextField';
import Button from '../../atoms/Button';
import { Text } from '../../atoms';
import PasswordMeter from '../../molecule/PasswordMeter';
import { ResetPassState } from '../../../models/PasswordReset';
import { resetPassValidationSchema } from '../../../validation/authValidator';
import { ResetPasswordAsync } from '../../../store/actions/passResetActions';

const ResetPassForm = ({ user }) => {
  const dispatch = useDispatch();
  const [obscurePass, setObscurePass] = React.useState(true);
  const [passError, setPassError] = React.useState('');

  const { resetToken: verified, isLoading }: ResetPassState = useSelector(
    (state) => state.resetPass
  );

  const { values, errors, touched, ...formik } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: resetPassValidationSchema,
    onSubmit: (vals) => {
      if (!passError || passError === 'Password is strong') {
        dispatch(
          ResetPasswordAsync({
            params: { resetToken: verified, email: user.email, ...vals },
            cb: (pass) => {
              if (pass) {
                Router.replace('/forgot-password/success');
              }
            },
          })
        );
      }
    },
  });

  const theme = useTheme();
  const change = (name, e) => {
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
  };

  return (
    <LoginFormStyle>
      <form onSubmit={formik.handleSubmit}>
        <Box
          justifyContent="center"
          flexDirection="column"
          display="flex"
          alignItems="flex-start"
        >
          <Box width="100%" margin="1rem 0">
            <TextField
              label="Password"
              bgColor="#fff"
              margin="0 0 .5rem"
              labelPosition="in"
              endIcon={
                passError === '' && values.password !== '' ? (
                  <Done
                    css={`
                      fill: ${theme.palette.info.main};
                    `}
                  />
                ) : null
              }
              type="password"
              onChange={(e) => change('password', e)}
              value={values.password}
              params={{
                name: 'password',
                error: touched.password && Boolean(errors.password),
              }}
            />
            <PasswordMeter
              password={values.password}
              onChange={(val) => setPassError(val)}
            />
            <Box>
              <Text
                color={passError === 'Password is strong' ? 'green' : 'red'}
                variant="caption"
              >
                {touched.password ? passError || errors.password : ''}
              </Text>
            </Box>
          </Box>
          <Box width="100%" margin="1rem 0">
            <TextField
              onChange={(e) => {
                change('confirmPassword', e);
              }}
              label="Confirm Password"
              bgColor="#fff"
              labelPosition="in"
              endIcon={
                <IconButton onClick={() => setObscurePass(!obscurePass)}>
                  {obscurePass ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              }
              type={obscurePass ? 'password' : 'text'}
              value={values.confirmPassword}
              params={{
                name: 'confirmPassword',
                error:
                  touched.confirmPassword && Boolean(errors.confirmPassword),
                helperText: touched.confirmPassword
                  ? errors.confirmPassword
                  : '',
              }}
            />
          </Box>
          {verified && (
            <Button
              padding=".6rem"
              margin="1rem 0 .8rem"
              isLoading={isLoading}
              params={{ type: 'submit', disabled: !formik.isValid }}
              width="100%"
              fontWeight="300"
            >
              Confirm
            </Button>
          )}
        </Box>
      </form>
    </LoginFormStyle>
  );
};

export default ResetPassForm;
