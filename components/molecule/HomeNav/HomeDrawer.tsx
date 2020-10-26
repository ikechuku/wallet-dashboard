import React from 'react';
import {
  SwipeableDrawer,
  makeStyles,
  Box,
  IconButton,
  Link,
} from '@material-ui/core';
import { Clear, ChevronRight } from '@material-ui/icons';
import Logo from '../Logo';
import { Text, Button } from '../../atoms';

const useStyles = makeStyles(() => ({
  drawer: {
    width: '100%',
  },
  drawerPaper: { background: 'RGBA(32, 51, 160, .8)', width: '100%' },
}));

export default ({ isopen, setOpen }) => {
  const classes = useStyles();

  return (
    <SwipeableDrawer
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
        root: classes.drawer,
      }}
      className="drawer"
      open={isopen}
      onClose={(_) => _}
      onOpen={(_) => _}
    >
      <Box
        display="flex"
        bgcolor="RGBA(32, 51, 160, 1)"
        width="70%"
        height="100%"
        maxHeight="1000px"
        color="white"
        padding="1rem 0 1rem 2rem"
        className="min-nav"
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
            <Logo theme="dark" />
            <Box display="inline-block" color="rgba(0,179,245,1)">
              <IconButton color="inherit" onClick={() => setOpen(false)}>
                <Clear color="inherit" fontSize="default" />
              </IconButton>
            </Box>
          </Box>
          {[
            {
              text: 'How it works',
              href: `${process.env.APP_URL}/how-it-works`,
            },
            { text: 'Transfer Crypto', href: process.env.APP_URL },
            { text: 'Help', href: process.env.APP_URL },
            { text: 'Sign up', href: `${process.env.APP_URL}/signup` },
          ].map((item, index) => (
            <Box key={index} color="rgba(255, 255, 255, .7)">
              <Link color="inherit" href={item.href}>
                <Box
                  display="flex"
                  padding="1.5rem .8rem 1.5rem .5rem"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box width="85%" display="flex" flexDirection="column">
                    <Text
                      fontWeight="300"
                      color="inherit"
                      variant="h6"
                      fontSize="1.1rem"
                    >
                      {item.text}
                    </Text>
                    {item.text === 'Transfer Crypto' && (
                      <Box>
                        <Button
                          fontWeight="300"
                          padding=".1rem .3rem"
                          fontSize=".7rem"
                        >
                          Coming Soon
                        </Button>
                      </Box>
                    )}
                  </Box>
                  <ChevronRight color="inherit" />
                </Box>
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};
