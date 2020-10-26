import React from 'react';
import { Grid, Card, Container, useTheme } from '@material-ui/core';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import Assets from '../../../utils/assets';
import { OptionMoney } from './style';

export default () => {
  const theme = useTheme();
  const OptionsCard = ({ alt, src, heading, subHeading, subTitle }) => (
    <Card className="card-box">
      <div className="body">
        <div>
          <Image
            margin="0 0 1.5rem"
            alt={alt}
            src={require(`../../../public${src}`)}
          />
          <div>
            <Text
              padding=".5rem 0 1rem"
              fontWeight="500"
              color={theme.palette.primary.light}
              variant="subtitle1"
            >
              {heading}
            </Text>
            <Text
              padding="0 0 3rem"
              fontWeight="300"
              css="opacity: .5"
              color={theme.palette.primary.contrastText}
              variant="subtitle2"
            >
              {subHeading}
            </Text>
          </div>
        </div>
        <Text fontWeight="500" color={theme.palette.info.main} variant="body2">
          {subTitle}
        </Text>
      </div>
    </Card>
  );

  return (
    <OptionMoney>
      <Container className="pay-options">
        <Grid container className="pay-options-msg" justify="center">
          <Text
            fontWeight="500"
            color={theme.palette.primary.light}
            variant="h4"
          >
            There is more than one way to send money!
          </Text>
        </Grid>

        <Grid container className="pay-options-grid" spacing={4}>
          {[
            {
              id: 1,
              alt: 'bank pickup',
              src: Assets.BANK_TRANSFER,
              heading: 'Bank Transfer',
              subHeading: 'Make payment directly from your bank account.',
              subTitle: 'Transaction Fee (1.2%)',
            },
            {
              id: 2,
              alt: 'safe transfer',
              src: Assets.DEBIT_CARD,
              heading: 'Debit / Credit Card',
              subHeading: 'Make payment with your debit or credit card',
              subTitle: 'Transaction Fee (1.2%)',
            },
            {
              id: 3,
              alt: 'pay bills',
              src: Assets.SWIFT_TRANSFER,
              heading: 'SWIFT Transfer',
              subHeading:
                'Use the SWIFT international payment network for transfers to over 100 countries in the world.',
              subTitle: 'Transaction Fee (1.2%)',
            },
            {
              id: 4,
              alt: 'instant payment',
              src: Assets.SEND_CRYPTO,
              heading: 'Send and receive cryptocurrency',
              subHeading:
                'Sent from your online banking, telephone, banking or branch, Should Arrive in 39 mins!',
              subTitle: 'Transaction Fee (1.2%)',
            },
            {
              id: 5,
              alt: 'instant payment',
              src: Assets.PAY_SKARPA_ACCOUNT,
              heading: 'Pay into our Skarpa account',
              subHeading: 'Transfer into our Syarpa account via online banking',
              subTitle: 'Transaction Fee (1.2%)',
            },
            {
              id: 6,
              alt: 'instant payment',
              src: Assets.PAY_SKARPA_WALLET,
              heading: 'Pay using your Skarpa wallet',
              subHeading:
                'Load your Syarpa wallet and pay from your mobile at no extra cost',
              subTitle: 'Transaction Fee (1.2%)',
            },
          ].map((optBox) => (
            <Grid
              key={optBox.id}
              item
              lg={4}
              sm={6}
              xs={12}
              className="opt-box"
            >
              <OptionsCard
                alt={optBox.alt}
                heading={optBox.heading}
                subHeading={optBox.subHeading}
                src={optBox.src}
                subTitle={optBox.subTitle}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </OptionMoney>
  );
};
