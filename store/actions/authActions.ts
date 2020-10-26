import { call, put, select } from 'redux-saga/effects';
import * as actions from './actionTypes';
import { makeActionCreator, makeAsyncActionCreator } from './actionTypes';
import {
  saveToLocalStorage,
  getLocalStorage,
  clearLocalStorage,
  setAuthToken,
  fetchData,
} from '../../utils';
import {
  VerifyEmailReq,
  VerifyEmailRes,
  AuthRes,
  SignUpReq,
  LoginReq,
  SignUpReqProps,
  LoginReqProps,
  VerifyEmailReqProps,
} from '../../models/Auth';
import { auth as initialAuth } from '../reducers/initialState';
import { GetUserProfileSaga } from './profileActions';
import { TransferState } from '../../models/Transfer';

export const AuthActions = makeActionCreator(actions.EDIT_AUTH);
export const VerifyEmailAsync = makeAsyncActionCreator(
  actions.VERIFY_EMAIL_TOKEN_ASYNC
);
export const SignUpAsync = makeAsyncActionCreator(actions.SIGN_UP_ASYNC);
export const LogInAsync = makeAsyncActionCreator(actions.LOG_IN_ASYNC);
export const GetUserAsync = makeAsyncActionCreator(actions.GET_USER_ASYNC);
export const SignOutAsync = makeAsyncActionCreator(actions.SIGN_OUT_ASYNC);

export function* GetUserSaga() {
  const user = getLocalStorage({ key: 'user', isJson: true });

  setAuthToken(user ? user.token : null);
  if (user) {
    if (user.form) {
      const { state, action } = user?.form;
      yield put({
        type: action,
        payload: {
          /* accountDetails: state.accountDetails,
          createdCharge: state.createdCharge,
          cryptoCharge: state.cryptoCharge,
          cryptoChargeReq: state.cryptoChargeReq,
          form: state.form,
          stripeIntent: state.stripeIntent,
          stripeMethod: state.stripeMethod,
          validatedCharge: state.validatedCharge,
          verifyTransaction: state.verifyTransaction, */
          ...state,
        } as TransferState,
      });
    }
    yield call(GetUserProfileSaga, { cb: (_) => _ });
    const { profile: freshProfile = {} } = yield select((state) => state.auth);

    const { profile: staleProfile = {}, ...auth } = user;
    freshProfile.country = staleProfile.country;
    yield put(
      AuthActions({
        user: auth,
        isEmailVerified: freshProfile.id
          ? freshProfile.isEmailVerified
          : staleProfile.isEmailVerified,
        isSettingAuth: false,
        isAuthenticated: true,
        profile: freshProfile.id ? freshProfile : staleProfile,
      })
    );
  } else {
    yield put(
      AuthActions({
        user: null,
        isSettingAuth: false,
        isAuthenticated: false,
      })
    );
  }
}

export function* SignOutSaga() {
  yield put(AuthActions({ isLoading: true }));
  clearLocalStorage({ key: 'user' });
  setAuthToken();
  yield put(AuthActions({ ...initialAuth, isSettingAuth: false }));
}

export function* VerifyEmailSaga({ payload, cb }) {
  yield put(AuthActions({ isLoading: true }));
  const auth = yield select((state) => state.auth);

  const { data, error } = yield call(fetchData, {
    method: 'POST',
    path: 'Auth/VerifyEmail',
    payload: VerifyEmailReq({
      ...payload,
      email: auth.user.email,
    } as VerifyEmailReqProps),
    model: VerifyEmailRes,
  });

  if (data) {
    yield call(GetUserProfileSaga, { cb: (_) => _ });
    const user = { ...auth.user, ...data };

    saveToLocalStorage({ obj: user, key: 'user', isJson: true });

    yield put(
      AuthActions({
        user,
        isEmailVerified: true,
        profile: { ...auth.profile, isEmailVerified: true },
        message: 'Email Verified Successfully',
      })
    );
    yield call(cb, data);
  } else {
    yield put(
      AuthActions({
        errors: error.errors,
        message: error.message,
      })
    );
    yield call(cb, null);
  }
}

export function* SignUpSaga({ payload, cb }) {
  yield put(AuthActions({ isLoading: true }));
  const { data, error } = yield call(fetchData, {
    method: 'POST',
    path: 'Auth/Signup',
    payload: SignUpReq(payload as SignUpReqProps),
    model: AuthRes,
  });

  if (data) {
    const user = { ...data, email: payload.email };
    saveToLocalStorage({ obj: user, key: 'user', isJson: true });
    setAuthToken(data.token);
    yield put(
      AuthActions({
        user,
        isAuthenticated: true,
        isSettingAuth: false,
        message: 'Authentication Successful',
      })
    );
    yield call(cb, data);
  } else {
    yield put(
      AuthActions({
        errors: error.errors,
        message: error.message,
        user: null,
        isAuthenticated: false,
      })
    );
    yield call(cb, null);
  }
}

export function* LogInSaga({ payload, cb }) {
  yield put(AuthActions({ isLoading: true }));

  const { data, error } = yield call(fetchData, {
    method: 'POST',
    path: 'Auth/Login',
    payload: LoginReq(payload as LoginReqProps),
    model: AuthRes,
  });

  if (data) {
    const user = { ...data, email: payload.email };
    saveToLocalStorage({ obj: user, key: 'user', isJson: true });
    setAuthToken(data.token);
    yield put(
      AuthActions({
        user,
        isAuthenticated: true,
        isSettingAuth: false,
        errors: null,
        message: 'Authentication Successful',
      })
    );
    yield call(cb, data);
  } else if (error) {
    yield put(
      AuthActions({
        errors: error.errors,
        message: error.message,
        user: null,
        isAuthenticated: false,
      })
    );
    yield call(cb, null);
  }
}
