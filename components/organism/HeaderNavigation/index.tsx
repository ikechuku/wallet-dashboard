import * as React from 'react';
import { Box, IconButton, Hidden, useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '@material-ui/icons';
import { Button, Image, Text } from '../../atoms';
import Style from './style';
import Assets from '../../../utils/assets';
import { getGreeting } from '../../../utils';
import MenuPop from '../../shared/MenuPop';
import { ToggleDrawer } from '../../../store/actions/dashBoardActions';
import { DashBoardState } from '../../../models/Helpers';
import { AuthState } from '../../../models/Auth';

const HeaderNavigation = ({ title = 'Activity', border = false }) => {
  const { SYARPA_LOGO, SYARPA_WALLET_ICON, BITCOIN_ICON_CASH_ACTIVE,BITCOIN_ICON,ETH_ICON } = Assets;
  const theme = useTheme();
  const dispatch = useDispatch();
  const { profile }: AuthState = useSelector((state) => state.auth);
  const { route } = useRouter();

  return (
    <Style
      display="flex"
      width="100%"
      alignItems="center"
      color="white"
      justifyContent="space-between"
    >
      <Box alignItems="center" display="flex" className="header-left">
        <Hidden mdUp>
          <IconButton
            css="padding: 0;"
            color="inherit"
            onClick={() => {
              dispatch(
                ToggleDrawer({
                  params: { isDrawerOpen: true } as DashBoardState,
                })
              );
            }}
          >
            <Menu color="inherit" fontSize="large" />
          </IconButton>
        </Hidden>
        <Hidden smDown>
          {/* <Box
            padding="0 1rem 0 0"
            css="opacity: .5"
            marginRight="1rem"
            borderRight={border ? `1px solid ${theme.palette.info.main}` : ''}
          >
            <Text
              color={theme.palette.info.main}
              fontWeight="400"
              fontSize="1.2rem"
              variant="h6"
            >
              {title}
            </Text>
          </Box> */}
          {
            route === '/bitcoin-cash'? (
              <Box
            padding="0 1rem 0 0"
            css="opacity: .5"
            marginRight="1rem"
            borderRight={border ? `1px solid ${theme.palette.info.main}` : ''}
          >
            <Text
              color="#FFFFFF"
              fontWeight="400"
              fontSize="1.2rem"
              variant="h6"
            >
              {title}
            </Text>
          </Box>
            ): (<Box
              padding="0 1rem 0 0"
              css="opacity: .5"
              marginRight="1rem"
              borderRight={border ? `1px solid ${theme.palette.info.main}` : ''}
            >
              <Text
                color={theme.palette.info.main}
                fontWeight="400"
                fontSize="1.2rem"
                variant="h6"
              >
                {title}
              </Text>
            </Box>)

          }

          {route === '/dashboard' && (
            <Text color="#fff" variant="caption">
              {getGreeting()} {profile == null ? '' : profile?.firstName}
            </Text>
          )}

          {route === '/wallet' && (
             <Box alignItems="center" display="flex" className="header-left">
              <Image
                className="web-logo"
                width="1.5rem"
                margin="0 .5rem 0 0"
                alt="Syrpa Logo"
                src={require(`../../../public${SYARPA_WALLET_ICON}`)}
              />
              <Text color="#fff" width="200px" fontSize="1.2rem" variant="caption">Syarpa Wallet</Text>
             </Box>
            
          )}
          {route === '/bitcoin-cash' && (
             <Box alignItems="center" display="flex" className="header-left">
              <Image
                className="web-logo"
                width="1.5rem"
                margin="0 .5rem 0 0"
                alt="Syrpa Logo"
                src={require(`../../../public${BITCOIN_ICON_CASH_ACTIVE}`)}
              />
              <Text color="#fff" width="200px" fontSize="1.2rem" variant="caption">Bitcoin Cash</Text>
             </Box>
            
          )}

          {route === '/bitcoin' && (
             <Box alignItems="center" display="flex" className="header-left">
              <Image
                className="web-logo"
                width="1.5rem"
                margin="0 .5rem 0 0"
                alt="Syrpa Logo"
                src={require(`../../../public${BITCOIN_ICON}`)}
              />
              <Text color="#fff" width="200px" fontSize="1.2rem" variant="caption">Bitcoin</Text>
             </Box>
            
          )}

            
        </Hidden>
      </Box>
      {
        route === '/bitcoin-cash'?(
          <Hidden mdUp>
        <Box display="flex" flexGrow="1" justifyContent="center">
          <Button padding=".3rem .7rem" bgColor="#8DC351">
            <Box alignItems="center" display="flex">
              <Image
                className="web-logo"
                width="1.5rem"
                margin="0 .5rem 0 0"
                alt="Syrpa Logo"
                src={require(`../../../public${SYARPA_LOGO}`)}
              />
              <Text
                color="inherit"
                fontWeight="400"
                fontSize="1.1rem"
                variant="h6"
              >
                {title}
              </Text>
            </Box>
          </Button>
        </Box>
      </Hidden>
        ):(
          <Hidden mdUp>
        <Box display="flex" flexGrow="1" justifyContent="center">
          <Button padding=".3rem .7rem" bgColor={theme.palette.primary.main}>
            <Box alignItems="center" display="flex">
              <Image
                className="web-logo"
                width="1.5rem"
                margin="0 .5rem 0 0"
                alt="Syrpa Logo"
                src={require(`../../../public${SYARPA_LOGO}`)}
              />
              <Text
                color="inherit"
                fontWeight="400"
                fontSize="1.1rem"
                variant="h6"
              >
                {title}
              </Text>
            </Box>
          </Button>
        </Box>
      </Hidden>
        )
      }
      

      <MenuPop />
    </Style>
  );
};

export default HeaderNavigation;
