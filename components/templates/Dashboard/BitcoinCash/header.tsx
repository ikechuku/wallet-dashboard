import * as React from 'react';
import { Box, Hidden, useTheme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { AddCircle } from '@material-ui/icons';
import { Button, Image, Text } from '../../../atoms';
import { DbHeaderStyle } from './styles';
import Assets from '../../../../utils/assets';
import DashboardActivities from './dashboardActivies';
import { convertToCurrency } from '../../../../utils';
import { ProfileResProps } from '../../../../models/Profile';
import HeaderNavigation from '../../../organism/HeaderNavigation';

const DashboardHeader = ({ profile: userProfile }) => {
  // const { HEADER_LOGO, CRYPTO_WALLET } = Assets;
  const theme = useTheme();
  const profile: ProfileResProps = userProfile;

  return (
    <DbHeaderStyle>
      <HeaderNavigation border title='Wallet' />
      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        justifyContent="flex-start"
      >
       
        {
          /* !profile?.country */ false ? (
            <Skeleton
              animation={false}
              width={150}
              height={30}
              variant="rect"
            />
          ) : (
            <Text
              fontSize="1.4rem"
              variant="body1"
              color={"white"}
            >
              0.8232123 BTC
            </Text>
          )
        }
      </Box>
      <Box
        display="flex"
        flexGrow="1"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Box flexGrow="1" display="flex" alignItems="center">
          
                <Button
                    padding=".4rem .8rem"
                    bgColor="#8DC351"
                  >
                    <Text fontSize="1.0rem" color="white" variant="caption">
                     Receive
                    </Text>
                  </Button>
                <Button
                    padding=".4rem .8rem"
                    border="solid #F9FAFC 1px"
                    margin="0px 0px 0px .9rem"
                    bgColor="transparent"
                  >
                    <Text fontSize="1.0rem" color="white" variant="caption">
                    Widthdraw
                    </Text>
                  </Button>
                
       
        </Box>

        <Hidden xsDown>
          <DashboardActivities margin="0 0 0 .6rem" width="auto" />
        </Hidden>
      </Box>
   
    </DbHeaderStyle>
  );
};

export default DashboardHeader;
