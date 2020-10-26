import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Image } from '../atoms';

const CountryFlag = ({ flag, countryCode }) => {
  const [image, setImage] = React.useState(true);
  return image ? (
    <Image
      alt="country flag"
      src={flag}
      width="1.5rem"
      height="1.2rem"
      params={{ onError: () => setImage(false) }}
    />
  ) : (
    <ReactCountryFlag
      countryCode={countryCode}
      svg
      style={{
        width: '1.5em',
        height: '1.5em',
        borderRadius: '2em',
      }}
      title={countryCode}
    />
  );
};

export default CountryFlag;
