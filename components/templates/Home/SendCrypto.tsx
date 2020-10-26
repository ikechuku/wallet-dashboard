import React from 'react';
import Router from 'next/router';
import { Grid, Box, Container, Hidden, useTheme } from '@material-ui/core';
import Text from '../../atoms/Text';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import { SendCrypto } from './style';
import Assets from '../../../utils/assets';

export default () => {
  const theme = useTheme();
  const { SEND_CRYPTO_IMG } = Assets;
  return (
    <SendCrypto>
      <Container>
        <Grid container className="send-crypto">
          <Hidden xsDown>
            <Grid
              item
              container
              md={5}
              lg
              className="send-crypto-img"
              alignItems="center"
            >
              <Image
                margin="0 0 1.5rem"
                alt="girl sending crypto cash"
                src={require(`../../../public${SEND_CRYPTO_IMG}`)}
              />
            </Grid>
          </Hidden>
          <Grid item container md={7} lg justify="center">
            <Box className="send-crypto-msg">
              <Hidden xsDown>
                <Text
                  fontWeight="500"
                  color={theme.palette.primary.light}
                  variant="h4"
                >
                  Send crypto and receive fiat in few, simple steps
                </Text>
                <Text
                  margin="0 0 2rem"
                  color="rgba(0, 0, 0, .7)"
                  variant="h6"
                  fontWeight="300"
                >
                  Use your Syarpa wallet to send and receive supported
                  cryptocurrencies. You can also convert your cryptocurrency to
                  your local fiat currency and back
                </Text>
              </Hidden>
              <Text
                fontWeight="400"
                color={theme.palette.primary.light}
                variant="h6"
              >
                Its so simple!
              </Text>
              <div className="how-btns">
                <Button bgColor={theme.palette.primary.light}>
                  Show Me How It Works
                </Button>
                <Button
                  onClick={() => Router.push('/signup')}
                  bgColor={theme.palette.secondary.main}
                >
                  Sign Up
                </Button>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </SendCrypto>
  );
};
