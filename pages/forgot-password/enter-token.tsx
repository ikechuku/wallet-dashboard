import React from 'react';
import EnterTokenTemplate from '../../components/templates/Auth/ResetPassOtp';
import PublicRoute from '../../components/shared/PublicRoute';
import Onboading from '../../components/templates/Auth/Onboading';

const EnterToken = () => (
  <PublicRoute
    Component={() => (
      <Onboading>
        <EnterTokenTemplate />
      </Onboading>
    )}
  />
);
export default EnterToken;
