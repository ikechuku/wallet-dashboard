import * as React from 'react';
import { Lock, Visibility, VisibilityOff } from '@material-ui/icons';
import { Grid, Box, IconButton, useTheme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import SignupFormStyle, { RadioStyle } from './signupForm.style';
import Text from '../../atoms/Text';
import TextField from '../../molecule/TextField';
import CustomSwitch from '../../atoms/Switch';
import Button from '../../atoms/Button';
import CountriesDropDown from '../../shared/CountriesDropDown';
import PasswordMeter from '../../molecule/PasswordMeter';
import { AuthState } from '../../../models/Auth';
import { signUpValidationSchema } from '../../../validation/authValidator';
import { SignUpAsync } from '../../../store/actions/authActions';

const SignForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [passError, setPassError] = React.useState('');
  const { isLoading }: AuthState = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      userProfileId: 'personal',
      country: 162,
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      if (!passError || passError === 'Password is strong') {
        dispatch(SignUpAsync({ params: values }));
      }
    },
  });

  const change = (name, e) => {
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
  };
  const [obscurePass, setObscurePass] = React.useState(true);
  return (
    <>
      <SignupFormStyle>
        <form onSubmit={formik.handleSubmit}>
          <Grid container justify="center" alignItems="flex-start">
            <Grid container className="radio-group">
              <RadioBtn
                setChecked={(e) => change('userProfileId', e)}
                title="Personal"
                selected={formik.values.userProfileId === 'personal'}
              />
              <RadioBtn
                active={false}
                setChecked={(e) => change('userProfileId', e)}
                title="Business"
                selected={formik.values.userProfileId === 'business'}
              />
            </Grid>
            <Box width="100%" margin="1.3rem 0 1rem">
              <TextField
                color={theme.palette.info.main}
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
            <Box width="100%" margin=".7rem 0 1.5rem">
              <TextField
                label="Password"
                bgColor="#fff"
                margin="0 0 .5rem"
                labelPosition="in"
                type={obscurePass ? 'password' : 'text'}
                onChange={(e) => change('password', e)}
                value={formik.values.password}
                endIcon={
                  <IconButton onClick={() => setObscurePass(!obscurePass)}>
                    {obscurePass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                }
                params={{
                  name: 'password',
                  error:
                    formik.touched.password && Boolean(formik.errors.password),
                }}
                startIcon={<Lock />}
              />
              <PasswordMeter
                password={formik.values.password}
                onChange={(val) => setPassError(val)}
              />
              <Box>
                <Text
                  color={passError === 'Password is strong' ? 'green' : 'red'}
                  variant="caption"
                >
                  {formik.touched.password
                    ? passError || formik.errors.password
                    : ''}
                </Text>
              </Box>
            </Box>
            <Box width="100%" marginBottom=".4rem">
              <CountriesDropDown
                id="signup-country"
                country={formik.values.country}
                property="id"
                setCountry={(e) => change('country', e)}
                params={{
                  name: 'country',
                }}
              />
              <Box marginTop=".3rem">
                <Text color="red" variant="caption">
                  {formik.touched.country ? formik.errors.country : ''}
                </Text>
              </Box>
            </Box>
            <Grid
              css="opacity: .5; pointer-events: none;"
              container
              alignItems="center"
              justify="space-between"
            >
              <Text
                color="rgba(0,0,0,.3)"
                variant="subtitle1"
                className="invite-text"
              >
                I have an Invite code
              </Text>
              <CustomSwitch bgColor={theme.palette.secondary.light} />
            </Grid>
            <Button
              padding=".6rem"
              margin=".2em 0"
              isLoading={isLoading}
              params={{
                type: 'submit',
              }}
              width="100%"
              fontWeight="300"
            >
              Signup
            </Button>
          </Grid>
        </form>
      </SignupFormStyle>
    </>
  );
};

const RadioBtn = ({ active = true, setChecked, title, selected }) => {
  const theme = useTheme();
  return (
    <RadioStyle
      css={`
        opacity: ${active ? 1 : 0.5};
      `}
      className="radio-btn"
    >
      <label className="radio-label" htmlFor={title}>
        <Box
          justifyContent="flex-start"
          alignItems="center"
          display="flex"
          width="100%"
          padding="0.6rem"
        >
          <div className="radio">
            <Box
              bgcolor={selected ? theme.palette.secondary.main : null}
              className="check"
            />
          </div>
          <Text
            fontWeight="500"
            fontSize=".9rem"
            className="title"
            variant="subtitle1"
          >
            {title}
          </Text>
        </Box>
      </label>
      <input
        onChange={active ? setChecked : null}
        hidden
        value={String(title).toLowerCase()}
        id={title}
        name="userProfileId"
        type="radio"
      />
    </RadioStyle>
  );
};

export default SignForm;
