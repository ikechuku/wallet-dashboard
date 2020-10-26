import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { convertToCurrency } from '../utils';
import { AbokiRatesResponseProps, CvtrForm } from '../models/CurrenctCvtr';
import { GetAbokiRatesAsync } from '../store/actions/currencyCvtrActions';

const rateInfo = ({ abokiConversion, form, setForm }) => {
  if (abokiConversion && abokiConversion.length > 0) {
    let abokiRate;
    if (form.fromCurrency === form.toCurrency) {
      abokiRate = {
        chargePercent: 0,
        fromCurrency: form.fromCurrency,
        toCurrency: form.toCurrency,
        rate: 1,
      } as AbokiRatesResponseProps;
    } else {
      abokiRate = abokiConversion.find((rate) => {
        return (
          rate.fromCurrency === form.fromCurrency &&
          rate.toCurrency === form.toCurrency
        );
      });
    }

    let charge;
    let amount;
    let totalAmount;

    if (abokiRate) {
      const chargeRatio = abokiRate.chargePercent / 100;
      if (form.inverse) {
        amount =
          Number(form.convertedAmount) / abokiRate.rate / (1 - chargeRatio);
        charge = chargeRatio * amount;
        totalAmount = `${String(convertToCurrency(Number(amount) - charge))} ${
          form.fromCurrency
        } `;
      } else {
        charge = (abokiRate.chargePercent / 100) * Number(form.amount);
        amount = abokiRate.rate * (Number(form.amount) - charge);
        totalAmount = `${String(
          convertToCurrency(Number(form.amount) - charge)
        )} ${form.fromCurrency} `;
      }
      amount = /\./.test(String(amount)) ? Number(amount).toFixed(2) : amount;
    }

    const updateState = {
      ...form,
      chargeAmt: `${convertToCurrency(charge)} ${form.fromCurrency}` || 'N/A',
      rate: abokiRate?.rate || 'N/A',
      totalAmount,
    };
    if (form.inverse) {
      updateState.amount = amount || 0;
    } else {
      updateState.convertedAmount = amount || 0;
    }
    setForm(updateState);
  }
};

export default function useAbokiConverter(params) {
  const {
    cvtr: { abokiConversion },
  } = useSelector((state) => ({
    cvtr: state.cvtr,
  }));
  const dispatch = useDispatch();

  const { form, setForm }: { form: CvtrForm; setForm: Function } = params;
  React.useEffect(() => {
    if (form.fromCountry === 'CRYPTO') return;
    if (!abokiConversion) setForm({ ...form, convertedAmount: null });
    if (!form.inverse) {
      dispatch(
        GetAbokiRatesAsync({
          cb: (abokiConvn: AbokiRatesResponseProps[]) => {
            rateInfo({ abokiConversion: abokiConvn, form, setForm });
          },
        })
      );
    }
  }, [form.amount, form.fromCurrency, form.toCurrency]);

  React.useEffect(() => {
    if (form.fromCountry === 'CRYPTO') return;
    if (form.inverse) {
      dispatch(
        GetAbokiRatesAsync({
          cb: (abokiConvn: AbokiRatesResponseProps[]) => {
            rateInfo({ abokiConversion: abokiConvn, form, setForm });
          },
        })
      );
    }
  }, [form.convertedAmount]);
  return { disableToAmount: false };
}
