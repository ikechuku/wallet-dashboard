import * as React from 'react';
import Router from 'next/router';
import { Clear } from '@material-ui/icons';
import { Box, IconButton, useTheme } from '@material-ui/core';
import Text from '../../atoms/Text';
import SuccessStyle from './style';
import { Button, Image } from '../../atoms';
import Assets from '../../../utils/assets';

const PendingTemplate = ({ className, children, btnText = 'Done' }) => {
  const { PENDING_ICON } = Assets;
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      margin="0 auto"
      padding="1rem"
      justifyContent="flex-end"
      alignItems="center"
      className={className}
    >
      <Box display="flex" width="100%" justifyContent="flex-end">
        <IconButton onClick={() => Router.replace('/dashboard')}>
          <Clear />
        </IconButton>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        flexGrow="1"
        justifyContent="flex-end"
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Text
            margin="0 0 3rem"
            color={theme.palette.primary.light}
            fontSize="1.6rem"
            variant="h6"
          >
            Transaction Pending
          </Text>
          <Image
            width="2.5rem"
            margin="2rem 0"
            src={PENDING_ICON}
            alt="pending icon"
          />
        </Box>
        {children}
      </Box>
      <Box className="submit" margin="1rem 0" width="100%">
        <Button
          padding=".6rem"
          onClick={() => Router.replace('/dashboard')}
          width="100%"
          fontWeight="300"
          bgColor={theme.palette.primary.light}
        >
          {btnText}
        </Button>
      </Box>
    </Box>
  );
};

export default SuccessStyle(PendingTemplate);
