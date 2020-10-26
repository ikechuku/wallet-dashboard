import * as React from 'react';
import TransferPending from '../../components/templates/Transfer/TransferPending';
import PrivateRoute from '../../components/shared/PrivateRoute';

const TransferPendingPage = () => {
  return <PrivateRoute Component={() => <TransferPending />} />;
};

export default TransferPendingPage;
