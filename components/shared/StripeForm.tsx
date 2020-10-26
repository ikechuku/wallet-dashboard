import React from 'react';
import { Box, useTheme } from '@material-ui/core';
import { Button, Text, Switch as CustomSwitch } from '../atoms';
import useStripe3DSecure from '../../hooks/useStripe3DSecure';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
  hidePostalCode: true,
};

const StripeForm = () => {
  const theme = useTheme();
  const [saveCard, setSaveCard] = React.useState(false);
  const { CardElement, stripe, handleSubmit, isLoading } = useStripe3DSecure({
    saveCard,
  });
  return (
    <>
      <form css="width: 100%;" onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          bgcolor="#fff"
          width="100%"
          padding="1rem"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box padding=".5rem" border="1px solid #ccc" width="100%">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </Box>
          <Button
            padding=".6rem"
            margin="1rem 0"
            isLoading={isLoading}
            width="100%"
            fontWeight="300"
            params={{ type: 'submit', disabled: !stripe || isLoading }}
          >
            Submit Payment
          </Button>
          <Box
            width="100%"
            alignItems="center"
            display="flex"
            justifyContent="space-between"
          >
            <Text color="#bbb" fontWeight="400" variant="button">
              Save card details
            </Text>
            <CustomSwitch
              name="saveCard"
              bgColor={theme.palette.info.main}
              checked={saveCard}
              toggle={() => setSaveCard(!saveCard)}
            />
          </Box>
        </Box>
      </form>
    </>
  );
};

export default StripeForm;
