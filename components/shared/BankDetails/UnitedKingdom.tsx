import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import { fakeEvent } from '../../../utils';
import { TextField } from '../../molecule';
import { BankState } from '../../../models/BankDetails';
import { UKAccountValidationResProps } from '../../../models/AccountDetails';
import { TransferActions } from '../../../store/actions/tranferActions';
import {
  BankActions,
  AccountDetailsAsync,
} from '../../../store/actions/bankActions';
import Spinner from '../../atoms/Spinner';
import { TransferState } from '../../../models/Transfer';

export default (props) => {
  const { values, change, touched, errors, nameProps = {} } = props;
  const {
    banks: { accountDetails: accInfo },
    transfer: { form },
  }: { banks: BankState; transfer: TransferState } = useSelector((state) => ({
    banks: state.banks,
    transfer: state.transfer,
  }));
  const dispatch = useDispatch();
  const [isLoading, setLoading] = React.useState(false);
  const accountDetails = accInfo as UKAccountValidationResProps;

  React.useEffect(() => {
    if (accountDetails != null) {
      dispatch(TransferActions({ accountDetails: null }));
      dispatch(BankActions({ accountDetails: null }));
    }
    if (values.accountNumber.length === 8 && values.sortCode.length === 6) {
      setLoading(true);
      dispatch(
        AccountDetailsAsync({
          cb: () => {
            setLoading(false);
          },
          params: {
            accountNumber: values.accountNumber,
            sortCode: values.sortCode,
            country: values.recipientCountry,
          },
        })
      );
    }
  }, [values.sortCode, values.accountNumber]);

  React.useEffect(() => {
    if (accountDetails?.bank) {
      change('bankName', fakeEvent('bankName', accountDetails.bank));
    }
  }, [accountDetails]);

  return (
    <>
      <Box marginBottom="1rem">
        <TextField
          color="#bbb"
          onChange={(e) => change('bankName', e)}
          value={values.bankName}
          endIcon={
            values.recipientCountry === 'GB' && isLoading ? <Spinner /> : null
          }
          params={{
            name: 'bankName',
            disabled: true,
            error: touched.bankName && Boolean(errors.bankName),
            helperText: touched.bankName ? errors.bankName : '',
          }}
          label="Bank Name"
          labelPosition="in"
        />
      </Box>
      <Box marginBottom="1rem" className="row">
        <TextField
          color="#bbb"
          onChange={(e) => {
            if (e.target.value.length > 8) return;
            change('bankName', fakeEvent('bankName', ''));
            change(
              'accountNumber',
              fakeEvent(
                'accountNumber',
                String(e.target.value).replace(/[^0-9.]/g, '')
              )
            );
          }}
          value={values.accountNumber}
          params={{
            disabled: values.sendEmail || Boolean(form.sendRecipient),
            name: 'accountNumber',
            error: touched.accountNumber && Boolean(errors.accountNumber),
            helperText: touched.accountNumber ? errors.accountNumber : '',
          }}
          label="Account Number"
          labelPosition="in"
        />
      </Box>
      <Box marginBottom="1rem" className="row">
        <TextField
          color="#bbb"
          onChange={(e) => {
            const str = String(e.target.value).replace(/[^0-9.]/g, '');
            if (e.target.value.length > 6) return;
            change('bankName', fakeEvent('bankName', ''));
            change('bank', fakeEvent('bank', str));
            change('sortCode', fakeEvent('sortCode', str));
          }}
          value={values.sortCode}
          params={{
            disabled: values.sendEmail || Boolean(form.sendRecipient),
            name: 'sortCode',
            error: touched.sortCode && Boolean(errors.sortCode),
            helperText: touched.sortCode ? errors.sortCode : '',
          }}
          label="Sort Code"
          labelPosition="in"
        />
      </Box>
      <Box className="row">
        <TextField
          color="#bbb"
          onChange={(e) => change('newRecipientName', e)}
          value={values.newRecipientName}
          params={{
            name: 'newRecipientName',
            disabled: values.sendEmail || Boolean(form.sendRecipient),
            error: touched.newRecipientName && Boolean(errors.newRecipientName),
            helperText: touched.newRecipientName ? errors.newRecipientName : '',
          }}
          label="Full Name"
          labelPosition="in"
          {...nameProps}
        />
      </Box>
    </>
  );
};
