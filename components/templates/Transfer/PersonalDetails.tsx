import { Box, useTheme } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Text } from '../../atoms';
import { EnterDetailStyle } from './styles';
import PersonalAccount from '../../forms/Transfer/PersonalAccount';
import PersonalProfile from '../../forms/Transfer/PersonalAccount/PersonalProfile';
import { TransferState } from '../../../models/Transfer';
import { AuthState } from '../../../models/Auth';

const EnterPersonalDetail = () => {
  const theme = useTheme();
  const {
    transfer,
    auth: { profile },
  }: { transfer: TransferState; auth: AuthState } = useSelector(
    (state) => state
  );

  return (
    <EnterDetailStyle>
      <Box className="header" margin="2rem auto" textAlign="center">
        <Text color={theme.palette.primary.light} variant="h6">
          Your Details
        </Text>
        <Text margin="0 auto" color="#bbb" variant="caption">
          Personal Account
        </Text>
      </Box>

      <Box alignItems="center" display="flex" flexDirection="column">
        {profile.isTransferProfile ? (
          <PersonalProfile transfer={transfer} profile={profile} />
        ) : (
          <PersonalAccount />
        )}
      </Box>
    </EnterDetailStyle>
  );
};
export default EnterPersonalDetail;
