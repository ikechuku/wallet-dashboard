import * as React from 'react';
import Router from 'next/router';
import { Box, useTheme } from '@material-ui/core';
import { SuccessStyle } from './styles';
import Text from '../../atoms/Text';
import Image from '../../atoms/Image';
import Button from '../../atoms/Button';
import Assets from '../../../utils/assets';
import SimpleNav from '../../molecule/Nav';

const ResetPassSuccess = () => {
  const { SUCCESS_ICON } = Assets;
  const theme = useTheme();
  return (
    <SuccessStyle className="form-hd">
      <SimpleNav
        show={['lg', 'md', 'xl']}
        pop={() => {
          Router.back();
        }}
      />
      <Box className="form-con">
        <Box height="80%">
          <Box>
            <Image
              width="2.5rem"
              src={require(`../../../public${SUCCESS_ICON}`)}
              alt="image of new mail"
            />
          </Box>
          <Box
            width="100%"
            margin="2.5rem auto 1rem"
            display="flex"
            justifyContent="center"
          >
            <Text
              textAlign="center"
              variant="h2"
              color={theme.palette.primary.light}
              fontWeight="400"
              width="80%"
            >
              You are all done
            </Text>
          </Box>
          <Box margin="0 auto 2.5rem" justifyContent="center" width="100%">
            <Text color="rgba(0,0,0,.3)" textAlign="center" variant="body2">
              Your new password has been set
            </Text>
          </Box>
          <Box display="flex" justifyContent="center" width="100%">
            <Button
              className="action-btn"
              width="100%"
              onClick={() => {
                Router.replace('/login');
              }}
              bgColor={theme.palette.primary.light}
              fontWeight="300"
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Box>
    </SuccessStyle>
  );
};

export default ResetPassSuccess;
