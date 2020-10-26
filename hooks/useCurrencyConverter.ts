import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { convertToCurrency } from '../utils';
import { TransferForm } from '../models/Transfer';
import { CurrencyConverterAsync } from '../store/actions/currencyCvtrActions';

export default function useCurrencyConverter(params) {
  const { currencyConversion } = useSelector((state) => state.cvtr);
  const dispatch = useDispatch();

  const { form: frm, setForm } = params;
  const form = frm as TransferForm;

  React.useEffect(() => {
    setForm({ ...form, convertedAmount: null });
    dispatch(
      CurrencyConverterAsync({
        params: {
          to: form.toCurrency,
          from: form.fromCurrency,
          amount: form.amount,
        },
      })
    );
  }, [form.amount, form.fromCurrency, form.toCurrency]);

  React.useEffect(() => {
    if (!form.convertedAmount && currencyConversion) {
      const charge = currencyConversion?.chargeAmount
        ? Number(String(currencyConversion?.chargeAmount).split(' ')?.[0])
        : null;
      setForm({
        ...form,
        chargeAmt: currencyConversion.chargeAmount || 'N/A',
        rate: currencyConversion.rate || 'N/A',
        totalAmount: charge
          ? `${String(convertToCurrency(Number(form.amount) + charge))} ${
              form.fromCurrency
            } `
          : 'N/A',
        convertedAmount: currencyConversion.toAmount || 'N/A',
      });
    }
  }, [currencyConversion]);
  return { disableToAmount: true };
}
