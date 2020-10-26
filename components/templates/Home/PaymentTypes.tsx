import React from 'react';
import { Grid, Container, Hidden, useTheme } from '@material-ui/core';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import Assets from '../../../utils/assets';
import { PaymentType } from './style';

export default () => {
  const theme = useTheme();
  return (
    <PaymentType>
      <Container>
        <Grid container className="pay-types">
          <Grid container item md className="pay-types-grid" justify="center">
            <div className="pay-types-hd">
              <Grid container>
                {[
                  {
                    id: 1,
                    alt: 'paypal service logo',
                    src: Assets.PAYPAL_LOGO,
                  },
                  {
                    id: 2,
                    alt: 'american express card logo',
                    src: Assets.AMEX_LOGO,
                  },
                  {
                    id: 3,
                    alt: 'mastercard logo',
                    src: Assets.MASTERCARD_LOGO,
                  },
                  {
                    id: 4,
                    alt: 'visacard logo',
                    src: Assets.VISACARD_LOGO,
                  },
                ].map((imgBox) => (
                  <Grid
                    key={imgBox.id}
                    container
                    item
                    xs={6}
                    className="img-box"
                    justify={imgBox.id % 2 === 0 ? 'flex-end' : 'flex-start'}
                  >
                    {imgBox.id === 2 ? (
                      <Image
                        width="60px"
                        height="60px"
                        alt={imgBox.alt}
                        src={require(`../../../public${imgBox.src}`)}
                      />
                    ) : (
                      <Image
                        width="100px"
                        height="100px"
                        alt={imgBox.alt}
                        src={imgBox.src}
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
            </div>
            <Hidden smUp>
              <Text
                color={theme.palette.primary.contrastText}
                fontWeight="400"
                variant="caption"
                margin="0 0 1rem"
              >
                We are flexible. We accept a wide range of secure payment types.
                All for your convenience.
              </Text>
            </Hidden>
          </Grid>
          <Grid container item md className="pay-types-msg">
            <Text
              padding="2rem 0"
              fontWeight="500"
              color={theme.palette.primary.light}
              variant="h4"
            >
              We accept various payment types
            </Text>
            <Hidden xsDown>
              <Text
                css="opacity: .7"
                color={theme.palette.primary.contrastText}
                fontWeight="300"
                variant="h6"
              >
                We are flexible. We accept a wide range of secure payment types.
                All for your convenience.
              </Text>
            </Hidden>
          </Grid>
        </Grid>
      </Container>
    </PaymentType>
  );
};
