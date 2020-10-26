import { call, put } from 'redux-saga/effects';
import * as actions from './actionTypes';
import { makeActionCreator, makeAsyncActionCreator } from './actionTypes';
import { CardValidationRes } from '../../models/CardDetails';
import { fetchData } from '../../utils';

export const CardActions = makeActionCreator(actions.EDIT_CARD);
export const ValidateCardAsync = makeAsyncActionCreator(
  actions.VALIDATE_CARD_ASYNC
);

export function* ValidateCardSaga({ payload, cb }) {
  const { error, data } = yield call(fetchData, {
    path: `Payment/ValidateCardBin/${String(payload).substring(0, 6)}`,
    method: 'GET',
    host: process.env.PAY_SERVER,
    model: CardValidationRes,
  });

  if (data) {
    yield put(
      CardActions({
        cardValidation: data,
      })
    );
    yield call(cb, data);
  } else {
    yield put(
      CardActions({
        cardValidation: null,
        message: error.message,
      })
    );
    yield call(cb, null);
  }
}
