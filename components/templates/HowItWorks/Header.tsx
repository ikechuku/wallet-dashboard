import React from 'react';
import { Box, Hidden, useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import { Text, Button, Image } from '../../atoms';
import { Header } from './howItWorks.style';
import Assets from '../../../utils/assets';
import useBreakPoints from '../../../hooks/useBreakPoints';

const HowItWorks = () => {
  const { EASY_MONEY_TRANSFER } = Assets;
  const { sm } = useBreakPoints();
  const theme = useTheme();
  const Router = useRouter();
  return (
    <>
      <Header>
        <Hidden smDown>
          <Box className="greet-msg">
            <Text
              fontWeight="600"
              color={theme.palette.secondary.contrastText}
              margin="0 0 2rem"
              variant="h3"
            >
              The easiest way to make payments
            </Text>
            <Text
              margin="0 0 2rem"
              css="opacity: .7"
              color={theme.palette.secondary.contrastText}
              variant="h6"
              fontWeight="300"
              lineHeight="1.6rem"
            >
              With Syarpa, you can now send and receive money, and pay your
              bills in few, simple steps. It’s fast. It’s secure. It’s what
              works.
            </Text>

            <div className="action-btns">
              <Button
                onClick={() => {
                  Router.push('/dashboard');
                }}
                bgColor={theme.palette.secondary.main}
              >
                Sign Up
              </Button>
              <Button
                onClick={() => {
                  Router.push('/login');
                }}
                bgColor={theme.palette.primary.main}
              >
                Login
              </Button>
            </div>
          </Box>
        </Hidden>

        <Box
          className="banner-img-con"
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Hidden mdUp>
            <Box marginY="1rem">
              <Text
                textAlign="left"
                fontWeight="600"
                color={theme.palette.secondary.contrastText}
                variant="h3"
              >
                The easiest way to make payments
              </Text>
            </Box>

            <Box margin="1rem 0">
              <Text
                textAlign={sm ? 'center' : 'left'}
                color="#ccc"
                variant="body1"
                fontWeight="300"
              >
                With Syarpa, you can now send and receive money, and pay your
                bills in few, simple steps. It’s fast. It’s secure. It’s what
                works.
              </Text>
            </Box>
          </Hidden>
          <Hidden smDown>
            {' '}
            <Box
              width="100%"
              marginY="1rem"
              height="300px"
              className="banner-img"
              display="flex"
              alignItems="center"
            >
              <Image
                src={require(`../../../public${EASY_MONEY_TRANSFER}`)}
                alt="easy money transfer"
                width="100%"
              />
            </Box>
          </Hidden>
          <Hidden mdUp>
            <div className="action-btns">
              <Button
                onClick={() => {
                  Router.push('/signup');
                }}
                bgColor={theme.palette.secondary.main}
              >
                Sign Up
              </Button>
              <Button
                onClick={() => {
                  Router.push('/login');
                }}
                bgColor={theme.palette.primary.main}
              >
                Login
              </Button>
            </div>
          </Hidden>
        </Box>
      </Header>
    </>
  );
};

export default HowItWorks;
