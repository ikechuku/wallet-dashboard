/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Replay } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Box, useTheme } from '@material-ui/core';
import Router, { useRouter } from 'next/router';
import { Text, Button } from '../../atoms';
import { decryptionKey, encryptKey } from '../../../utils';
import OTPInput from '../../molecule/OtpInput';
import AuthErrors from '../../shared/AuthErrors';
import { ResetPassOtpStyle } from './styles';
import { FeatureType } from '../../../utils/enums';
import {
  PassResetActions,
  ForgotPasswordAsync,
} from '../../../store/actions/passResetActions';
import { ValidateTokenAsync } from '../../../store/actions/otpActions';
import { SimpleNav } from '../../molecule';
import Spinner from '../../atoms/Spinner';

const EnterOtp = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const {
    message,
    isResetLinkSent,
    resetToken: verified,
    errors,
  } = useSelector((state) => state.resetPass);

  React.useEffect(() => {
    dispatch(PassResetActions({ isResetLinkSent: false }));
  }, []);

  const { asPath } = useRouter();
  const [otp, setOtp] = React.useState<string>('');
  const [resending, isResending] = React.useState<boolean>(false);
  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);

  let user;

  try {
    const params = asPath.split('user=');
    user = JSON.parse(decryptionKey(params[1]));
  } catch {
    Router.replace('/forgot-password');
  }

  const submitOTP = () => {
    if (otp.length === 4) {
      setSubmitting(true);
      dispatch(
        ValidateTokenAsync({
          params: {
            email: user.email,
            otpCode: Number(otp),
            feature: FeatureType.PASS_RESET,
          },
          cb: (verificationToken: string) => {
            if (verificationToken) {
              const url = encryptKey(
                JSON.stringify({
                  resetToken: verificationToken,
                  ...user,
                })
              );
              Router.replace(`/forgot-password/set-password?user=${url}`);
            } else setOtp('');
            setSubmitting(false);
          },
        })
      );
    }
  };

  return (
    <>
      <AuthErrors
        AuthActions={() => dispatch(PassResetActions())}
        message={message}
        errors={errors}
        condition={verified || isResetLinkSent}
      />
      <Box display="flex" flexDirection="column" className="form-hd">
        <ResetPassOtpStyle>
          <SimpleNav
            show={['lg', 'md', 'xl']}
            pop={() => {
              Router.back();
            }}
          />
          <Box
            display="flex"
            height="90%"
            justifyContent="center"
            alignItems="center"
            className="form-con"
          >
            <Box width="100%">
              <Box width="100%" display="flex" justifyContent="center">
                <Text
                  margin="0 auto .5rem"
                  textAlign="center"
                  variant="h2"
                  color={theme.palette.primary.light}
                  fontWeight="400"
                  width="80%"
                >
                  OTP Confirmation
                </Text>
              </Box>
              <Box display="flex" justifyContent="center">
                <Text
                  margin=".5rem auto 1.5rem"
                  css="opacity: .4"
                  color={theme.palette.primary.contrastText}
                  textAlign="center"
                  variant="body2"
                >
                  Please enter the security code we just sent to your email
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
              <Box width="100%" maxWidth="400px">
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
                  <Button
                    colorTheme="transparent"
                    onClick={() => {
                      isResending(true);
                      dispatch(
                        ForgotPasswordAsync({
                          params: { email: user.email },
                          cb: () => isResending(false),
                        })
                      );
                    }}
                  >
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
        </ResetPassOtpStyle>
      </Box>
    </>
  );
};

export default EnterOtp;
