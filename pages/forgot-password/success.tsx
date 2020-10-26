import React from 'react';
import ResetPassSuccess from '../../components/templates/Auth/ResetPassSuccess';
import PublicRoute from '../../components/shared/PublicRoute';
import Onboading from '../../components/templates/Auth/Onboading';

const SetPassword = () => (
  <PublicRoute
    Component={() => (
      <Onboading>
        <ResetPassSuccess />
      </Onboading>
    )}
  />
);

export default SetPassword;
