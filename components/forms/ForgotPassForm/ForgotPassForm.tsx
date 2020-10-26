import * as React from 'react';
import { Grid, Box, useTheme } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Router from 'next/router';
import LoginFormStyle from './form.style';
import TextField from '../../molecule/TextField';
import Button from '../../atoms/Button';
import { ResetPassState } from '../../../models/PasswordReset';
import { forgotPassValidationSchema } from '../../../validation/authValidator';
import { encryptKey } from '../../../utils';
import { ForgotPasswordAsync } from '../../../store/actions/passResetActions';

const ForgotPassForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isLoading }: ResetPassState = useSelector((state) => state.resetPass);
  const { touched, values, errors, ...formik } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPassValidationSchema,
    onSubmit: (vals) => {
      const url = encryptKey(JSON.stringify(vals));
      dispatch(
        ForgotPasswordAsync({
          cb: (pass) => {
            if (pass) {
              Router.replace(`/forgot-password/enter-token?user=${url}`);
            }
          },
          params: vals,
        })
      );
    },
  });

  const change = (name, e) => {
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
  };

  return (
    <>
      <LoginFormStyle>
        <Grid container justify="center" alignItems="flex-start">
          <form onSubmit={formik.handleSubmit}>
            <Box width="100%" margin=".6rem 0">
              <TextField
                onChange={(e) => change('email', e)}
                label="Email"
                labelPosition="in"
                value={values.email}
                params={{
                  name: 'email',
                  error: touched.email && Boolean(errors.email),
                  helperText: touched.email ? errors.email : '',
                }}
              />
            </Box>
            <Button
              padding=".6rem"
              margin="1.5rem 0 1.5rem"
              width="100%"
              isLoading={isLoading}
              params={{ type: 'submit', disabled: !formik.isValid }}
              fontWeight="300"
              bgColor={theme.palette.primary.light}
            >
              Send
            </Button>
          </form>
        </Grid>
      </LoginFormStyle>
    </>
  );
};

export default ForgotPassForm;
