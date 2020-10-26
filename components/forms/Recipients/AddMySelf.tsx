import { Box, useTheme, DialogContent, DialogActions } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Button } from '../../atoms';
import CountriesDropDown from '../../shared/CountriesDropDown';
import { fakeEvent } from '../../../utils';
import BankDetails from '../../shared/BankDetails';
import { recipientValidationSchema } from '../../../validation/transferValidator';
import {
  CreateRecipientsAsync,
  RecipientActions,
} from '../../../store/actions/recipientActions';
import {
  CreateRecipientReqProps,
  RecipientState,
} from '../../../models/RecipientDetails';
import AuthErrors from '../../shared/AuthErrors';
import { TextField } from '../../molecule';
import TabView from '../../organism/TabView';
import { BankState } from '../../../models/BankDetails';
import { BankActions } from '../../../store/actions/bankActions';
import Spinner from '../../atoms/Spinner';

const AddMyselfFrom = ({ handleClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [submitState, setSubmitState] = React.useState({
    isLoading: false,
    createdRecipient: false,
  });
  const {
    banks: {
      isLoading: isLoadingBank,
      errors: bankError,
      message: bankMessage,
    },
    recipient: { errors, message },
  }: { banks: BankState; recipient: RecipientState } = useSelector((state) => ({
    banks: state.banks,
    recipient: state.recipients,
  }));
  const initValues = {
    recipientCountryId: 162,
    recipientCountry: 'NG',
    sendEmail: false,
    bankName: '',
    bank: '',
    accountNumber: '',
    sortCode: '',
    newRecipientEmail: '',
    newRecipientName: '',
  };
  const formik = useFormik({
    validationSchema: recipientValidationSchema,
    initialValues: initValues,
    onSubmit: (val) => {
      setSubmitState({ ...submitState, isLoading: true });
      dispatch(
        CreateRecipientsAsync({
          cb: (pass) => {
            if (pass) {
              setSubmitState({ isLoading: false, createdRecipient: true });
              handleClose();
            } else {
              setSubmitState({ isLoading: false, createdRecipient: false });
            }
          },
          params: {
            accountNumber: val.accountNumber,
            bankName: val.bankName,
            bankCode: val.bank,
            name: val.newRecipientName,
            countryId: val.recipientCountryId,
            sortCode: val.sortCode,
            tag: 'myself',
          } as CreateRecipientReqProps,
        })
      );
    },
  });

  const { values } = formik;

  const change = (name, e) => {
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
  };

  React.useEffect(() => {
    setSubmitState({ isLoading: false, createdRecipient: false });
  }, [isLoadingBank]);

  React.useEffect(() => {
    formik.setValues({
      ...initValues,
      recipientCountry: values.recipientCountry,
      recipientCountryId: values.recipientCountryId,
    });
  }, [values.recipientCountry]);
  return (
    <>
      <AuthErrors
        AuthActions={() => {
          dispatch(RecipientActions());
          dispatch(BankActions());
        }}
        message={message || bankMessage}
        errors={errors || bankError}
        condition={submitState.createdRecipient}
      />
      <form onSubmit={formik.handleSubmit}>
        <DialogContent
          className="customized-dialog-content"
          css="padding: 12px;"
        >
          <Box>
            <Box>
              <CountriesDropDown
                setCountry={(country) => {
                  change(
                    'recipientCountry',
                    fakeEvent('recipientCountry', country.countryCode)
                  );
                  change(
                    'recipientCountryId',
                    fakeEvent('recipientCountryId', country.id)
                  );
                }}
                country={values.recipientCountry}
                value="currencyCode"
                id="recipient-country"
                params={{
                  name: 'recipientCountry',
                }}
              />
            </Box>
            <Box className="row" marginTop="1rem">
              <TextField
                color="#bbb"
                onChange={(e) => change('newRecipientName', e)}
                value={values.newRecipientName}
                endIcon={
                  values.recipientCountry === 'NG' && isLoadingBank ? (
                    <Spinner />
                  ) : null
                }
                params={{
                  name: 'newRecipientName',
                  disabled: values.recipientCountry === 'NG',
                  error:
                    formik.touched.newRecipientName &&
                    Boolean(formik.errors.newRecipientName),
                  helperText: formik.touched.newRecipientName
                    ? formik.errors.newRecipientName
                    : '',
                }}
                label="Full Name"
                labelPosition="in"
              />
            </Box>
            <Box display="flex" marginTop="1rem" flexDirection="column">
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
                            css: 'display: none;',
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
        </DialogContent>
        <DialogActions className="custom-dialog-actions" css="width: 100%;">
          <Button
            width="100%"
            isLoading={submitState.isLoading}
            params={{ type: 'submit' }}
            bgColor={theme.palette.primary.light}
          >
            Confirm
          </Button>
        </DialogActions>
      </form>
    </>
  );
};

export default AddMyselfFrom;
