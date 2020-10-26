import { call, put } from 'redux-saga/effects';
import * as actions from './actionTypes';
import { makeActionCreator, makeAsyncActionCreator } from './actionTypes';
import { fetchData } from '../../utils';
import {
  RequestTokenReq,
  RequestTokenReqProps,
  RequestTokenRes,
  ValidateTokenReqProps,
  ValidateTokenReq,
  ValidateTokenRes,
} from '../../models/Otp';
import { FeatureType } from '../../utils/enums';
import { PassResetActions } from './passResetActions';
import { AuthActions, VerifyEmailSaga } from './authActions';
import { AuthState } from '../../models/Auth';

export const OTPActions = makeActionCreator(actions.EDIT_OTP);
export const ValidateTokenAsync = makeAsyncActionCreator(
  actions.VALIDATE_RESET_TOKEN_ASYNC
);
export const RequestOTPAsync = makeAsyncActionCreator(actions.REQUEST_OTP);

export function* RequestOTPSaga({ payload, cb }) {
  yield put(AuthActions({ isLoading: true, isEmailVerifySent: false }));
  const { data, error } = yield call(fetchData, {
    method: 'POST',
    path: 'Auth/RequestOTP',
    payload: RequestTokenReq(payload as RequestTokenReqProps),
    model: RequestTokenRes,
  });

  if (data) {
    if (payload.feature === FeatureType.VERIFY_EMAIL) {
      yield call(cb, true);
      yield put(
        AuthActions({
          message: 'Verification OTP sent successfully to Your Email',
          isEmailVerifySent: true,
        } as AuthState)
      );
    }
  } else {
    if (payload.feature === FeatureType.VERIFY_EMAIL) {
      yield put(
        AuthActions({
          isEmailVerifySent: false,
          errors: error.errors,
          message: error.message,
        } as AuthState)
      );
    }
    yield call(cb, null);
  }
}

export function* ValidateTokenSaga({ payload, cb }) {
  yield put(
    PassResetActions({
      isLoading: true,
      isResetLinkSent: false,
      isPasswordReset: false,
    })
  );
  yield put(
    AuthActions({
      isLoading: true,
      isEmailVerifySent: false,
      isEmailVerified: false,
    } as AuthState)
  );
  const { data, error } = yield call(fetchData, {
    method: 'POST',
    path: 'Auth/ValidateOTP',
    payload: ValidateTokenReq(payload as ValidateTokenReqProps),
    model: ValidateTokenRes,
  });

  if (data) {
    if (payload.feature === FeatureType.VERIFY_EMAIL) {
      yield call(VerifyEmailSaga, {
        payload: {
          email: payload.email,
          verificationToken: data.data,
        },
        cb,
      });
    } else if (payload.feature === FeatureType.PASS_RESET) {
      yield put(
        PassResetActions({
          resetToken: data.data,
          message: data.message,
        })
      );
    }
    yield call(cb, data.data);
  } else {
    if (payload.feature === FeatureType.VERIFY_EMAIL) {
      yield put(
        AuthActions({
          errors: error.errors,
          message: 'Reset Token is invalid or has expired',
        } as AuthState)
      );
    } else if (payload.feature === FeatureType.PASS_RESET) {
      yield put(
        PassResetActions({
          resetToken: null,
          errors: error.errors,
          message: 'Reset Token is invalid or has expired',
        })
      );
    }
    yield call(cb, null);
  }
}
