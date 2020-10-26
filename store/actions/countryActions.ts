import { call, put } from 'redux-saga/effects';
import * as actions from './actionTypes';
import { makeAsyncActionCreator, makeActionCreator } from './actionTypes';
import { fetchData } from '../../utils';
import { CountriesListRes, CurrencyListRes } from '../../models/Countries';

export const CountriesActions = makeActionCreator(actions.EDIT_COUNTRY);

export const GetCountriesAsync = makeAsyncActionCreator(
  actions.GET_COUNTRIES_ASYNC
);

export function* GetCountriesSaga({ cb }) {
  const { error, data } = yield call(fetchData, {
    path: `Countries/Search?page=0`,
    method: 'GET',
    model: CountriesListRes,
  });

  if (data) {
    yield put(
      CountriesActions({
        countries: data,
      })
    );
    yield call(cb, data);
  } else {
    yield put(
      CountriesActions({
        countries: [],
        errors: error.errors,
        message: error.message,
      })
    );
    yield call(cb, null);
  }
}

export const GetCryptoCurrencyAsync = makeAsyncActionCreator(
  actions.GET_CRYPTO_CURRENCY_ASYNC
);

export function* GetCryptoCurrencySaga({ cb }) {
  const { error, data } = yield call(fetchData, {
    path: `System/CryptoCurrencies/Search?page=0`,
    host: process.env.PAY_SERVER,
    method: 'GET',
    model: CurrencyListRes,
  });
  if (data) {
    yield put(
      CountriesActions({
        currencies: data,
      })
    );
    yield call(cb, data);
  } else {
    yield put(
      CountriesActions({
        currencies: [],
        errors: error.errors,
        message: error.message,
      })
    );
    yield call(cb, null);
  }
}
