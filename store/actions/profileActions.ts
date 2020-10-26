import { call, put, select } from 'redux-saga/effects';
import * as actions from './actionTypes';
import { makeActionCreator, makeAsyncActionCreator } from './actionTypes';
import { fetchData, updateToLocalStorage } from '../../utils';
import {
  ProfileRes,
  UpdateProfileReq,
  UpdateProfileReqProps,
  UpdateProfileRes,
} from '../../models/Profile';
import { AuthState } from '../../models/Auth';

const AuthActions = makeActionCreator(actions.EDIT_AUTH);

export const UpdateProfileAsync = makeAsyncActionCreator(
  actions.UPDATE_PROFILE_ASYNC
);

export const GetUserProfileAsync = makeAsyncActionCreator(
  actions.GET_PROFILE_ASYNC
);

export function* UpdateProfileSaga({ payload, cb }) {
  yield put(AuthActions({ isLoading: true }));

  const { profile }: AuthState = yield select((state) => state.auth);
  const { data, error } = yield call(fetchData, {
    method: 'POST',
    path: `UserProfiles/Update?id=${(payload as UpdateProfileReqProps).id}`,
    payload: UpdateProfileReq(payload as UpdateProfileReqProps),
    model: UpdateProfileRes,
  });

  if (data) {
    const updProfile = { ...data, country: profile.country };
    updateToLocalStorage({ key: 'profile', obj: updProfile });
    yield call(cb, data);
    yield put(
      AuthActions({
        profile: updProfile,
        isAuthenticated: true,
        isSettingAuth: false,
        message: 'Authentication Successful',
      } as AuthState)
    );
  } else {
    yield call(cb, null);
    yield put(
      AuthActions({
        errors: error.errors,
        message: error.message,
      })
    );
  }
}

export function* GetUserProfileSaga({ cb }) {
  const { error, data = [] } = yield call(fetchData, {
    path: `UserProfiles/Search`,
    method: 'GET',
    model: ProfileRes,
  });

  if (data.length > 0) {
    const profileData = data[0] || {};
    yield put(
      AuthActions({
        profile: profileData,
        isEmailVerified: profileData.isEmailVerified,
      })
    );
    yield call(cb, data);
  } else {
    yield put(
      AuthActions({
        errors: error.errors,
        profile: [],
        message: error.message,
      })
    );
    yield call(cb, null);
  }
}
