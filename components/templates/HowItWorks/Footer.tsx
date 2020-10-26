import React from 'react';
import { Box, useTheme, Container, Hidden } from '@material-ui/core';
import { useRouter } from 'next/router';
import { Text, Button, Image } from '../../atoms';
import { FooterStyle } from './howItWorks.style';
import Assets from '../../../utils/assets';

const HowItWorksFooter = () => {
  const { SIGNUP_FREE_TRANSFER } = Assets;
  const theme = useTheme();
  const Router = useRouter();
  return (
    <Container>
      <FooterStyle justifyContent="center" display="flex">
        <Box
          justifyContent="space-between"
          alignItems="center"
          display="flex"
          className="cont"
        >
          <Box className="content">
            <Text fontWeight="300" color="#fff" variant="h4">
              Signup Today &amp; get your first 3 Transfers FREE!
            </Text>
            <Button
              width="100%"
              onClick={() => {
                Router.push('/signup');
              }}
              bgColor={theme.palette.secondary.main}
            >
              Sign Up
            </Button>
          </Box>
          <Hidden smDown>
            <Box
              width="400px"
              height="100%"
              className="banner-img"
              display="flex"
              alignItems="center"
            >
              <Image
                width="100%"
                height="100%"
                src={require(`../../../public${SIGNUP_FREE_TRANSFER}`)}
                alt="3 free transfer"
              />
            </Box>
          </Hidden>
        </Box>
      </FooterStyle>
    </Container>
  );
};

export default HowItWorksFooter;
