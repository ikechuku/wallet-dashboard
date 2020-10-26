import React from 'react';
import { Grid, Box, useTheme } from '@material-ui/core';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import Assets from '../../../utils/assets';
import { ChooseSkarpa as Style } from './style';

export default () => {
  const theme = useTheme();
  const ImageBox = ({ alt, src, heading, subHeading }) => (
    <div className="image-box">
      <Image
        margin="0 0 1.5rem"
        alt={alt}
        src={require(`../../../public${src}`)}
      />
      <Text
        padding="0 0 .3rem"
        fontWeight="400"
        textAlign="center"
        color={theme.palette.secondary.contrastText}
        variant="h6"
      >
        {heading}
      </Text>
      <Text
        css="opacity: .6"
        color={theme.palette.secondary.contrastText}
        fontWeight="200"
        textAlign="center"
        variant="body1"
      >
        {subHeading}
      </Text>
    </div>
  );
  return (
    <Style>
      <Box margin="0 0 3rem" className="choose-skarpa">
        <Text
          fontWeight="400"
          textAlign="center"
          color={theme.palette.secondary.contrastText}
          variant="h4"
        >
          Why choose Skarpa
        </Text>
      </Box>

      <Grid container className="choose-skarpa-grid">
        {[
          {
            id: 1,
            alt: 'bank pickup',
            src: Assets.BANK_PICKUP,
            heading: 'Safe',
            subHeading:
              'Our team is dedicated to ensuring your money travels safe from the moment you click send to the point of arrival',
          },
          {
            id: 2,
            alt: 'safe transfer',
            src: Assets.SAFE_TRANSFER,
            heading: 'Swift',
            subHeading:
              'Whether you’re shopping, sending money or paying bills, you can complete all your transactions within minutes',
          },
          {
            id: 3,
            alt: 'pay bills',
            src: Assets.PAY_BILL,
            heading: 'Simple',
            subHeading:
              'With a few clicks on your device, you can send money to bank accounts and cash pickup locations anywhere in the world',
          },
          {
            id: 4,
            alt: 'instant payment',
            src: Assets.FREE_TRANSFER,
            heading: 'Sync',
            subHeading:
              'Connect your existing crypto wallet to your Syarpa wallet for easy transfer of funds transfer of funds',
          },
        ].map((imgBox) => (
          <Grid key={imgBox.id} item lg={3} sm={6} xs={12} className="img-box">
            <ImageBox
              key={imgBox.id}
              alt={imgBox.alt}
              heading={imgBox.heading}
              subHeading={imgBox.subHeading}
              src={imgBox.src}
            />
          </Grid>
        ))}
      </Grid>
    </Style>
  );
};
