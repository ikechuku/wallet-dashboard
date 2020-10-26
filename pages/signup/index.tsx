import React from 'react';
import SignUpTemplate from '../../components/templates/Auth/Signup';
import PublicRoute from '../../components/shared/PublicRoute';
import Onboading from '../../components/templates/Auth/Onboading';

const Signup = () => (
  <PublicRoute
    Component={() => (
      <Onboading>
        <SignUpTemplate />
      </Onboading>
    )}
  />
);
export default Signup;
