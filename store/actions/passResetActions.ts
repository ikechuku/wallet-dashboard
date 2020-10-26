import { call, put } from 'redux-saga/effects';
import * as actions from './actionTypes';
import { makeActionCreator, makeAsyncActionCreator } from './actionTypes';
import { fetchData } from '../../utils';
import {
  ForgotPassReq,
  ForgotPassRes,
  ForgotPassReqProps,
  ResetPassReq,
  ResetPassReqProps,
} from '../../models/PasswordReset';
import { AuthRes } from '../../models/Auth';
import { AuthActions } from './authActions';

export const PassResetActions = makeActionCreator(actions.EDIT_RESET);
export const ForgotPasswordAsync = makeAsyncActionCreator(
  actions.FORGOT_PASSWORD_ASYNC
);
export const ResetPasswordAsync = makeAsyncActionCreator(
  actions.RESET_PASSWORD_ASYNC
);

export function* ForgotPasswordSaga({ payload, cb }) {
  yield put(PassResetActions({ isLoading: true, isResetLinkSent: false }));

  const { data, error } = yield call(fetchData, {
    method: 'POST',
    path: 'Auth/RequestPasswordReset',
    payload: ForgotPassReq(payload as ForgotPassReqProps),
    model: ForgotPassRes,
  });

  if (data) {
    yield put(
      PassResetActions({
        isResetLinkSent: true,
        errors: null,
        message: 'Reset OTP sent successfully to Your Email',
      })
    );
    yield call(cb, data);
  } else {
    yield put(
      PassResetActions({
        errors: error.errors,
        message: error.message,
        isResetLinkSent: false,
      })
    );
    yield call(cb, null);
  }
}

export function* ResetPasswordSaga({ payload, cb }) {
  yield put(PassResetActions({ isLoading: true, isPasswordReset: false }));

  const { data, error } = yield call(fetchData, {
    method: 'POST',
    path: 'Auth/PasswordReset',
    payload: ResetPassReq(payload as ResetPassReqProps),
    model: AuthRes,
  });

  if (data) {
    yield put(
      PassResetActions({
        isPasswordReset: true,
        message: 'Password Reset Successful',
      })
    );
    yield put(AuthActions());
    yield call(cb, data);
  } else {
    yield put(
      PassResetActions({
        errors: error.errors,
        message: error.message,
        isPasswordReset: false,
      })
    );
    yield call(cb, null);
  }
}
