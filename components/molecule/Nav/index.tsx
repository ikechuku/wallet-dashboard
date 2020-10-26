import * as React from 'react';
import { Clear } from '@material-ui/icons';
import { Box, Link, IconButton, Grid, Hidden } from '@material-ui/core';
import Logo from '../Logo';
import Style from './Nav.style';

const SimpleNav = ({ pop, show }: { pop: Function; show?: any }) => {
  return (
    <Style>
      <Grid justify="space-between" alignItems="center" container>
        <Box p={1}>
          {show ? (
            <Hidden only={show}>
              <Link href={`${process.env.URL}`}>
                <Logo />
              </Link>
            </Hidden>
          ) : (
            <Link href={`${process.env.URL}`}>
              <Logo />
            </Link>
          )}
        </Box>

        <IconButton className="clear" onClick={() => pop?.()}>
          <Clear />
        </IconButton>
      </Grid>
    </Style>
  );
};

export default SimpleNav;
