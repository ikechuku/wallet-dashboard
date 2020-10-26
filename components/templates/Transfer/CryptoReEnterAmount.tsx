/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import { Box, Hidden, useTheme } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Button, Image } from '../../atoms';
import TransferConverter from '../../organism/CurrencyConverter/TransferConverter';
import { TransferState, CryptoPaymentReqProps } from '../../../models/Transfer';
import useAbokiConverter from '../../../hooks/useAbokiConverter';
import { AuthState } from '../../../models/Auth';
import useEnterAmount from '../../../hooks/useEnterAmount';
import useCryptoConverter from '../../../hooks/useCryptoConverter';
import useConverterForm from '../../../hooks/useConverterForm';
import Assets from '../../../utils/assets';
import {
  CryptoPaymentAsync,
  TransferActions,
} from '../../../store/actions/tranferActions';
import AuthErrors from '../../shared/AuthErrors';
import { emptyObj, updateToLocalStorage } from '../../../utils';
import { EDIT_TRANSFER } from '../../../store/actions/actionTypes';

const CryptoReEnterPayment = () => {
  const {
    transfer,
    auth: { profile, user },
  }: { transfer: TransferState; auth: AuthState } = useSelector((state) => ({
    auth: state.auth,
    transfer: state.transfer,
  }));

  const { form: reduxForm, cryptoCharge, errors, message } = transfer;
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

  const { WARNING_ICON } = Assets;

  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Box
      paddingBottom="2rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <AuthErrors
        AuthActions={() => dispatch(TransferActions())}
        message={message}
        errors={errors}
        condition={!emptyObj(cryptoCharge)}
      />
      <Box
        margin="1.5rem auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box marginBottom="1rem" display="flex" alignItems="center">
          <Text
            margin="0 1rem 0 0"
            color={theme.palette.primary.light}
            variant="h6"
          >
            We are sorry
          </Text>
          <Image
            src={require(`../../../public${WARNING_ICON}`)}
            alt="warning"
          />
        </Box>
        <Text
          margin="0 auto"
          textAlign="center"
          fontWeight="300"
          width="350px"
          color="#bbb"
          variant="caption"
        >
          The amount has changed because you took too long to pay. Not to worry!
          We have updated your transaction with the new amount
        </Text>
      </Box>
      <Box alignItems="center" display="flex" flexDirection="column">
        <TransferConverter
          hide
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
              isLoading={transfer.isLoading}
              params={{
                disabled:
                  !form.convertedAmount || Number(form.convertedAmount) < 1,
              }}
              onClick={() => {
                const frm = submitForm({
                  form,
                  user,
                  profile,
                  transfer,
                  navigate: false,
                });

                dispatch(
                  CryptoPaymentAsync({
                    params: {
                      /* bankCode:
                        form.recipientCountry === 'NG'
                          ? frm.bank
                          : frm.sortCode,
                      accountName: frm.newRecipientName,
                      accountNumber: frm.accountNumber,
                      narration: frm.narration,
                      bankName: frm.bankName,
                      userId: profile.userId, */
                      ...transfer.cryptoChargeReq,
                      toAmount: Number(frm.convertedAmount),
                      toCurrency: frm.toCurrency,
                      fromAmount: Number(frm.amount),
                      fromCurrency: frm.fromCurrency,
                    } as CryptoPaymentReqProps,
                    cb: (pass) => {
                      if (pass) {
                        updateToLocalStorage({
                          obj: {
                            state: { ...transfer, cryptoCharge: pass },
                            action: EDIT_TRANSFER,
                          },
                          parent: 'user',
                          key: 'form',
                        });
                      }
                      dispatch(
                        TransferActions({
                          form: { ...reduxForm, cryptoPayPage: false },
                        } as TransferState)
                      );
                    },
                  })
                );
              }}
              fontWeight="300"
              bgColor={theme.palette.primary.light}
              width="100%"
            >
              <Hidden xsDown>Pay</Hidden>
              <Hidden smUp>Start sending money!</Hidden>
            </Button>
          </Box>
        </TransferConverter>
      </Box>
    </Box>
  );
};

export default CryptoReEnterPayment;
