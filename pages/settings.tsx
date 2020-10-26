import React from 'react';
import PrivateRoute from '../components/shared/PrivateRoute';
import SettingsTemplate from '../components/templates/Settings';
import InAppNav from '../components/molecule/InAppNav';

const Settings = () => {
  return (
    <PrivateRoute
      Component={() => (
        <InAppNav selected="">
          <SettingsTemplate />
        </InAppNav>
      )}
    />
  );
};

export default Settings;
