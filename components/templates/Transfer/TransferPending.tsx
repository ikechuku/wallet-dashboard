import * as React from 'react';
import { Box, useTheme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Text } from '../../atoms';
import PendingTemplate from '../EndScreens/Pending';
import { convertToCurrency, emptyObj } from '../../../utils';
import { TransferState } from '../../../models/Transfer';

const TransferPending = () => {
  const transfer: TransferState = useSelector((state) => state.transfer);
  const { form } = transfer;
  const Router = useRouter();
  const theme = useTheme();

  React.useEffect(() => {
    if (emptyObj(form)) Router.replace('/dashboard');
  }, []);

  return (
    <PendingTemplate btnText="I've Paid">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-end"
        margin="2rem auto"
      >
        <Box maxWidth="20rem" margin="0 auto 1rem">
          <Text
            textAlign="center"
            fontWeight="300"
            color="#bbb"
            fontSize=".9rem"
            variant="body1"
          >
            Your payment is on its way. We will keep you updated on its status.
          </Text>
        </Box>
        <Text
          textAlign="center"
          fontSize="1.8rem"
          fontWeight="400"
          color={theme.palette.primary.light}
          variant="h6"
        >
          {form.fromCurrency} {convertToCurrency(form.amount)}
        </Text>
        <Text textAlign="center" color={theme.palette.info.main} variant="h6">
          ({form.toCurrency} {convertToCurrency(form.convertedAmount)})
        </Text>
        <Text
          margin="1rem auto"
          textAlign="center"
          fontWeight="400"
          color={theme.palette.primary.light}
          variant="body1"
          fontSize=".9rem"
        >
          To {form.newRecipientName || 'unknown'}
        </Text>
        <Text fontSize=".9rem" color="#bbb" variant="body1">
          Account Ending in{' '}
          <Text
            fontWeight="400"
            color={theme.palette.primary.light}
            variant="caption"
            fontSize=".9rem"
          >
            {String(form.accountNumber).substring(
              form.accountNumber.length - 5,
              form.accountNumber.length
            )}
          </Text>
        </Text>
      </Box>
    </PendingTemplate>
  );
};

export default TransferPending;
