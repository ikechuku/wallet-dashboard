import React from 'react';
import { useRouter } from 'next/router';
import PrivateRoute from '../components/shared/PrivateRoute';
import BitcoinTemplate from '../components/templates/Dashboard/Bitcoin';
import InAppNav from '../components/molecule/InAppNav';

const Bitcoin
 = () => {
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
        <InAppNav selected="Bitcoin">
          <BitcoinTemplate />
       
        </InAppNav>
      )}
    />
  );
};

export default Bitcoin
;
