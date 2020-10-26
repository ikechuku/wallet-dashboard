import { Box, useTheme } from '@material-ui/core';
import React from 'react';
import { Text } from '../../atoms';
import { BusinessOwnerStyle } from './styles';
import BusinessShareholderForm from '../../forms/Transfer/BusinessOwner';

const BusinessOwners = () => {
  const shareholder = {
    firstName: '',
    lastName: '',
    dob: { day: '', month: 'jan', year: '' },
    country: 'GB',
  };
  const [shareholders, setShareholders] = React.useState([shareholder]);
  const theme = useTheme();

  return (
    <BusinessOwnerStyle>
      <Box className="header" margin="2rem auto" textAlign="center">
        <Text
          margin="0 auto"
          color={theme.palette.primary.light}
          fontSize="1.5rem"
          variant="h6"
        >
          Confirm your business owners
        </Text>
        <Text margin="0 auto" color="#bbb" variant="caption">
          Please Confirm these details from Companies House. If anyone else
          controls more than 25% of your business, add them below
        </Text>
      </Box>
      <BusinessShareholderForm
        shareholders={shareholders}
        setShareholders={setShareholders}
        shareholder={shareholder}
      />
    </BusinessOwnerStyle>
  );
};
export default BusinessOwners;
