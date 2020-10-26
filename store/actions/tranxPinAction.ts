import { call, put } from 'redux-saga/effects';
import * as actions from './actionTypes';
import { makeAsyncActionCreator } from './actionTypes';
import { fetchData } from '../../utils';
import { SetPinRes, PinReq, ValidatePinRes } from '../../models/TranxPin';
import { AuthActions } from './authActions';

export const CreatePinAsync = makeAsyncActionCreator(actions.CREATE_PIN_ASYNC);

export function* CreatePinSaga({ payload, cb }) {
  const { error, data } = yield call(fetchData, {
    path: `System/UserPins/Create`,
    method: 'POST',
    payload: PinReq(payload),
    host: process.env.PAY_SERVER,
    model: SetPinRes,
  });

  if (data) {
    yield call(cb, data);
  } else {
    yield call(cb, null);
    yield put(
      AuthActions({
        message: error.message,
      })
    );
  }
}

export const UpdatePinAsync = makeAsyncActionCreator(actions.UPDATE_PIN_ASYNC);

export function* UpdatePinSaga({ payload, cb }) {
  const { error, data } = yield call(fetchData, {
    path: `System/UserPins/Update`,
    method: 'POST',
    payload: PinReq(payload),
    host: process.env.PAY_SERVER,
    model: SetPinRes,
  });

  if (data) {
    yield call(cb, data);
  } else {
    yield call(cb, null);
    yield put(
      AuthActions({
        message: error.message,
      })
    );
  }
}

export const ValidatePinAsync = makeAsyncActionCreator(
  actions.VALIDATE_PIN_ASYNC
);

export function* ValidatePinSaga({ payload, cb }) {
  const { error, data } = yield call(fetchData, {
    path: `System/UserPins/Validate`,
    method: 'POST',
    payload: PinReq(payload),
    host: process.env.PAY_SERVER,
    model: ValidatePinRes,
  });

  if (data) {
    yield call(cb, data);
  } else {
    yield call(cb, null);
    yield put(
      AuthActions({
        message: error.message,
      })
    );
  }
}
