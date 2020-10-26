import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import { Text } from '../../atoms';
import BanksDropDown from '../BanksDropDown';
import { TextField } from '../../molecule';
import { BankState } from '../../../models/BankDetails';
import { NGAccountValidationResProps } from '../../../models/AccountDetails';
import { TransferActions } from '../../../store/actions/tranferActions';
import {
  BankActions,
  AccountDetailsAsync,
} from '../../../store/actions/bankActions';
import Spinner from '../../atoms/Spinner';
import { TransferState } from '../../../models/Transfer';

export default (props) => {
  const { values, change, touched, errors, setValues, nameProps = {} } = props;
  const {
    banks: { accountDetails },
    transfer: { form },
  }: { banks: BankState; transfer: TransferState } = useSelector((state) => ({
    banks: state.banks,
    transfer: state.transfer,
  }));
  const dispatch = useDispatch();
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const acc = accountDetails as NGAccountValidationResProps;
    if (acc?.accountName) {
      setValues({
        ...values,
        newRecipientName: acc.accountName,
      });
    }
  }, [accountDetails]);

  React.useEffect(() => {
    if (accountDetails != null) {
      dispatch(TransferActions({ accountDetails: null }));
      dispatch(BankActions({ accountDetails: null }));
    }

    if (values.bank && values.accountNumber?.length === 10) {
      setLoading(true);
      dispatch(
        AccountDetailsAsync({
          cb: () => {
            setLoading(false);
          },
          params: {
            accountNumber: values.accountNumber,
            code: values.bank,
            country: values.recipientCountry,
          },
        })
      );
    }
  }, [values.accountNumber, values.bank]);

  return (
    <>
      <Box marginBottom="1rem">
        <BanksDropDown
          country={values.recipientCountry}
          bank={values.bank}
          top="-5rem"
          setBank={(e) => {
            setValues({
              ...values,
              newRecipientName: '',
              bankName: e?.name,
              bank: e?.target.value,
            });
          }}
          params={{
            disabled: values.sendEmail || Boolean(form.sendRecipient),
            name: 'bank',
            error: touched.bank && Boolean(errors.bank),
          }}
        />
        <Box>
          <Text color="#f44336" variant="caption">
            {touched.bank ? errors.bank : ''}
          </Text>
        </Box>
      </Box>
      <Box marginBottom="1rem" className="row">
        <TextField
          color="#bbb"
          onChange={(e) => {
            if (e.target.value.length > 10) return;
            setValues({
              ...values,
              newRecipientName: '',
              accountNumber: String(e.target.value).replace(/[^0-9.]/g, ''),
            });
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
      <Box className="row">
        <TextField
          color="#bbb"
          onChange={(e) => change('newRecipientName', e)}
          value={values.newRecipientName}
          endIcon={
            values.recipientCountry === 'NG' && isLoading ? <Spinner /> : null
          }
          params={{
            name: 'newRecipientName',
            autoComplete: 'off',
            disabled:
              values.sendEmail ||
              values.recipientCountry === 'NG' ||
              Boolean(form.sendRecipient),
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
