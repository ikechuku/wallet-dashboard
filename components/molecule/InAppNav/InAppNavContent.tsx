import React from 'react';
import { Clear } from '@material-ui/icons';
import Router from 'next/router';
import { Box, IconButton, Hidden, useTheme } from '@material-ui/core';
import Logo from '../Logo';
import { Button, Image, Text } from '../../atoms';
import Assets from '../../../utils/assets';
import { DashBoardState } from '../../../models/Helpers';
import ActivityIcon from '../../icons/ActivityIcon';
import RecipientIcon from '../../icons/RecipientIcon';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const InAppNavContent = ({ ToggleDrawer, selected, className = '' }) => {
  const theme = useTheme();

const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };


  return (
    <Box
      display="flex"
      bgcolor="white"
      width="100%"
      height="100%"
      maxHeight="1000px"
      color="white"
      padding="1rem 0 1rem 2rem"
      className={`${className} min-nav`}
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Box
          padding="0 0 2rem"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Logo imageSize="7rem" />
          <Hidden mdUp>
            <Box display="inline-block" color="rgba(0,179,245,1)">
              <IconButton
                color="inherit"
                onClick={() =>
                  ToggleDrawer({
                    params: { isDrawerOpen: false } as DashBoardState,
                  })
                }
              >
                <Clear color="inherit" fontSize="default" />
              </IconButton>
            </Box>
          </Hidden>
        </Box>

        {[
          {
            text: 'Activity',
            href: '/dashboard',
            active: true,
            image: ActivityIcon,
          },
        ].map((item, index) => (
          <Box key={index} color="rgba(255, 255, 255, .7)" width="90%">
            <Button
              css={`
                opacity: ${item.active ? 1 : 0.5};
                pointer-events: ${item.active ? 'pointer' : 'none'};
              `}
              bgColor={
                selected === item.text ? theme.palette.primary.light : 'none'
              }
              color={
                selected === item.text
                  ? theme.palette.secondary.contrastText
                  : theme.palette.primary.light
              }
              padding=".8rem 1rem"
              margin=".7rem 0"
              width="100%"
              onClick={() => {
                if (!item.active) return;
                Router.push(item.href);
                ToggleDrawer({
                  params: { isDrawerOpen: false } as DashBoardState,
                });
              }}
            >
              <Box
                display="flex"
                justifyContent="start"
                alignItems="center"
                width="100%"
              >
                {!(typeof item.image === 'string') ? (
                  <item.image
                    width="18"
                    color={
                      selected === item.text
                        ? theme.palette.secondary.main
                        : theme.palette.primary.light
                    }
                  />
                ) : (
                  <Image
                    src={
                      Assets[
                        selected === item.text
                          ? `${item.image}_ACTIVE`
                          : String(item.image)
                      ]
                    }
                    alt="navigation icons"
                    width="1.3rem"
                  />
                )}
                <Text
                  fontWeight="400"
                  margin="0 0 0 1rem"
                  color="inherit"
                  variant="h6"
                  fontSize="0.9rem"
                >
                  {item.text}
                </Text>
              </Box>
            </Button>
          </Box>
        
        ))}


        {[
          
          {
            text: 'Wallets',
            href: "/wallet",
            image: 'WALLET_NAV_ICON',
            active: true,
          },
         
        ].map((item, index) => (
          <Box key={index} color="rgba(255, 255, 255, .7)" width="90%">
            <Button
              css={`
                opacity: ${item.active ? 1 : 0.5};
                pointer-events: ${item.active ? 'pointer' : 'none'};
              `}
              bgColor={
                selected === item.text ? theme.palette.primary.light : 'none'
              }
              color={
                selected === item.text
                  ? theme.palette.secondary.contrastText
                  : theme.palette.primary.light
              }
              padding=".8rem 1rem"
              margin=".7rem 0"
              width="100%"
              onClick={handleClick}
             
            >
              <Box
                display="flex"
                justifyContent="start"
                alignItems="center"
                width="100%"
              >
                {!(typeof item.image === 'string') ? (
                  <item.image
                    width="18"
                    color={
                      selected === item.text
                        ? theme.palette.secondary.main
                        : theme.palette.primary.light
                    }
                  />
                ) : (
                  <Image
                    src={
                      Assets[
                        selected === item.text
                          ? `${item.image}_ACTIVE`
                          : String(item.image)
                      ]
                    }
                    alt="navigation icons"
                    width="1.3rem"
                  />
                )}
                <Text
                  fontWeight="400"
                  margin="0 0 0 1rem"
                  color="inherit"
                  variant="h6"
                  fontSize="0.9rem"
                >
                  {item.text}
                </Text>
              </Box>
              {open ? <ExpandLess /> : <ExpandMore />}
            </Button>
          
            <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            
          >
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          
          {[
          
          {
            text: 'Syarpa Wallet',
            href: `/wallet`,
            active: true,
            image: "SYARPA_WALLET_ICON",
          },
          {
            text: 'Bitcoin',
            href: `/bitcoin`,
            active: true,
            image: 'BITCOIN_ICON',
          },
          {
            text: 'Bitcoin Cash',
            href: `/bitcoin-cash`,
            active: true,
            image: 'BITCOIN_ICON_CASH',
          },
          {
            text: 'Ethereum',
            href: `/ethereum`,
            active: true,
            image: 'ETH_ICON',
          },
        ].map((item, index) => (
          <ListItem button>
          <Box key={index} color="rgba(255, 255, 255, .7)" width="90%">
            <Button
              css={`
                opacity: ${item.active ? 1 : 0.5};
                pointer-events: ${item.active ? 'pointer' : 'none'};
              `}
              bgColor={
                selected === item.text ? theme.palette.primary.light : 'none'
              }
              color={
                selected === item.text
                  ? theme.palette.secondary.contrastText
                  : theme.palette.primary.light
              }
              padding=".8rem 1rem"
              margin=".7rem 0"
              width="100%"
              onClick={() => {
                if (!item.active) return;
                Router.push(item.href);
                ToggleDrawer({
                  params: { isDrawerOpen: false } as DashBoardState,
                });
              }}
            >
              <Box
                display="flex"
                justifyContent="start"
                alignItems="center"
                width="100%"
              >
                {!(typeof item.image === 'string') ? (
                  <item.image
                    width="18"
                    color={
                      selected === item.text
                        ? theme.palette.secondary.main
                        : theme.palette.primary.light
                    }
                  />
                ) : (
                  <Image
                    src={
                      Assets[
                        selected === item.text
                          ? `${item.image}_ACTIVE`
                          : String(item.image)
                      ]
                    }
                    alt="navigation icons"
                    width="1.3rem"
                  />
                )}
                <Text
                  fontWeight="400"
                  margin="0 0 0 1rem"
                  color="inherit"
                  variant="h6"
                  fontSize="0.9rem"
                >
                  {item.text}
                </Text>
              </Box>
            </Button>
          </Box>
          </ListItem>
        
        ))}
          
        </List>
      </Collapse>
   
    </List>

          </Box>
        
        ))}

        {[
          {
            text: 'Crypto',
            href: '/',
            image: 'CRYPTO_ICON',
            active: true,
          },
          {
            text: 'Recipients',
            href: `/recipients`,
            active: true,
            image: RecipientIcon,
          },
          {
            text: 'Invite',
            href: process.env.URL,
            image: 'INVITE_NAV_ICON',
          },
        ].map((item, index) => (
          <Box key={index} color="rgba(255, 255, 255, .7)" width="90%">
            <Button
              css={`
                opacity: ${item.active ? 1 : 0.5};
                pointer-events: ${item.active ? 'pointer' : 'none'};
              `}
              bgColor={
                selected === item.text ? theme.palette.primary.light : 'none'
              }
              color={
                selected === item.text
                  ? theme.palette.secondary.contrastText
                  : theme.palette.primary.light
              }
              padding=".8rem 1rem"
              margin=".7rem 0"
              width="100%"
              onClick={() => {
                if (!item.active) return;
                Router.push(item.href);
                ToggleDrawer({
                  params: { isDrawerOpen: false } as DashBoardState,
                });
              }}
            >
              <Box
                display="flex"
                justifyContent="start"
                alignItems="center"
                width="100%"
              >
                {!(typeof item.image === 'string') ? (
                  <item.image
                    width="18"
                    color={
                      selected === item.text
                        ? theme.palette.secondary.main
                        : theme.palette.primary.light
                    }
                  />
                ) : (
                  <Image
                    src={
                      Assets[
                        selected === item.text
                          ? `${item.image}_ACTIVE`
                          : String(item.image)
                      ]
                    }
                    alt="navigation icons"
                    width="1.3rem"
                  />
                )}
                <Text
                  fontWeight="400"
                  margin="0 0 0 1rem"
                  color="inherit"
                  variant="h6"
                  fontSize="0.9rem"
                >
                  {item.text}
                </Text>
              </Box>
            </Button>
          </Box>
        
        ))}

       

        
      </Box>
    </Box>
  );
};

export default InAppNavContent;
