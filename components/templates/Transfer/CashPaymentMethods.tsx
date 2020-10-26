import * as React from 'react';
import { Box, Hidden, Grid, useTheme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { Text, Image, Button } from '../../atoms';
import Assets from '../../../utils/assets';
import { CashPayMethodStyle } from './styles';
import { FlutterWavePayment } from '../../shared/FlutterWavePay';
import { TransferRoutes, transferNavigate } from '../../../utils/enums';

const OptionsCard = ({
  alt,
  src,
  heading,
  subHeading,
  subTitle,
  page = (_) => _,
}) => {
  const theme = useTheme();
  return (
    <Button css="text-align: left;" width="100%" padding="0" onClick={page}>
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        boxShadow="0 1px 3px 3px rgba(0, 0, 0, 0.03)"
        padding="1rem .6rem"
        bgcolor="#fff"
        className="card-box"
      >
        <Box width="4rem" textAlign="center">
          <Image
            height="2.5rem"
            alt={alt}
            src={require(`../../../public${src}`)}
          />
        </Box>
        <Box flexGrow="1" paddingX=".5rem">
          <Text
            fontWeight="400"
            color={theme.palette.primary.light}
            fontSize=".9rem"
            variant="subtitle1"
          >
            {heading}
          </Text>
          <Hidden xsDown>
            <Text
              fontWeight="300"
              color="rgba(0, 0, 0, .5)"
              variant="subtitle2"
            >
              {subHeading}
            </Text>
          </Hidden>
          <Text
            fontWeight="300"
            color={theme.palette.info.main}
            variant="caption"
          >
            {subTitle}
          </Text>
        </Box>
      </Box>
    </Button>
  );
};

const CashPaymentMethods = () => {
  const { form } = useSelector((state) => state.transfer);
  const theme = useTheme();

  return (
    <>
      <Box margin="2rem auto" width="80%">
        <Text
          color={theme.palette.primary.light}
          textAlign="center"
          fontSize="1.4rem"
          variant="h6"
        >
          What do you what to pay with?
        </Text>
      </Box>
      <CashPayMethodStyle
        alignItems="center"
        margin="0 auto 3rem"
        display="flex"
        flexDirection="column"
      >
        <Grid container className="pay-options-grid" spacing={2}>
          {[
            {
              alt: 'safe transfer',
              active: true,
              src: Assets.DEBIT_CARD,
              page: () => {
                if (form.fromCountry === 'GB') {
                  transferNavigate({
                    route: TransferRoutes.CARD_DETAILS,
                  });
                } else if (form.fromCountry === 'NG') {
                  FlutterWavePayment({
                    Router,
                    amount: form.amount,
                    currency: form.fromCurrency,
                    dialCode: form.dialCode,
                    email: form.email,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    phoneNumber: form.phoneNumber,
                    redirectUrl: `${process.env.APP_URL}/transfer/success`,
                  });
                }
              },
              heading: 'Debit / Credit Card',
              subHeading: 'Make payment with your debit or credit card',
              subTitle: 'Transaction Fee(2, 2%)',
            },
            {
              alt: 'bank pickup',
              src: Assets.BANK_TRANSFER,
              heading: 'Bank Transfer',
              subHeading: 'Make payment directly from your bank account.',
              subTitle: 'Transaction Fee(1, 2%)',
            },
            {
              alt: 'instant payment',
              src: Assets.PAY_SKARPA_ACCOUNT,
              heading: 'Pay into our Syarpa account',
              subHeading: 'Transfer into our Syarpa account via online banking',
              subTitle: 'Transaction Fee(1, 2%)',
            },
            {
              alt: 'pay bills',
              src: Assets.SWIFT_TRANSFER,
              heading: 'SWIFT Transfer',
              subHeading:
                'Use the SWIFT international payment network for transfers to over 100 countries in the world.',
              subTitle: 'Transaction Fee(0, 5%)',
            },
            {
              alt: 'instant payment',
              src: Assets.PAY_SKARPA_WALLET,
              heading: 'Pay using your Syarpa wallet',
              subHeading:
                'Load your Syarpa wallet and pay from your mobile at no extra cost',
              subTitle: 'Free',
            },
          ].map((optBox, index) => (
            <Grid
              key={index}
              item
              lg={4}
              sm={6}
              xs={12}
              css={`
                opacity: ${optBox.active ? 1 : 0.5};
              `}
              className="opt-box"
            >
              <OptionsCard
                alt={optBox.alt}
                page={optBox.page}
                heading={optBox.heading}
                subHeading={optBox.subHeading}
                src={optBox.src}
                subTitle={optBox.subTitle}
              />
            </Grid>
          ))}
        </Grid>
      </CashPayMethodStyle>
    </>
  );
};

export default CashPaymentMethods;
