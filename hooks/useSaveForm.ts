import React from 'react';
import { updateToLocalStorage, emptyObj } from '../utils';
import { EDIT_TRANSFER } from '../store/actions/actionTypes';
import { TransferState } from '../models/Transfer';

export default function useSaveForm({ route, obj }) {
  React.useEffect(() => {
    if (emptyObj((obj as TransferState).form) || route === undefined) return;
    updateToLocalStorage({
      obj: { state: obj, action: EDIT_TRANSFER },
      parent: 'user',
      key: 'form',
    });
  }, [route]);
}
