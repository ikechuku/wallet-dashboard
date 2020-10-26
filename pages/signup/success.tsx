import React from 'react';
import Success from '../../components/templates/Auth/SignupSuccess';
import PrivateRoute from '../../components/shared/PrivateRoute';

const SignUpSuccess = () => <PrivateRoute Component={() => <Success />} />;

export default SignUpSuccess;
