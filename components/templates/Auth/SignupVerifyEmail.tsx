import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, useTheme } from '@material-ui/core';
import Router from 'next/router';
import { Replay } from '@material-ui/icons';
import { VerifyEmailStyle } from './styles';
import Text from '../../atoms/Text';
import OTPInput from '../../molecule/OtpInput';
import AuthErrors from '../../shared/AuthErrors';
import { Button, Image } from '../../atoms';
import { SimpleNav } from '../../molecule';
import { FeatureType } from '../../../utils/enums';
import Assets from '../../../utils/assets';
import {
  RequestOTPAsync,
  ValidateTokenAsync,
} from '../../../store/actions/otpActions';
import { AuthActions, SignOutAsync } from '../../../store/actions/authActions';
import Spinner from '../../atoms/Spinner';

const OtpConfirm = () => {
  const { NEW_MAIL } = Assets;
  const dispatch = useDispatch();
  const {
    message,
    errors,
    isEmailVerified,
    user,
    isEmailVerifySent,
  } = useSelector((state) => state.auth);

  const [otp, setOtp] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [resending, isResending] = React.useState<boolean>(false);
  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (user?.email) setEmail(user?.email);
  }, [user?.email]);

  if (isEmailVerified) Router.replace(`/signup/success`);

  const theme = useTheme();
  const resendOtp = () => {
    isResending(true);
    dispatch(
      RequestOTPAsync({
        params: { email: user?.email, feature: FeatureType.VERIFY_EMAIL },
        cb: () => isResending(false),
      })
    );
  };

  const submitOTP = () => {
    if (otp.length === 4) {
      setSubmitting(true);
      dispatch(
        ValidateTokenAsync({
          params: {
            email: user.email,
            otpCode: Number(otp),
            feature: FeatureType.VERIFY_EMAIL,
          },
          cb: (pass) => {
            if (!pass) setOtp('');
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
        condition={isEmailVerified || isEmailVerifySent}
      />
      <VerifyEmailStyle>
        <SimpleNav
          pop={() => {
            dispatch(SignOutAsync());
            Router.replace('/login');
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
              <Image
                src={require(`../../../public${NEW_MAIL}`)}
                alt="image of new mail"
              />
              <Text
                margin="0 auto .5rem"
                textAlign="center"
                variant="h2"
                color={theme.palette.primary.light}
                fontWeight="400"
                width="100%"
              >
                We have just emailed you!
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
                We just sent a unique OTP code to{' '}
                <Text
                  fontSize=".8rem"
                  fontWeight="400"
                  variant="caption"
                  color={theme.palette.secondary.main}
                >
                  {email}
                </Text>{' '}
                please enter that code below to verify your email and continue
              </Text>
            </Box>
            <Box display="flex" justifyContent="center">
              <OTPInput
                length={4}
                isNumberInput
                autoFocus
                values={otp}
                onChangeOTP={(val) => {
                  setOtp(val);
                }}
              />
            </Box>
            <Box>
              <Button
                padding=".6rem"
                margin="1.5rem 0 0"
                width="100%"
                isLoading={isSubmitting}
                onClick={submitOTP}
                params={{ type: 'submit', disabled: otp.length < 4 }}
                fontWeight="300"
                bgColor={
                  otp.length < 4 ? '#eff2f7' : theme.palette.primary.light
                }
              >
                Confirm
              </Button>
            </Box>
            <Box
              height="50px"
              alignItems="center"
              color="#bbb"
              display="flex"
              justifyContent="center"
            >
              {resending ? (
                <Spinner color="inherit" />
              ) : (
                <Button colorTheme="transparent" onClick={resendOtp}>
                  <Box color={theme.palette.secondary.main}>
                    <Replay
                      css="vertical-align: middle; transform: rotate(-45deg);"
                      color="inherit"
                      fontSize="small"
                    />
                    <Text
                      color={theme.palette.secondary.main}
                      variant="caption"
                    >
                      Resend OTP
                    </Text>
                  </Box>
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </VerifyEmailStyle>
    </>
  );
};

export default OtpConfirm;
