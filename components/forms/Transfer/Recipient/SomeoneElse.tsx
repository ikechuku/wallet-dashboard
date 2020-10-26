/* eslint-disable @typescript-eslint/no-use-before-define */
import { Box, useTheme } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Text } from '../../../atoms';
import CountriesDropDown from '../../../shared/CountriesDropDown';
import { emptyObj, fakeEvent } from '../../../../utils';
import AuthErrors from '../../../shared/AuthErrors';
import BankDetails from '../../../shared/BankDetails';
import { BankActions } from '../../../../store/actions/bankActions';
import { TransferState, TransferForm } from '../../../../models/Transfer';
import { BankState } from '../../../../models/BankDetails';
import { recipientValidationSchema } from '../../../../validation/transferValidator';
import { TransferActions } from '../../../../store/actions/tranferActions';
import { TransferRoutes, transferNavigate } from '../../../../utils/enums';
import SendRecipientEmail from '../../../shared/SendRecipientEmail';
import { GetOthersRecipientsAsync } from '../../../../store/actions/recipientActions';
import { RecipientState } from '../../../../models/RecipientDetails';
import SearchExistingRecipient from '../../../shared/SearchExistingRecipient';

const SomeOneElseForm = () => {
  const dispatch = useDispatch();
  const {
    transfer,
    recipients: { othersList },
    banks: { accountDetails, message, errors: bankErrors },
  }: {
    banks: BankState;
    transfer: TransferState;
    recipients: RecipientState;
  } = useSelector((state) => ({
    banks: state.banks,
    transfer: state.transfer,
    recipients: state.recipients,
  }));

  const { form } = transfer;

  const formik = useFormik({
    initialValues: {
      bank: form.bank || '',
      bankName: form.bankName || '',
      sortCode: form.sortCode || '',
      recipientCountry: form.recipientCountry,
      accountNumber: form.accountNumber || '',
      sendEmail: form.sendEmail || false,
      existingRecipient: form.existingRecipient || '',
      newRecipientName: form.newRecipientName || '',
      newRecipientEmail: form.newRecipientEmail || '',
    },
    validationSchema: recipientValidationSchema,
    onSubmit: (val) => {
      if (!val.sendEmail && emptyObj(accountDetails)) return;
      if (val.sendEmail) return;
      const newForm: TransferForm = { ...transfer.form, ...val };
      newForm.recipientTag = 'someoneelse';
      dispatch(
        TransferActions({
          form: newForm,
        } as TransferState)
      );
      transferNavigate({
        route: TransferRoutes.CONFIRM_PAYMENT,
        obj: { ...transfer, form: newForm },
      });
    },
  });
  const { values } = formik;

  const theme = useTheme();
  const change = (name, e) => {
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
  };
  React.useEffect(() => {
    dispatch(GetOthersRecipientsAsync());
  }, []);

  React.useEffect(() => {
    if (!emptyObj(accountDetails)) {
      dispatch(TransferActions({ accountDetails }));
    }
  }, [accountDetails]);

  return (
    <Box
      padding="1.5rem 1rem"
      marginX="auto"
      bgcolor="white"
      marginBottom="2rem"
      className="recipient-form"
      height="100%"
      width="100%"
    >
      <AuthErrors
        AuthActions={() => dispatch(BankActions())}
        message={message}
        errors={bankErrors}
        condition={!emptyObj(accountDetails)}
      />
      <form onSubmit={formik.handleSubmit}>
        <Box width="100%" display="flex" flexDirection="column">
          <SearchExistingRecipient
            value={values.existingRecipient}
            recipients={
              emptyObj(othersList)
                ? []
                : othersList.list.filter(
                    (item) => item.countryCode === form.recipientCountry
                  )
            }
            disabled={Boolean(form.sendRecipient)}
            resetValues={(res) => {
              change('accountNumber', fakeEvent('accountNumber', ''));
              formik.setValues({
                bank: res?.bank ?? res?.bankCode ?? '',
                bankName: res?.bankName ?? '',
                sortCode: res?.sortCode ?? '',
                recipientCountry: values.recipientCountry,
                accountNumber: res?.accountNumber ?? '',
                sendEmail: false,
                existingRecipient: res?.name ?? '',
                newRecipientName: res?.name ?? '',
                newRecipientEmail: '',
              });
            }}
          />
          <Text
            margin="0 0 1rem"
            color={theme.palette.primary.light}
            fontWeight="400"
            variant="button"
          >
            {!values.existingRecipient
              ? 'Or Add New Recipient'
              : 'Recipient Details'}
          </Text>
          <Box marginBottom="1rem" className="row">
            <Box css="pointer-events:none;">
              <CountriesDropDown
                id="recipient-country"
                country={values.recipientCountry}
                setCountry={(e) => change('recipientCountry', e)}
                params={{
                  name: 'recipientCountry',
                }}
              />
            </Box>
          </Box>
          <Box
            css={`
              pointer-events: ${values.sendEmail || values.existingRecipient
                ? 'none'
                : ''};
              opacity: ${values.sendEmail || values.existingRecipient
                ? 0.5
                : 1};
            `}
            marginBottom=".5rem"
          >
            <BankDetails change={change} {...formik} />
          </Box>
        </Box>
        <SendRecipientEmail
          change={change}
          values={values}
          errors={formik.errors}
          touched={formik.touched}
        />
        <Box
          display="flex"
          justifyContent="center"
          margin="1rem 0"
          width="100%"
        >
          <Button
            padding=".6rem"
            params={{ type: 'submit' }}
            width="100%"
            fontWeight="300"
            bgColor={theme.palette.primary.light}
          >
            Confirm
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SomeOneElseForm;
