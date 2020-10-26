import { call, put } from 'redux-saga/effects';
import * as actions from './actionTypes';
import { makeActionCreator, makeAsyncActionCreator } from './actionTypes';
import { BankListRes, BVNValidationRes } from '../../models/BankDetails';
import {
  AccountDetailsRes,
  AccountValidationReq,
} from '../../models/AccountDetails';
import { fetchData, bvnValidationMock } from '../../utils';
import { TransferActions } from './tranferActions';

export const BankActions = makeActionCreator(actions.EDIT_BANK);
export const GetBanksAsync = makeAsyncActionCreator(actions.GET_BANKS_ASYNC);
export const AccountDetailsAsync = makeAsyncActionCreator(
  actions.ACCOUNT_DETAILS_ASYNC
);
export const BVNDetailsAsync = makeAsyncActionCreator(
  actions.BVN_DETAILS_ASYNC
);

export function* GetBVNDetailsSaga({ payload, cb }) {
  let error;
  let data;
  if (payload === '11111111111') data = BVNValidationRes(bvnValidationMock);
  else if (payload === '00000000000') {
    error = {};
  } else {
    const { error: err, data: dt } = yield call(fetchData, {
      path: `Payment/paystack/bvn/${payload}`,
      method: 'GET',
      host: process.env.PAY_SERVER,
      model: BVNValidationRes,
    });
    error = err;
    data = dt;
  }

  if (data) {
    yield call(cb, data);
  } else {
    yield put(
      BankActions({
        errors: error.errors,
        message: 'Unable to resolve BVN',
      })
    );
    yield call(cb, null);
  }
}

export function* GetBanksSaga({ payload, cb }) {
  const { error, data } = yield call(fetchData, {
    path: `Payment/GetBanks/${payload}`,
    method: 'GET',
    host: process.env.PAY_SERVER,
    model: BankListRes,
  });

  if (data) {
    yield put(
      BankActions({
        banks: data,
      })
    );
    yield call(cb, data);
  } else {
    yield put(
      BankActions({
        banks: [],
        message: error.message,
      })
    );
    yield call(cb, null);
  }
}

const chooseUrl = (payload) => {
  return {
    GB: 'Payment/ValidateUKAccount',
    NG: 'Payment/GetAccountDetails',
  }[payload.country];
};

export function* AccountDetailsSaga({ payload, cb }) {
  yield put(BankActions({ isLoading: true, accountDetails: {} }));
  yield put(TransferActions({ accountDetails: null }));

  const { error, data } = yield call(fetchData, {
    path: chooseUrl(payload),
    method: 'POST',
    host: process.env.PAY_SERVER,
    payload: AccountValidationReq(payload),
    model: AccountDetailsRes,
    extra: { country: payload.country },
  });

  if (data && data.accountNumber) {
    yield put(
      BankActions({
        accountDetails: data /* payload.country === 'NG' ? data : ukMockData */,
      })
    );
    yield call(cb, data /* payload.country === 'NG' ? data : ukMockData */);
  } else {
    yield put(
      BankActions({
        accountDetails: {},
        message: error?.message ?? 'Account Validation Failed',
        errors: error?.errors,
      })
    );
    yield call(cb, null);
  }
}
