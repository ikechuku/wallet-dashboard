import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { convertToCurrency } from '../utils';
import {
  CvtrForm,
  CvtrState,
  CryptoCurrencyCvtrResponseProps,
} from '../models/CurrenctCvtr';
import { CryptoCurrencyConverterAsync } from '../store/actions/currencyCvtrActions';

const rateInfo = ({ cryptoConversion, form, setForm }) => {
  const cryptoConv: CryptoCurrencyCvtrResponseProps = cryptoConversion;
  const cryptoRate =
    cryptoConversion.rates[String(form.toCurrency).toLowerCase()];
  const cryptoObj = cryptoConv.charges?.find((charge) => {
    return charge.toCurrency === form.toCurrency;
  }) ?? { chargePercentage: 0, toCurrency: form.toCurrency };
  const { chargePercentage } = cryptoObj;

  let charge;
  let amount;
  let totalAmount;

  const chargeRatio = chargePercentage / 100;
  if (form.inverse) {
    amount = Number(form.convertedAmount) / cryptoRate / (1 - chargeRatio);
    charge = chargeRatio * amount;
    totalAmount = `${String(convertToCurrency(Number(amount) - charge))} ${
      form.fromCurrency
    } `;
  } else {
    charge = chargeRatio * Number(form.amount);
    amount = cryptoRate * (Number(form.amount) - charge);
    totalAmount = `${String(convertToCurrency(Number(form.amount) - charge))} ${
      form.fromCurrency
    } `;
  }
  amount = /\./.test(String(amount)) ? Number(amount).toFixed(2) : amount;

  const updateState = {
    ...form,
    chargeAmt: `${convertToCurrency(charge)} ${form.fromCurrency}` || 'N/A',
    rate: cryptoRate || 'N/A',
    totalAmount,
  };
  if (form.inverse) {
    updateState.amount = amount || 0;
  } else {
    updateState.convertedAmount = amount || 0;
  }
  setForm(updateState);
};

export default function useCryptoConverter(params) {
  const { cryptoCurrencyConversion }: CvtrState = useSelector(
    (state) => state.cvtr
  );
  const dispatch = useDispatch();

  const { form, setForm }: { form: CvtrForm; setForm: Function } = params;

  React.useEffect(() => {
    if (form.fromCountry !== 'CRYPTO') return;

    dispatch(
      CryptoCurrencyConverterAsync({
        params: {
          currency: form.fromCurrency,
          convert: true,
        },
        cb: (cryptoConvn: CryptoCurrencyCvtrResponseProps) => {
          if (cryptoConvn) {
            rateInfo({ cryptoConversion: cryptoConvn, form, setForm });
          }
        },
      })
    );
    setForm({ ...form, convertedAmount: null });
  }, [form.fromCurrency]);

  React.useEffect(() => {
    if (
      !cryptoCurrencyConversion ||
      form.fromCountry !== 'CRYPTO' ||
      form.convertedAmount === null
    ) {
      return;
    }
    dispatch(
      CryptoCurrencyConverterAsync({
        params: {
          currency: form.fromCurrency,
          convert: false,
        },
        cb: (cryptoConvn: CryptoCurrencyCvtrResponseProps) => {
          if (cryptoConvn) {
            rateInfo({ cryptoConversion: cryptoConvn, form, setForm });
          }
        },
      })
    );
  }, [form.convertedAmount, form.amount, form.toCurrency]);

  return { disableToAmount: false };
}
