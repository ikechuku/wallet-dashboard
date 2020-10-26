import React from 'react';
import { format } from 'date-fns';
import { CvtrForm } from '../models/CurrenctCvtr';

export default function useConverterForm({
  reduxForm = {} as any,
  country = {} as any,
}) {
  const [form, setForm] = React.useState({
    amount: reduxForm?.amount || '1000',
    convertedAmount: reduxForm?.convertedAmount || null,
    rate: reduxForm?.rate || '0.00',
    inverse: false,
    frequency: reduxForm?.frequency || 'Daily',
    makeReoccuringPayment: reduxForm?.makeReoccuringPayment || false,
    firstPayment: reduxForm?.firstPayment || format(new Date(), 'MM/dd/yyyy'),
    untilPayment: reduxForm?.untilPayment || 'Further Notice',
    chargeAmt: reduxForm?.chargeAmt || '0.00',
    totalAmount: reduxForm?.totalAmount || '0.00',
    toCurrency: reduxForm?.toCurrency || 'NGN',
    recipientCountry: reduxForm?.recipientCountry || 'NG',
    recipientCountryId: reduxForm?.recipientCountryId || 162,
    fromCountry: reduxForm?.fromCountry || country?.countryCode || 'GB',
    fromDailCode: reduxForm?.fromDailCode || country?.dialCode || '44',
    fromCurrency: reduxForm?.fromCurrency || country?.currencyCode || 'GBP',
  } as CvtrForm);

  return { form, setForm };
}
