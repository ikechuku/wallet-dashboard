import React from 'react';
import ForgotPassTemplate from '../../components/templates/Auth/ForgotPass';
import PublicRoute from '../../components/shared/PublicRoute';
import Onboading from '../../components/templates/Auth/Onboading';

const ForgotPassword = () => (
  <PublicRoute
    Component={() => (
      <Onboading>
        <ForgotPassTemplate />
      </Onboading>
    )}
  />
);

export default ForgotPassword;
