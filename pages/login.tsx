import React from 'react';
import PublicRoute from '../components/shared/PublicRoute';
import Onboading from '../components/templates/Auth/Onboading';
import LoginFormPage from '../components/templates/Auth/Login';

const Login = () => {
  return (
    <PublicRoute
      Component={() => (
        <Onboading>
          <LoginFormPage />
        </Onboading>
      )}
    />
  );
};
export default Login;
