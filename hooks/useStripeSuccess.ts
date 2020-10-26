import React from 'react';

export default function useStripeSuccess(param) {
  const { setPayProcess, form } = param;
  React.useEffect(() => {
    if (form.fromCountry !== 'GB') return;
    setPayProcess(true);
  }, []);
}
