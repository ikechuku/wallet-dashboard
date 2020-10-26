import { call, put } from 'redux-saga/effects';
import * as actions from './actionTypes';
import { makeActionCreator, makeAsyncActionCreator } from './actionTypes';
import { fetchData } from '../../utils';
import {
  RecipientsRes,
  RecipientState,
  CreateRecipientsRes,
  CreateRecipientReq,
} from '../../models/RecipientDetails';

export const RecipientActions = makeActionCreator(actions.EDIT_RECIPIENT);
export const GetMyselfRecipientsAsync = makeAsyncActionCreator(
  actions.GET_MYSELF_RECIPIENT_ASYNC
);
export const GetOthersRecipientsAsync = makeAsyncActionCreator(
  actions.GET_OTHERS_RECIPIENT_ASYNC
);
export const DeleteRecipientsAsync = makeAsyncActionCreator(
  actions.DELETE_RECIPIENT_ASYNC
);

export function* GetMyselfRecipientsSaga({ cb, payload = 1 }) {
  yield put(RecipientActions({ myselfList: null } as RecipientState));
  const { error, data } = yield call(fetchData, {
    path: `Account/Recipients/Search?tag=myself&page=${payload}&pageSize=5`,
    method: 'GET',
    host: process.env.PAY_SERVER,
    model: RecipientsRes,
  });

  if (data) {
    yield put(RecipientActions({ myselfList: data } as RecipientState));
    yield call(cb, data);
  } else {
    yield put(
      RecipientActions({
        myselfList: {},
        message: error.message,
      } as RecipientState)
    );
    yield call(cb, null);
  }
}

export function* GetOthersRecipientsSaga({ cb, payload = 1 }) {
  yield put(RecipientActions({ othersList: null } as RecipientState));
  const { error, data } = yield call(fetchData, {
    path: `Account/Recipients/Search?tag=someoneelse&page=${payload}&pageSize=5`,
    method: 'GET',
    host: process.env.PAY_SERVER,
    model: RecipientsRes,
  });

  if (data) {
    yield put(RecipientActions({ othersList: data } as RecipientState));
    yield call(cb, data);
  } else {
    yield put(
      RecipientActions({
        othersList: {},
        message: error.message,
      } as RecipientState)
    );
    yield call(cb, null);
  }
}

export function* DeleteRecipientsSaga({ cb, payload }) {
  yield put(
    RecipientActions(
      payload.tag === 'myself'
        ? { myselfList: null }
        : ({ othersList: null } as RecipientState)
    )
  );
  const { error, data } = yield call(fetchData, {
    path: `Account/Recipients/Delete?id=${payload.id}`,
    method: 'GET',
    host: process.env.PAY_SERVER,
    model: (resp) => ({
      success: resp,
    }),
  });

  if (data) {
    yield call(cb, data);
  } else {
    yield call(cb, null);
    yield put(
      RecipientActions({
        errors: error.errors,
        message: error.message,
      } as RecipientState)
    );
  }
}

export const CreateRecipientsAsync = makeAsyncActionCreator(
  actions.CREATE_RECIPIENT_ASYNC
);

export function* CreateRecipientsSaga({ cb, payload }) {
  yield put(RecipientActions({ isLoading: true }));
  const { error, data } = yield call(fetchData, {
    path: `Account/Recipients/Create`,
    method: 'POST',
    payload: CreateRecipientReq(payload),
    host: process.env.PAY_SERVER,
    model: CreateRecipientsRes,
  });

  if (data) {
    yield call(cb, data);
    yield put(
      RecipientActions({
        message: 'Recipient Created Successfully',
      } as RecipientState)
    );
    yield put(
      payload.tag === 'myself'
        ? GetMyselfRecipientsAsync()
        : GetOthersRecipientsAsync()
    );
  } else {
    yield call(cb, null);
    yield put(
      RecipientActions({
        errors: error.errors,
        message: error.message,
      } as RecipientState)
    );
  }
}
