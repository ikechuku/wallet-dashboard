import { call, put, select } from 'redux-saga/effects';
import * as actions from './actionTypes';
import { makeActionCreator, makeAsyncActionCreator } from './actionTypes';
import { fetchData, removeFromLocalStorage } from '../../utils';
import {
  CreateChargeReq,
  CryptoPaymentReq,
  CreateChargeRes,
  ValidateChargeReq,
  ValidateChargeRes,
  CreatePaymentIntentReq,
  CreatePaymentIntentRes,
  TransferState,
  VerifyTransactionReq,
  VerifyTransactionRes,
  CryptoPaymentRes,
} from '../../models/Transfer';

export const TransferActions = makeActionCreator(actions.EDIT_TRANSFER);
export const CreateChargeAsync = makeAsyncActionCreator(
  actions.CREATE_CHARGE_ASYNC
);
export const CryptoPaymentAsync = makeAsyncActionCreator(
  actions.CRYPTO_PAYMENT_ASYNC
);
export const ValidateChargeAsync = makeAsyncActionCreator(
  actions.VALIDATE_CHARGE_ASYNC
);
export const VerifyTransactionAsync = makeAsyncActionCreator(
  actions.VERIFY_TRANX_ASYNC
);
export const CreatePaymentIntentAsync = makeAsyncActionCreator(
  actions.CREATE_PAYMENT_INTENT_ASYNC
);

export function* CreateChargeSaga({ payload, cb }) {
  yield put(TransferActions({ createdCharge: null, isLoading: true }));

  const auth = yield select((state) => state.auth);
  const { data, error } = yield call(fetchData, {
    method: 'POST',
    path: 'Payment/CreateCharge',
    host: process.env.PAY_SERVER,
    payload: CreateChargeReq({ ...payload, email: auth.user.email }),
    model: CreateChargeRes,
  });

  if (data) {
    yield call(cb, data);
    yield put(
      TransferActions({
        createdCharge: data,
      })
    );
  } else {
    yield call(cb, null);
    yield put(
      TransferActions({
        createdCharge: null,
        message: error.message,
      })
    );
  }
}

export function* CryptoPaymentSaga({ payload, cb }) {
  yield put(
    TransferActions({ cryptoCharge: null, isLoading: true } as TransferState)
  );
  console.log('payload', payload);
  const { data, error } = yield call(fetchData, {
    method: 'POST',
    path: 'Crypto/InitiateCryptoPayment',
    host: process.env.PAY_SERVER,
    payload: CryptoPaymentReq(payload),
    model: CryptoPaymentRes,
    extra: payload,
  });

  if (data) {
    yield put(
      TransferActions({
        cryptoCharge: data,
        cryptoChargeReq: payload,
      } as TransferState)
    );
    yield call(cb, data);
  } else {
    console.log(error);
    yield call(cb, null);
    yield put(
      TransferActions({
        cryptoCharge: null,
        message: error.message,
        errors: error.errors,
      })
    );
  }
}

export function* ValidateChargeSaga({ payload, cb }) {
  yield put(TransferActions({ validatedCharge: null, isLoading: true }));
  const obj = yield select((state) => state.transfer);

  const { error, data } = yield call(fetchData, {
    path: 'Payment/ValidateCharge',
    method: 'POST',
    host: process.env.PAY_SERVER,
    payload: ValidateChargeReq({
      token: payload,
      flwRef: obj.createdCharge.flwRef,
    }),
    model: ValidateChargeRes,
  });

  if (data) {
    yield call(cb, data);
    yield put(
      TransferActions({
        validatedCharge: data,
      })
    );
  } else {
    yield call(cb, null);
    yield put(
      TransferActions({
        validatedCharge: null,
        message: error.message,
      })
    );
  }
}

export function* VerifyTransactionSaga({ payload, cb }) {
  yield put(
    TransferActions({
      verifyTransaction: null,
      isLoading: true,
    } as TransferState)
  );
  console.log(VerifyTransactionReq(payload));
  const { error, data } = yield call(fetchData, {
    path: 'Payment/VerifyTransaction',
    method: 'POST',
    host: process.env.PAY_SERVER,
    payload: VerifyTransactionReq(payload),
    model: VerifyTransactionRes,
  });

  if (data) {
    removeFromLocalStorage({ key: 'form' });
    yield call(cb, data);
    yield put(
      TransferActions({
        verifyTransaction: data,
      } as TransferState)
    );
  } else {
    yield call(cb, null);
    yield put(
      TransferActions({
        verifyTransacion: null,
        message: error.message,
      })
    );
  }
}

export function* CreatePaymentIntentSaga({ payload, cb }) {
  yield put(TransferActions({ stripeIntent: null, isLoading: true }));

  const { error, data } = yield call(fetchData, {
    path: `Payment/CreatePaymentIntent`,
    host: process.env.PAY_SERVER,
    method: 'POST',
    payload: CreatePaymentIntentReq(payload),
    model: CreatePaymentIntentRes,
  });

  if (data) {
    yield call(cb, data);
    yield put(TransferActions({ stripeIntent: data }));
  } else {
    yield call(cb, null);
    yield put(
      TransferActions({
        stripeIntent: null,
        message: error.message,
      })
    );
  }
}
