import React from 'react';
import { useRouter } from 'next/router';
import { Box, useTheme } from '@material-ui/core';
import { Button } from '../atoms';
import { TransferForm } from '../../models/Transfer';
import { UserProps } from '../../models/Auth';

function createPayment({
  FlutterwaveCheckout,
  amount = 3000,
  currency = 'NGN',
  onClose,
  email,
  phone,
  name,
  redirectUrl,
}) {
  FlutterwaveCheckout({
    public_key: process.env.PUBLIC_RAVE_KEY,
    tx_ref: `cd_flw_${Date.now()}`,
    amount,
    currency,
    payment_options: 'card, mobilemoneyghana, ussd',
    meta: {
      consumer_id: 23,
      consumer_mac: '92a3-912ba-1192a',
    },
    customer: {
      email,
      phone_number: phone,
      name,
    },
    redirect_url: redirectUrl,
    onclose: () => {
      onClose();
    },
    customizations: {
      title: 'Syarpa',
      description: 'Card Payment',
      logo: `${process.env.APP_URL}/images/syapa_logo.png`,
    },
  });
}

export const FlutterWavePayment = ({
  amount,
  currency,
  Router,
  email,
  dialCode,
  phoneNumber,
  firstName,
  lastName,
  redirectUrl,
}) => {
  createPayment({
    FlutterwaveCheckout: (params) => {
      if ((window as any)?.FlutterwaveCheckout) {
        (window as any).FlutterwaveCheckout(params);
      } else console.log('FlutterwaveCheckout not available');
    },
    amount: Number(amount),
    currency,
    onClose: () => {
      Router.reload();
    },
    email,
    phone: dialCode + phoneNumber,
    name: `${firstName} ${lastName}`,
    redirectUrl,
  });
};

const FlutterWavePay = ({ isLoading, form, user, redirectUrl }) => {
  const Router = useRouter();
  const {
    amount,
    fromCurrency: currency,
    dialCode,
    phoneNumber,
    firstName,
    lastName,
  }: TransferForm = form;

  const { email }: UserProps = user;

  const theme = useTheme();

  return (
    <Box width="100%">
      <Button
        width="100%"
        isLoading={isLoading}
        bgColor={theme.palette.secondary.main}
        onClick={() =>
          FlutterWavePayment({
            amount,
            currency,
            Router,
            email,
            dialCode,
            phoneNumber,
            firstName,
            lastName,
            redirectUrl,
          })
        }
      >
        Pay
      </Button>
    </Box>
  );
};

export default FlutterWavePay;
