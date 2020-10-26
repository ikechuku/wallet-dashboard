import React from 'react';
import { LinearProgress, Box } from '@material-ui/core';
import Logo from '../Logo';

const Loader = () => {
  return (
    <Box alignItems="center" display="flex" flexDirection="column">
      <Logo css="margin-left: -1rem;" />
      <LinearProgress color="secondary" css="width:100%;" />
    </Box>
  );
};

export default Loader;
