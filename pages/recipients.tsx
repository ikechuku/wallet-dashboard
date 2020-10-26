import React from 'react';
import PrivateRoute from '../components/shared/PrivateRoute';
import RecipientTemplate from '../components/templates/Dashboard/Recipients';
import InAppNav from '../components/molecule/InAppNav';

const Recipients = () => {
  return (
    <PrivateRoute
      Component={() => (
        <InAppNav selected="Recipients">
          <RecipientTemplate />
        </InAppNav>
      )}
    />
  );
};

export default Recipients;
