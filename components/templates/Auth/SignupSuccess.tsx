import * as React from 'react';
import Router from 'next/router';
import { Box, useTheme } from '@material-ui/core';
import { SignupSuccessStyle } from './styles';
import Text from '../../atoms/Text';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import Assets from '../../../utils/assets';
import SimpleNav from '../../molecule/Nav';

const SignUpSuccess = () => {
  const { HURRAY_EMAIL_VERIFIED } = Assets;
  const theme = useTheme();
  return (
    <SignupSuccessStyle>
      <SimpleNav
        pop={() => {
          Router.replace('/dashboard');
        }}
      />
      <Box
        width="100%"
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        height="100%"
      >
        <Box
          justifyContent="center"
          display="flex"
          flexDirection="column"
          alignItems="center"
          className="email-hd"
        >
          <Box>
            <Image
              src={require(`../../../public${HURRAY_EMAIL_VERIFIED}`)}
              alt="image of new mail"
            />
          </Box>
          <Box
            width="100%"
            margin="2.5rem auto 1rem"
            display="flex"
            justifyContent="center"
          >
            <Text
              textAlign="center"
              variant="h2"
              color={theme.palette.primary.light}
              fontWeight="400"
              width="80%"
            >
              Hurray, Email Verified!
            </Text>
          </Box>
          <Box margin="0 auto 2.5rem" justifyContent="center" width="100%">
            <Text color="rgba(0,0,0,.3)" textAlign="center" variant="body2">
              Congratulations you are all signed up with us!
            </Text>
          </Box>
          <Box display="flex" justifyContent="center" width="100%">
            <Button
              className="btn"
              onClick={() => {
                Router.replace('/dashboard');
              }}
              bgColor={theme.palette.primary.light}
              fontWeight="300"
            >
              Finish
            </Button>
          </Box>
        </Box>
      </Box>
    </SignupSuccessStyle>
  );
};

export default SignUpSuccess;
