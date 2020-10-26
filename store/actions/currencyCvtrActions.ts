import { call, put, select } from 'redux-saga/effects';
import * as actions from './actionTypes';
import { makeActionCreator, makeAsyncActionCreator } from './actionTypes';
import { fetchData } from '../../utils';
import {
  CurrencyConvertRes,
  AbokiRatesRes,
  CvtrState,
  AbokiRatesResponseProps,
  CryptoCurrencyConvertRes,
} from '../../models/CurrenctCvtr';

export const CurrencyCtvrActions = makeActionCreator(actions.EDIT_CTVR);
export const GetAbokiRatesAsync = makeAsyncActionCreator(
  actions.GET_ABOKI_RATES_ASYNC
);
export const CurrencyConverterAsync = makeAsyncActionCreator(
  actions.CONVERT_CURRENCY_ASYNC
);
export const CryptoCurrencyConverterAsync = makeAsyncActionCreator(
  actions.CONVERT_CRYPTO_CURRENCY_ASYNC
);

export function* CryptoCurrencyConverterSaga({ payload, cb }) {
  const { cryptoCurrencyConversion }: CvtrState = yield select(
    (state) => state.cvtr
  );
  if (!payload?.convert) yield call(cb, cryptoCurrencyConversion);
  const { error, data } = yield call(fetchData, {
    path: `Crypto/Rates?currency=${payload.currency}`,
    host: process.env.PAY_SERVER,
    model: CryptoCurrencyConvertRes,
    method: 'GET',
  });

  if (data) {
    yield put(
      CurrencyCtvrActions({
        cryptoCurrencyConversion: data,
      })
    );
    if (payload?.convert) yield call(cb, data);
  } else {
    yield put(
      CurrencyCtvrActions({
        cryptoCurrencyConversion: {},
        message: error.message,
      })
    );
    if (payload?.convert) yield call(cb, null);
  }
}

export function* CurrencyConverterSaga({ payload, cb }) {
  const { error, data } = yield call(fetchData, {
    path: `Payment/FLW/rates?to=${payload.to}&from=${payload.from}&amount=${payload.amount}`,
    host: process.env.PAY_SERVER,
    model: CurrencyConvertRes,
    method: 'GET',
  });

  if (data) {
    yield put(
      CurrencyCtvrActions({
        currencyConversion: data,
      })
    );
    yield call(cb, data);
  } else {
    yield put(
      CurrencyCtvrActions({
        currencyConversion: {},
        message: error.message,
      })
    );
    yield call(cb, null);
  }
}

export function* GetAbokiRatesSaga({ cb }) {
  const { abokiConversion }: CvtrState = yield select((state) => state.cvtr);
  if (abokiConversion) yield call(cb, abokiConversion);
  const { error, data } = yield call(fetchData, {
    path: 'Payment/rates?page=0',
    host: process.env.PAY_SERVER,
    model: AbokiRatesRes,
    method: 'GET',
  });

  if (data) {
    if (!abokiConversion) yield call(cb, data);
    yield put(
      CurrencyCtvrActions({
        abokiConversion: data,
      } as CvtrState)
    );
  } else {
    yield call(cb, null);
    yield put(
      CurrencyCtvrActions({
        abokiConversion: [] as AbokiRatesResponseProps[],
        message: error.message,
      })
    );
  }
}
