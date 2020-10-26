import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, useTheme } from '@material-ui/core';
import Router from 'next/router';
import Style from './createPin.style';
import Text from '../../atoms/Text';
import OTPInput from '../../molecule/OtpInput';
import { Button } from '../../atoms';
import { SimpleNav } from '../../molecule';
import AuthErrors from '../../shared/AuthErrors';
import { CreatePinAsync } from '../../../store/actions/tranxPinAction';
import { AuthActions } from '../../../store/actions/authActions';

const CreatePin = () => {
  const theme = useTheme();
  const { message, errors } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [pin, setPin] = React.useState<string>('');
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const submitOTP = () => {
    if (pin.length === 4) {
      setSubmitting(true);
      dispatch(
        CreatePinAsync({
          params: { pin: Number(pin) },
          cb: (pass) => {
            if (pass) {
              Router.replace(`/dashboard`);
            } else setPin('');
            setSubmitting(false);
          },
        })
      );
    }
  };

  return (
    <>
      <AuthErrors
        AuthActions={() => dispatch(AuthActions())}
        message={message}
        errors={errors}
        condition={false}
      />
      <Style>
        <SimpleNav
          pop={() => {
            Router.replace('/dashboard');
          }}
        />
        <Box
          display="flex"
          height="90%"
          justifyContent="center"
          alignItems="center"
        >
          <Box width="100%" className="email-hd">
            <Box
              flexDirection="column"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text
                margin="0 auto .5rem"
                textAlign="center"
                variant="h2"
                color={theme.palette.primary.light}
                fontWeight="400"
                width="100%"
              >
                Create Pin
              </Text>
            </Box>
            <Box
              margin=".5rem auto 1.5rem"
              className="msg"
              display="flex"
              justifyContent="center"
            >
              <Text
                width="100%"
                color="#bbb"
                textAlign="center"
                variant="body2"
              >
                Use this pin to securely make your transactions
              </Text>
            </Box>
            <Box display="flex" marginY="1rem" justifyContent="center">
              <OTPInput
                length={4}
                isNumberInput
                autoFocus
                values={pin}
                onChangeOTP={(val) => {
                  setPin(val);
                }}
              />
            </Box>
            <Box>
              <Button
                padding=".6rem"
                margin="1.5rem 0 0"
                width="100%"
                onClick={submitOTP}
                isLoading={submitting}
                params={{ type: 'submit', disabled: pin.length < 4 }}
                fontWeight="300"
                bgColor={
                  pin.length < 4 ? '#eff2f7' : theme.palette.primary.light
                }
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Box>
      </Style>
    </>
  );
};

export default CreatePin;
