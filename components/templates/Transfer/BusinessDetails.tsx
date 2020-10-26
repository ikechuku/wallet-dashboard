import { Box, useTheme } from '@material-ui/core';
import React from 'react';
import { Text } from '../../atoms';
import { EnterDetailStyle } from './styles';
import BusinessAccount from '../../forms/Transfer/BusinessAccount';

const EnterBusinessDetail = () => {
  const theme = useTheme();

  return (
    <EnterDetailStyle>
      <Box className="header" margin="2rem auto" textAlign="center">
        <Text color={theme.palette.primary.light} variant="h6">
          Your Details
        </Text>
        <Text margin="0 auto" color="#bbb" variant="caption">
          Business Account
        </Text>
      </Box>

      <Box alignItems="center" display="flex" flexDirection="column">
        <BusinessAccount />
      </Box>
    </EnterDetailStyle>
  );
};
export default EnterBusinessDetail;
