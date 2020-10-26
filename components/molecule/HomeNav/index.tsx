import * as React from 'react';
import Router from 'next/router';
import { Menu } from '@material-ui/icons';
import { Box, Link, IconButton, Hidden, useTheme } from '@material-ui/core';
import Logo from '../Logo';
import Button from '../../atoms/Button';
import Style from './HomeNav.style';
import Text from '../../atoms/Text';
import HomeDrawer from './HomeDrawer';

const HomeNav = () => {
  const [isopen, setOpen] = React.useState(false);
  const theme = useTheme();

  return (
    <Style>
      <React.Fragment key="left">
        <Box
          alignItems="center"
          justifyContent="space-between"
          display="flex"
          flexDirection="row"
          className="nav-hd"
        >
          <Box flexDirection="row" paddingY={1}>
            <Logo theme="dark" />
          </Box>

          <Box
            className="nav-links"
            display="flex"
            justifyContent="flex-end"
            p={1}
            flexGrow={1}
          >
            <Link className="nav-link" href="/how-it-works">
              <Text variant="caption">How it works</Text>
            </Link>

            <Link className="nav-link" href={`${process.env.URL}`}>
              <>
                <Button
                  margin="0 .3rem 0 0"
                  fontWeight="300"
                  padding=".1rem .2rem"
                  fontSize=".6rem"
                >
                  Coming Soon
                </Button>
                <Text variant="caption">Transfer Crypto</Text>
              </>
            </Link>

            <Link className="nav-link" href={`${process.env.URL}`}>
              <Text variant="caption">Business</Text>
            </Link>

            <Link className="nav-link" href={`${process.env.URL}`}>
              <Text variant="caption">Help</Text>
            </Link>
          </Box>

          <Box
            display="flex"
            height="2rem"
            alignItems="center"
            className="auth-btns"
            ml={2}
          >
            <Button
              onClick={() => {
                Router.push('/signup');
              }}
              bgColor="none"
              padding=".3rem 1.3rem"
              variant="text"
              className="signup"
            >
              Sign up
            </Button>
            <Button
              onClick={() => {
                Router.push('/login');
              }}
              bgColor={theme.palette.primary.main}
              padding=".3rem 1.3rem"
            >
              Login
            </Button>

            <Box width="2.5rem" className="menu-icon">
              <IconButton onClick={() => setOpen(true)}>
                <Menu color="inherit" fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Hidden mdUp>
          <HomeDrawer setOpen={setOpen} isopen={isopen} />
        </Hidden>
      </React.Fragment>
    </Style>
  );
};

export default HomeNav;
