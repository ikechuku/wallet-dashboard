import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import {
  PayIntentActionResProps,
  PayIntentSuccessResProps,
  CreatePaymentIntentReqProps,
  TransferState,
  StripeMethodResProps,
} from '../models/Transfer';
import {
  TransferActions,
  CreatePaymentIntentAsync,
} from '../store/actions/tranferActions';

export default function useStripe3DSecure(param) {
  const { saveCard = false } = param;
  const { form, ...transfer }: TransferState = useSelector(
    (state) => state.transfer
  );
  const Router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = React.useState(false);

  let payIntent;
  try {
    payIntent = transfer.stripeIntent as PayIntentActionResProps;
  } catch (e) {
    payIntent = transfer.stripeIntent as PayIntentSuccessResProps;
  }
  if (payIntent && payIntent.paymentIntentClientSecret) {
    /* setLoading(true); */
    stripe
      .handleCardAction(payIntent.paymentIntentClientSecret)
      .then((result) => {
        if (result.error) {
          setLoading(false);
          dispatch(
            TransferActions({
              stripeIntent: null,
            })
          );
        } else {
          dispatch(
            CreatePaymentIntentAsync({
              cb: (pass) => {
                if (pass) Router.push('/transfer/success');
              },
              params: {
                ...transfer.stripeMethod,
                paymentIntentId: result.paymentIntent.id,
                paymentMethodId: '',
                saveCard: form.saveCard,
                recipient: {
                  accountNumber: form.accountNumber,
                  bankName: form.bankName,
                  name: form.newRecipientName,
                  bankCode: form.bank,
                  sortCode: form.sortCode,
                  countryId: form.recipientCountryId,
                  tag: form.recipientTag,
                  swiftCode: '',
                },
              } as CreatePaymentIntentReqProps,
            })
          );
        }
      })
      .catch(console.log);
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setLoading(true);
    try {
      const result = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          address: {
            city: form.city,
            line1: form.address,
            country: form.senderCountry,
            postal_code: form.postalCode,
          },
        },
      });

      const { paymentMethod } = result;
      const stripeMethod = {
        paymentMethodId: paymentMethod.id,
        bank: form.bank,
        accountName: form.newRecipientName || 'unknown',
        accountNumber: form.accountNumber,
        amount: form.amount,
        paymentIntentId: null,
        currencyPair: `${form.fromCurrency}/${form.toCurrency}`,
      } as StripeMethodResProps;
      dispatch(
        TransferActions({
          stripeMethod,
          form: { ...form, saveCard },
        } as TransferState)
      );
      if (form.fromCurrency === 'GBP') {
        dispatch(
          CreatePaymentIntentAsync({
            cb: (pass: any) => {
              if (pass?.success) {
                Router.push('/transfer/success');
              } else if (!pass?.requiresAction) {
                setLoading(false);
              }
            },
            params: {
              ...stripeMethod,
              saveCard: form.saveCard,
              recipient: {
                accountNumber: form.accountNumber,
                bankName: form.bankName,
                name: form.newRecipientName,
                bankCode: form.bank,
                sortCode: form.sortCode,
                countryId: form.recipientCountryId,
                tag: form.recipientTag,
                swiftCode: form.swiftCode,
              },
            } as CreatePaymentIntentReqProps,
          })
        );
      }
    } catch (e) {
      setLoading(false);
    }
  };

  return { isLoading, handleSubmit, CardElement, stripe };
}
