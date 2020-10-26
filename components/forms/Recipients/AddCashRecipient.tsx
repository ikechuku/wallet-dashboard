import { Box, useTheme, DialogContent, DialogActions } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Text } from '../../atoms';
import CountriesDropDown from '../../shared/CountriesDropDown';
import { fakeEvent } from '../../../utils';
import PersonalIcon from '../../icons/PersonalIcon';
import BusinessIcon from '../../icons/BusinessIcon';
import BankDetails from '../../shared/BankDetails';
import { recipientValidationSchema } from '../../../validation/transferValidator';
import SendRecipientEmail from '../../shared/SendRecipientEmail';
import {
  CreateRecipientsAsync,
  RecipientActions,
} from '../../../store/actions/recipientActions';
import {
  CreateRecipientReqProps,
  RecipientState,
} from '../../../models/RecipientDetails';
import AuthErrors from '../../shared/AuthErrors';

const AddCashRecipientFrom = ({ handleClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [submitState, setSubmitState] = React.useState({
    isLoading: false,
    createdRecipient: false,
  });
  const { errors, message }: RecipientState = useSelector(
    (state) => state.recipients
  );
  const initValues = {
    category: 'someoneElse',
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
            tag: 'someoneelse',
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
    formik.setValues({
      ...initValues,
      recipientCountry: values.recipientCountry,
      recipientCountryId: values.recipientCountryId,
    });
  }, [values.recipientCountry]);
  return (
    <>
      <AuthErrors
        AuthActions={() => dispatch(RecipientActions())}
        message={message}
        errors={errors}
        condition={submitState.createdRecipient}
      />
      <form onSubmit={formik.handleSubmit}>
        <DialogContent
          className="customized-dialog-content"
          css="padding: 12px;"
        >
          <Box
            css={`
              opacity: ${values.sendEmail ? 0.7 : 1};
              pointer-events: ${values.sendEmail ? 'none' : ''};
            `}
          >
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
            <Box display="flex" flexDirection="column">
              <Text
                margin="1rem 0 .5rem"
                fontSize=".9rem"
                color={theme.palette.primary.light}
                variant="body1"
              >
                Select Recipient Type
              </Text>
              <Box
                display="flex"
                marginBottom=".8rem"
                justifyContent="space-between"
              >
                {[
                  {
                    category: 'someoneElse',
                    title: 'Someone Else',
                    icon: PersonalIcon,
                  },
                  {
                    category: 'business',
                    title: 'Busines/Charity',
                    icon: BusinessIcon,
                  },
                ].map(({ icon: Comp, ...item }, index) => (
                  <div css="width:48%" key={index}>
                    <Button
                      width="100%"
                      css={`
                        border: ${values.category === item.category
                          ? null
                          : '1px solid #ccc'};
                      `}
                      onClick={() =>
                        change('category', fakeEvent('category', item.category))
                      }
                      color={
                        values.category === item.category
                          ? '#fff'
                          : theme.palette.primary.light
                      }
                      startIcon={
                        <Comp
                          height="20"
                          width="20"
                          color={theme.palette.secondary.main}
                        />
                      }
                      fontWeight="300"
                      fontSize=".85rem"
                      bgColor={
                        values.category === item.category
                          ? theme.palette.primary.light
                          : '#fff'
                      }
                    >
                      {item.title}
                    </Button>
                  </div>
                ))}
              </Box>
            </Box>
            <Box display="flex" marginBottom="1rem" flexDirection="column">
              <BankDetails
                change={change}
                {...formik}
                nameProps={{
                  label:
                    values.category === 'someoneElse'
                      ? 'Name'
                      : 'Business Name',
                }}
              />
            </Box>
          </Box>
          <SendRecipientEmail
            change={change}
            values={values}
            errors={formik.errors}
            touched={formik.touched}
          />
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

export default AddCashRecipientFrom;
