import React from 'react';
import {
  SwipeableDrawer,
  makeStyles,
  Box,
  Hidden,
  Drawer,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import InAppNavContent from './InAppNavContent';
import { ToggleDrawer } from '../../../store/actions/dashBoardActions';
import { DashBoardState } from '../../../models/Helpers';

const useStylesMobile = makeStyles(() => ({
  drawer: {
    width: '100%',
  },
  drawerPaper: { background: 'RGBA(255, 255, 255, .7)', width: '16rem' },
}));

const drawerWidth = 240;

const useStylesDesktop = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
}));

const InAppNav = ({ selected = 'Activity', children }) => {
  const dispatch = useDispatch();
  const mobile = useStylesMobile();
  const desktop = useStylesDesktop();
  const { isDrawerOpen }: DashBoardState = useSelector(
    (state) => state.dashboard
  );
  return (
    <>
      <Hidden mdUp>
        <SwipeableDrawer
          anchor="left"
          classes={{
            paper: mobile.drawerPaper,
            root: mobile.drawer,
          }}
          className="drawer"
          open={isDrawerOpen}
          onClose={() =>
            dispatch(
              ToggleDrawer({
                params: { isDrawerOpen: false } as DashBoardState,
              })
            )
          }
          onOpen={() =>
            dispatch(
              ToggleDrawer({
                params: { isDrawerOpen: true } as DashBoardState,
              })
            )
          }
        >
          <InAppNavContent
            ToggleDrawer={(val) => dispatch(ToggleDrawer(val))}
            selected={selected}
          />
        </SwipeableDrawer>
      </Hidden>
      <Box height="100%" display="flex">
        <Hidden smDown>
          <Drawer
            className={desktop.drawer}
            variant="permanent"
            classes={{
              paper: desktop.drawerPaper,
            }}
            anchor="left"
          >
            <InAppNavContent
              ToggleDrawer={(val) => dispatch(ToggleDrawer(val))}
              selected={selected}
            />
          </Drawer>
        </Hidden>
        <Box
          display="flex"
          flexGrow="1"
          width="100%"
          className={desktop.content}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default InAppNav;
