/* eslint-disable @typescript-eslint/no-use-before-define */
import { Box, useTheme } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Button } from '../../../atoms';
import { emptyObj, fakeEvent } from '../../../../utils';
import AuthErrors from '../../../shared/AuthErrors';
import BankDetails from '../../../shared/BankDetails';
import { BankActions } from '../../../../store/actions/bankActions';
import { TransferState, TransferForm } from '../../../../models/Transfer';
import { BankState } from '../../../../models/BankDetails';
import { myRecipientValidationSchema } from '../../../../validation/transferValidator';
import { TransferActions } from '../../../../store/actions/tranferActions';
import { TransferRoutes, transferNavigate } from '../../../../utils/enums';
import { GetMyselfRecipientsAsync } from '../../../../store/actions/recipientActions';
import { RecipientState } from '../../../../models/RecipientDetails';
import SearchExistingRecipient from '../../../shared/SearchExistingRecipient';
import TabView from '../../../organism/TabView';
import { TextField } from '../../../molecule';
import { AuthState } from '../../../../models/Auth';

const SomeOneElseForm = () => {
  const dispatch = useDispatch();
  const {
    transfer,
    auth: { profile },
    recipients: { myselfList },
    banks: { accountDetails, message, errors: bankErrors },
  }: {
    banks: BankState;
    auth: AuthState;
    transfer: TransferState;
    recipients: RecipientState;
  } = useSelector((state) => ({
    banks: state.banks,
    transfer: state.transfer,
    auth: state.auth,
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
    validationSchema: myRecipientValidationSchema,
    onSubmit: (val) => {
      if (!val.sendEmail && emptyObj(accountDetails)) return;
      if (val.sendEmail) return;
      const newForm: TransferForm = { ...transfer.form, ...val };
      newForm.recipientTag = 'myself';
      console.log(
        `${profile.firstName} ${profile.lastName}`,
        `${form.firstName} ${form.lastName}`
      );
      newForm.newRecipientName =
        newForm.newRecipientName && newForm.newRecipientName.length > 0
          ? newForm.newRecipientName
          : `${profile.firstName} ${profile.lastName}`;
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
    dispatch(GetMyselfRecipientsAsync());
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
              emptyObj(myselfList)
                ? []
                : myselfList.list.filter(
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

          <Box display="flex" flexDirection="column">
            <TabView
              tabs={[
                {
                  title: 'Bank Details',
                  Component: (
                    <Box
                      display="flex"
                      marginTop="1rem"
                      flexDirection="column"
                      flexGrow="1"
                    >
                      <BankDetails
                        change={change}
                        {...formik}
                        nameProps={{
                          css:
                            form.recipientCountry !== 'NG' && 'display: none;',
                        }}
                      />
                    </Box>
                  ),
                },
                {
                  title: 'IBAN',
                  inActive: true,
                  Component: (
                    <Box
                      display="flex"
                      marginTop="1rem"
                      flexDirection="column"
                      flexGrow="1"
                    >
                      <TextField
                        color="#bbb"
                        onChange={(_) => _}
                        value={values.newRecipientName}
                        label="IBAN"
                        labelPosition="in"
                      />
                    </Box>
                  ),
                },
              ]}
            />
          </Box>
        </Box>
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
