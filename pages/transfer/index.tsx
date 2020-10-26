import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PrivateRoute from '../../components/shared/PrivateRoute';
import TranferTemplate from '../../components/templates/Transfer';

const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY);

const Transfer = () => {
  return (
    <PrivateRoute
      Component={() => (
        <Elements stripe={stripePromise}>
          <TranferTemplate />
        </Elements>
      )}
    />
  );
};
export default Transfer;
