import * as React from 'react';
import { Box, useTheme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Text } from '../../atoms';
import SuccessTemplate from '../EndScreens/Success';
import { convertToCurrency, emptyObj } from '../../../utils';
import useFWSuccess from '../../../hooks/useFWSuccess';
import useStripeSuccess from '../../../hooks/useStripeSuccess';
import Spinner from '../../atoms/Spinner';
import { TransferState } from '../../../models/Transfer';

const SuccessPage = () => {
  const transfer: TransferState = useSelector((state) => state.transfer);
  const { form } = transfer;
  const Router = useRouter();
  const theme = useTheme();

  const [payProcess, setPayProcess] = React.useState(false);

  React.useEffect(() => {
    if (emptyObj(form)) Router.replace('/dashboard');
  }, []);

  const { tx_ref, transaction_id } = useFWSuccess({
    setPayProcess,
    form,
  });

  useStripeSuccess({
    setPayProcess,
    form,
  });

  return !payProcess ? (
    <Box
      display="flex"
      width="100%"
      height="100%"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Text variant="h3" textAlign="center" color={theme.palette.primary.light}>
        {payProcess === null ? 'Payment was not Recorded' : 'Recording Payment'}
      </Text>
      <Text
        variant="body2"
        textAlign="center"
        margin="1rem 0 2rem"
        color="#bbb"
      >
        {payProcess === null ? (
          <>
            Save this Reference numbers incase of Refund
            <br /> <br />
            <Text variant="caption">Transcation ID:</Text>{' '}
            <Text color={theme.palette.primary.light} variant="caption">
              {transaction_id}
            </Text>
            <br />
            <Text variant="caption">Flw-ref:</Text>{' '}
            <Text color={theme.palette.primary.light} variant="caption">
              {tx_ref}
            </Text>
          </>
        ) : (
          'Do not close this page'
        )}
      </Text>
      {payProcess === false && <Spinner size="3rem" />}
    </Box>
  ) : (
    <SuccessTemplate msg="Congratulations!">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-end"
        margin="2rem auto"
      >
        <Text
          margin="0 auto"
          textAlign="center"
          fontWeight="400"
          color="#bbb"
          variant="caption"
          fontSize=".85rem"
        >
          You have successfully paid
        </Text>
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
          color="#bbb"
          fontSize=".85rem"
          variant="caption"
        >
          To {form.newRecipientName || 'unknown'}
        </Text>
        <Text color="#bbb" fontSize=".85rem" variant="caption">
          into account number ending in{' '}
          <Text
            color={theme.palette.primary.light}
            fontSize=".85rem"
            variant="caption"
          >
            {String(form.accountNumber).substring(
              form.accountNumber.length - 5,
              form.accountNumber.length
            )}
          </Text>
        </Text>
      </Box>
    </SuccessTemplate>
  );
};

export default SuccessPage;
