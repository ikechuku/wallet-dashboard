/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { decryptionKey, emptyObj } from '../utils';
import { TransferForm, SendRecipient, TransferState } from '../models/Transfer';
import { TransferActions } from '../store/actions/tranferActions';
import { TransferRoutes, transferNavigate } from '../utils/enums';

export default function useEnterAmount({ form, setForm }) {
  const dispatch = useDispatch();
  const { form: reduxForm } = useSelector((state) => state.transfer);
  React.useEffect(() => {
    setForm({
      ...form,
      toCurrency: reduxForm.toCurrency,
      recipientCountryId: reduxForm.recipientCountryId,
      recipientCountry: reduxForm.recipientCountry,
    } as TransferForm);
  }, [reduxForm.toCurrency]);

  React.useEffect(() => {
    getRecipient({ form, dispatch });
  }, []);
  return { submitForm: submitForm(dispatch) };
}

export const getRecipient = ({ form, dispatch }) => {
  const { recipient } = Router.query;
  const params = Router.asPath.split('recipient=');
  if (recipient) {
    try {
      const parseRecipient: SendRecipient = JSON.parse(
        decryptionKey(params?.[1])
      );
      if (parseRecipient && !emptyObj(parseRecipient)) {
        const stateForm: TransferForm = form;
        stateForm.sendRecipient = parseRecipient;
        stateForm.recipientCountry = parseRecipient.recipientCountry;
        stateForm.recipientCountryId = parseRecipient.recipientCountryId;
        stateForm.toCurrency = parseRecipient.toCurrency;
        stateForm.sendEmail = parseRecipient.sendEmail;
        stateForm.newRecipientName = parseRecipient.newRecipientName;
        stateForm.accountNumber = parseRecipient.accountNumber;
        stateForm.bank = parseRecipient.bank;
        stateForm.recipientTag = parseRecipient.recipientTag;
        stateForm.bankName = parseRecipient.bankName;
        stateForm.sortCode = parseRecipient.sortCode;

        dispatch(
          TransferActions({
            form: stateForm,
            accountDetails: parseRecipient.accountDetails,
          } as TransferState)
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
};

const submitForm = (dispatch) => ({
  form,
  user,
  profile,
  transfer,
  navigate = true,
}) => {
  let nextPage;
  const { form: reduxForm } = transfer;
  let payload = {
    amount: form.amount,
    convertedAmount: form.convertedAmount,
    rate: form.rate,
    chargeAmt: form.chargeAmt,
    totalAmount: form.totalAmount,
    toCurrency: form.toCurrency,
    recipientCountry: form.recipientCountry,
    recipientCountryId: form.recipientCountryId,
    fromCountry: form.fromCountry,
    fromDailCode: form.fromDailCode,
    fromCurrency: form.fromCurrency,
    email: user.email,
  } as TransferForm;
  if (profile.isTransferProfile) {
    payload = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phoneNumber: profile.phoneNumber,
      dialCode: profile.dialCode,
      address: profile.address,
      city: profile.city,
      birthDate: profile.dateOfBirth,
      postalCode: profile.postalCode,
      ...payload,
    };
    nextPage = TransferRoutes.TRANFER_TYPE;
  } else {
    nextPage =
      profile.userProfileType === 'PERSONAL'
        ? TransferRoutes.ENTER_PERSONAL
        : TransferRoutes.ENTER_BUSINESS;
  }
  if (reduxForm.sendRecipient && !emptyObj(reduxForm.sendRecipient)) {
    if (nextPage === TransferRoutes.TRANFER_TYPE) {
      nextPage = TransferRoutes.CONFIRM_PAYMENT;
    }
  }
  const newForm = { ...reduxForm, ...payload };
  dispatch(TransferActions({ form: newForm }));
  transferNavigate({
    route: nextPage,
    obj: { ...transfer, form: newForm },
    navigate,
  });
  return newForm;
};
