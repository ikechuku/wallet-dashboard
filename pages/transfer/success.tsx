import * as React from 'react';
import TransferSuccessTemplate from '../../components/templates/Transfer/TransferSuccess';
import PrivateRoute from '../../components/shared/PrivateRoute';

const TransferSuccessPage = () => {
  return <PrivateRoute Component={() => <TransferSuccessTemplate />} />;
};

export default TransferSuccessPage;
