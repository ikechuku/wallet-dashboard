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
  const { HEADER_LOGO, CRYPTO_WALLET } = Assets;
  const theme = useTheme();
  const profile: ProfileResProps = userProfile;

  return (
    <DbHeaderStyle>
      <HeaderNavigation border />
      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <Text
          variant="caption"
          margin="0 1rem 0 0"
          fontWeight="300"
          color="#fff"
        >
          Total balance
        </Text>
        {
          /* !profile?.country */ true ? (
            <Skeleton
              animation={false}
              width={150}
              height={30}
              variant="rect"
            />
          ) : (
            <Text
              fontSize="1.2rem"
              variant="body1"
              color={theme.palette.info.main}
            >
              {`${convertToCurrency(1200)} ${profile?.country?.currencyCode}`}
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
          <Hidden xsDown>
            <Box
              alignItems="center"
              color="rgba(255, 255, 255, .4)"
              display="flex"
              marginRight="1rem"
            >
              <AddCircle color="inherit" fontSize="small" />
            </Box>
          </Hidden>
          {[
            {
              title: 'Skarpa Wallet',
              image: HEADER_LOGO,
              extras: (
                <Box display="flex" justifyContent="flex-start">
                  {
                    /* !profile.country */ true ? (
                      <Skeleton
                      animation={false}
                        width={150}
                        height={30}
                        variant="rect"
                      />
                    ) : (
                      <Text fontSize="1.2rem" variant="body1" color="#fff">
                        {`${convertToCurrency(0)}  ${
                          profile?.country?.currencyCode
                        }`}
                      </Text>
                    )
                  }
                </Box>
              ),
            },
            {
              title: 'Crypto Wallet',
              image: CRYPTO_WALLET,
              extras: (
                <Box display="flex" justifyContent="flex-start">
                  <Button
                    padding=".1rem"
                    css="opacity: .4"
                    bgColor={theme.palette.primary.light}
                  >
                    <Text fontSize=".5rem" color="white" variant="caption">
                      Coming Soon
                    </Text>
                  </Button>
                </Box>
              ),
            },
          ].map((item, key) => (
            <Box
              borderRadius=".2rem"
              key={key}
              className={`header-card ${key === 0 ? 'active' : ''}`}
              bgcolor={key === 0 ? theme.palette.primary.main : '#fff'}
            >
              <Box display="flex" justifyContent="flex-start">
                <Box display="flex" marginRight=".5rem">
                  <Image
                    width="1.2rem"
                    alt="Syapa account image"
                    src={require(`../../../../public${item.image}`)}
                  />
                </Box>
                <Box display="flex">
                  <Text
                    fontSize=".8rem"
                    variant="body1"
                    color={key === 0 ? '#9DA8B6' : '#2033A0'}
                  >
                    {item.title}
                  </Text>
                </Box>
              </Box>
              {item.extras}
            </Box>
          ))}
        </Box>

        <Hidden xsDown>
          <DashboardActivities margin="0 0 0 .6rem" width="auto" />
        </Hidden>
      </Box>
    </DbHeaderStyle>
  );
};

export default DashboardHeader;
