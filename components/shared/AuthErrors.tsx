import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const showAlert = (condition, errors, message, AuthActions) => {
  if (!condition && (message || errors)) {
    return (
      <Alert onClose={AuthActions} severity="error">
        {message || Object.values(errors)?.[0]?.[0]}
      </Alert>
    );
  }
  if (condition) {
    return (
      <Alert onClose={AuthActions} severity="success">
        {message}
      </Alert>
    );
  }
};

export default ({ AuthActions, condition, errors, message }) => (
  <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={
      !(message === null && errors === null) || (condition && message != null)
    }
    autoHideDuration={6000}
    onClose={AuthActions}
  >
    {showAlert(condition, errors, message, AuthActions)}
  </Snackbar>
);
