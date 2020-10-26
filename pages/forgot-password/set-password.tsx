import React from 'react';
import SetPasswordTemplate from '../../components/templates/Auth/ResetPass';
import PublicRoute from '../../components/shared/PublicRoute';
import Onboading from '../../components/templates/Auth/Onboading';

const SetPassword = () => (
  <PublicRoute
    Component={() => (
      <Onboading>
        <SetPasswordTemplate />
      </Onboading>
    )}
  />
);

export default SetPassword;
