import React from 'react';
import { Box } from '@material-ui/core';
import MyAccounts from './MyAccounts';

const SettingsMap = ({ selected }) => {
  return (
    {
      'My accounts': <MyAccounts />,
    }[selected] ?? <Box />
  );
};

export default SettingsMap;
