import * as actions from '../actions/actionTypes';
import { cards } from './initialState';

export default function (state = cards, action) {
  switch (action.type) {
    case actions.EDIT_CARD:
      return {
        ...state,
        isLoading: false,
        errors: null,
        message: null,
        ...action.payload,
      };
    default:
      return state;
  }
}
