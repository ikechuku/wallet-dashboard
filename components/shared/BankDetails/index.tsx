import React from 'react';
import Nigeria from './Nigeria';
import UnitedKingdom from './UnitedKingdom';

export default (props) => {
  const Component = {
    NG: Nigeria,
    GB: UnitedKingdom,
  }[props?.values?.recipientCountry || 'NG'];

  return <Component {...props} />;
};
