import React from 'react';
import { useRouter } from 'next/router';
import PrivateRoute from '../components/shared/PrivateRoute';
import EthereumTemplate from '../components/templates/Dashboard/Ethereum';
import InAppNav from '../components/molecule/InAppNav';

const Ethereum = () => {
  const Router = useRouter();
  React.useEffect(() => {
    Router.prefetch('/transfer');
    Router.prefetch('/wallet');
    Router.prefetch('/bitcoin');
    Router.prefetch('/bitcoin-cash');
    Router.prefetch('/ethereum');
    Router.prefetch('/profile');
    Router.prefetch('/recipients');
    Router.prefetch('/transfer/success');
  }, []);

  return (
    <PrivateRoute
      Component={() => (
        <InAppNav selected="Ethereum">
          <EthereumTemplate />
       
        </InAppNav>
      )}
    />
  );
};

export default Ethereum;
