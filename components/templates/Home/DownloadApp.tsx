import React from 'react';
import { Grid, Container, Box, Hidden, useTheme } from '@material-ui/core';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import Assets from '../../../utils/assets';
import { DownloadApp as Style } from './style';
import { Button } from '../../atoms';

export default () => {
  const theme = useTheme();
  const { APPSTORE_ICON, GOOGLESTORE_ICON, APP_PHONE } = Assets;
  return (
    <Style>
      <Container>
        <Grid container className="download-app">
          <Grid
            direction="column"
            justify="center"
            container
            item
            md={6}
            className="download-app-msg"
          >
            <Text
              padding="2rem 0"
              fontWeight="500"
              color={theme.palette.primary.light}
              variant="h4"
            >
              Download our app to send &amp; receive money on the go!
            </Text>
            <Text
              color={theme.palette.primary.contrastText}
              fontWeight="300"
              variant="h6"
            >
              Take one step closer to a stress-free payment experience with the
              Syarpa mobile app
            </Text>
            <Hidden smDown>
              <Box
                width="70%"
                margin="1rem 0"
                display="flex"
                className="download-btn"
                justifyContent="space-between"
              >
                <Button colorTheme="transparent" padding="0" width="47%">
                  <Image
                    width="100%"
                    alt="download app from apple store icon"
                    src={require(`../../../public${APPSTORE_ICON}`)}
                  />
                </Button>

                <Button colorTheme="transparent" padding="0" width="49%">
                  <Image
                    width="100%"
                    alt="download app from apple store icon"
                    src={require(`../../../public${GOOGLESTORE_ICON}`)}
                  />
                </Button>
              </Box>
            </Hidden>
          </Grid>
          <Grid container item md={6} className="download-app-img">
            <Image
              src={require(`../../../public${APP_PHONE}`)}
              alt="image of Skarpa app on a phone"
            />
          </Grid>
          <Hidden mdUp>
            <Box
              width="70%"
              margin="1rem auto"
              display="flex"
              className="download-btn"
              justifyContent="space-between"
            >
              <Button colorTheme="transparent" padding="0">
                <Image
                  width="100%"
                  alt="download app from apple store icon"
                  src={require(`../../../public${APPSTORE_ICON}`)}
                />
              </Button>

              <Button colorTheme="transparent" padding="0">
                <Image
                  width="100%"
                  alt="download app from apple store icon"
                  src={require(`../../../public${GOOGLESTORE_ICON}`)}
                />
              </Button>
            </Box>
          </Hidden>
        </Grid>
      </Container>
    </Style>
  );
};
