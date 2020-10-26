/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import { Box, Hidden, useTheme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Text, Button } from '../../atoms';
import TransferConverter from '../../organism/CurrencyConverter/TransferConverter';
import { TransferState } from '../../../models/Transfer';
import useAbokiConverter from '../../../hooks/useAbokiConverter';
import { AuthState } from '../../../models/Auth';
import useEnterAmount from '../../../hooks/useEnterAmount';
import useCryptoConverter from '../../../hooks/useCryptoConverter';
import useConverterForm from '../../../hooks/useConverterForm';

const EnterPayment = () => {
  const {
    transfer,
    auth: { profile, user },
  }: { transfer: TransferState; auth: AuthState } = useSelector((state) => ({
    auth: state.auth,
    transfer: state.transfer,
  }));

  const { form: reduxForm } = transfer;
  const { country } = profile;

  const { form, setForm } = useConverterForm({ reduxForm, country });

  const { disableToAmount } = useAbokiConverter({
    form,
    setForm,
  });

  useCryptoConverter({
    form,
    setForm,
  });

  const { submitForm } = useEnterAmount({
    form,
    setForm,
  });

  const theme = useTheme();
  return (
    <Box
      paddingBottom="2rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box margin="1.5rem auto">
        <Text color={theme.palette.primary.light} variant="h6">
          Choose Your Transfer Amount
        </Text>
      </Box>
      <Box alignItems="center" display="flex" flexDirection="column">
        <TransferConverter
          disableToAmount={disableToAmount}
          form={form}
          freezeCountry={Boolean(reduxForm.sendRecipient)}
          setForm={setForm}
        >
          <Box
            flexDirection="column"
            marginTop=".5rem"
            display="flex"
            width="100%"
          >
            <Button
              params={{
                disabled:
                  !form.convertedAmount || Number(form.convertedAmount) < 1,
              }}
              onClick={() => {
                submitForm({ form, user, profile, transfer });
              }}
              fontWeight="300"
              bgColor={theme.palette.secondary.main}
              width="100%"
            >
              <Hidden xsDown>Pay</Hidden>
              <Hidden smUp>Start sending money!</Hidden>
            </Button>
            <Text
              textAlign="center"
              width="100%"
              margin=".2rem 0"
              color="#bbb"
              fontSize=".8rem"
              variant="body1"
            >
              By clicking pay, I confirm that I have read and accept{' '}
              <Text
                variant="caption"
                fontSize=".8rem"
                color={theme.palette.primary.light}
              >
                Syarpa’s of Terms of Use
              </Text>
            </Text>
          </Box>
        </TransferConverter>
      </Box>
    </Box>
  );
};

export default EnterPayment;
