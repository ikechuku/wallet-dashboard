import { call, put, select } from 'redux-saga/effects';
import * as actions from './actionTypes';
import { makeActionCreator, makeAsyncActionCreator } from './actionTypes';
import { TransactionsRes } from '../../models/Transaction';
import { AuthActions } from './authActions';
import { fetchData, saveToLocalStorage } from '../../utils';
import { GetCountriesSaga } from './countryActions';
import { TransferActions } from './tranferActions';
import { transfer, currencycvtr, banks } from '../reducers/initialState';
import { CurrencyCtvrActions } from './currencyCvtrActions';
import { BankActions } from './bankActions';

export const ToggleDrawer = makeAsyncActionCreator(actions.TOGGLE_DRAWER);
export const DashBoardActions = makeActionCreator(actions.EDIT_DASHBOARD);
export const GetTransactionsAsync = makeAsyncActionCreator(
  actions.GET_TRANS_ASYNC
);

export function* GetTransactionsSaga({ payload = 1, cb }) {
  yield put(DashBoardActions({ isLoading: true }));
  const { data } = yield call(fetchData, {
    method: 'GET',
    host: process.env.PAY_SERVER,
    path: `System/TransactionHistories/User/GetAllTransactions?sort=-createdat&page=${payload}&pageSize=5`,
    model: TransactionsRes,
  });

  if (data) {
    yield put(
      DashBoardActions({
        transactions: data,
      })
    );
    yield call(cb, data);
  } else {
    yield put(
      DashBoardActions({
        transactions: {},
      })
    );
    yield call(cb, null);
  }
}

export const SetUpDashboardAsync = makeAsyncActionCreator(
  actions.SETUP_DASHBOARD_ASYNC
);

export function* SetUpDashboardSaga({ cb }) {
  yield put(DashBoardActions({ isLoading: true }));
  yield put(TransferActions(transfer));
  yield put(CurrencyCtvrActions(currencycvtr));
  yield put(BankActions(banks));
  yield call(GetTransactionsSaga, GetTransactionsAsync());
  yield call(GetCountriesSaga, { cb: (_) => _ });
  /* mustapha will attend to this */
  const { auth, countries = [] } = yield select((state) => ({
    auth: state.auth,
    countries: state.countries.countries,
  }));
  const country = countries.find((ctry) => ctry.id === auth.profile?.countryId);
  auth.profile.country = country;
  const user = {
    ...auth.user,
    profile: auth.profile,
  };
  yield put(
    AuthActions({
      profile: auth.profile,
      isEmailVerified: auth.profile?.isEmailVerified,
    })
  );

  saveToLocalStorage({ obj: user, key: 'user', isJson: true });
  yield put(DashBoardActions({ isLoading: false }));
  yield call(cb);
}
