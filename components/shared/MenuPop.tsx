import React from 'react';
import {
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Box,
  useTheme,
  ListItemText,
  IconButton,
  Hidden,
  Avatar,
  Badge,
  withStyles,
  Dialog,
  Slide,
  SlideProps,
} from '@material-ui/core';
import { Notifications, ArrowBack } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { Text, Button } from '../atoms';
import { SignOutAsync } from '../../store/actions/authActions';
import SettingIcon from '../icons/SettingIcon';
import LogOutIcon from '../icons/LogOutIcon';
import Assets from '../../utils/assets';
import useBreakPoints from '../../hooks/useBreakPoints';

const StyledBadge = withStyles(() => ({
  badge: {
    top: 13,
    right: 3,
  },
}))(Badge);

const MenuPop = () => {
  const { md, sm } = useBreakPoints();

  const [open, setMenuOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };
  return (
    <div
      css={`
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: ${md ? '8rem' : '5rem'};
      `}
      ref={anchorRef}
    >
      <Hidden smDown>
        <Text color="inherit" fontWeight="400" variant="caption">
          Help
        </Text>
      </Hidden>
      <Box display="flex" alignItems="center">
        <IconButton color="inherit" aria-label="cart">
          <StyledBadge variant="dot" color="secondary">
            <Notifications color="inherit" fontSize="default" />
          </StyledBadge>
        </IconButton>
        <IconButton css="padding: 0;" onClick={handleToggle}>
          <Avatar
            alt="Remy Sharp"
            src={Assets.PROFILE_PIC}
            css="width: 1.6rem; height: 1.6rem;"
          />
        </IconButton>
        {sm ? (
          <SmallDialog anchorEl={anchorRef.current} open={open}>
            <MenuDetails handleClose={handleClose} open={open} />
          </SmallDialog>
        ) : (
          <FullScreenDialog open={open} handleClose={handleClose}>
            <MenuDetails handleClose={handleClose} open={open} />
          </FullScreenDialog>
        )}
      </Box>
    </div>
  );
};
const Transition = React.forwardRef<unknown, SlideProps>(function Transition(
  props,
  ref
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const FullScreenDialog = ({ open, handleClose, children }) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      {children}
    </Dialog>
  );
};

const SmallDialog = ({ open, anchorEl, children }) => {
  const { lg } = useBreakPoints();

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      role={undefined}
      transition
      disablePortal
      css={`
        z-index: 40;
        width: 15rem;
        right: 0;
        margin-right: ${lg ? '2rem' : '0'};
      `}
    >
      {({ TransitionProps: TransitionProp, placement }) => (
        <Grow
          {...TransitionProp}
          style={{
            transformOrigin:
              placement === 'bottom' ? 'center top' : 'center bottom',
          }}
        >
          {children}
        </Grow>
      )}
    </Popper>
  );
};

const MenuDetails = ({ handleClose, open }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { sm } = useBreakPoints();

  return (
    <Box
      bgcolor="#fff"
      boxShadow={sm ? '0 0px 10px 3px rgba(0, 0, 0, 0.1)' : ''}
      borderRadius=".3rem"
      height={!sm ? '100%' : 'auto'}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <MenuList autoFocusItem={open} id="menu-list-grow">
          {!sm && (
            <Box display="flex">
              <IconButton onClick={handleClose}>
                <ArrowBack />
              </IconButton>
            </Box>
          )}
          <Box paddingX="1rem">
            <Box
              borderBottom=".1px solid rgba(0, 0, 0, .1)"
              alignItems="center"
              paddingY="1rem"
              display="flex"
            >
              {!sm && (
                <Avatar
                  alt="Remy Sharp"
                  src={Assets.PROFILE_PIC}
                  css="width: 4rem; height: 4rem;"
                />
              )}
              <Box
                marginLeft={!sm ? '1rem' : ''}
                display="flex"
                flexDirection="column"
              >
                <Box display="flex" alignItems="center">
                  <Text
                    color={theme.palette.primary.light}
                    fontSize={!sm && '1.2rem'}
                    variant="button"
                  >
                    Shola Peters
                  </Text>
                  &nbsp;
                  {sm && (
                    <Button
                      colorTheme="transparent"
                      fontSize=".8rem"
                      padding="0"
                      onClick={() => Router.push('/profile')}
                      color={theme.palette.info.main}
                    >
                      (View profile)
                    </Button>
                  )}
                </Box>
                <Text variant="caption" color="#ccc">
                  Membership Number P14872423
                </Text>
                {!sm && (
                  <Button
                    colorTheme="transparent"
                    padding=".1rem 0"
                    onClick={() => Router.push('/profile')}
                  >
                    <Text
                      width="100%"
                      textAlign="left"
                      fontSize=".8rem"
                      color={theme.palette.info.main}
                      variant="button"
                    >
                      View personal profile
                    </Text>
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
          <MenuItem
            css="padding: 0 1rem;"
            onClick={() => {
              Router.push('/settings');
              handleClose();
            }}
          >
            <Box
              width="100%"
              borderBottom=".1px solid rgba(0, 0, 0, .1)"
              paddingY=".7rem"
              alignItems="center"
              display="flex"
            >
              <SettingIcon />
              <ListItemText
                css={`
                  margin-left: 1rem;
                  p {
                    color: ${theme.palette.primary.light};
                  }
                `}
                secondary="Settings"
              />
            </Box>
          </MenuItem>
          <MenuItem
            css="padding: 0 1rem;"
            onClick={() => {
              dispatch(SignOutAsync());
              handleClose();
            }}
          >
            <Box
              paddingY=".7rem"
              borderBottom={!sm ? '.1px solid rgba(0, 0, 0, .1)' : ''}
              width="100%"
              alignItems="center"
              display="flex"
            >
              <LogOutIcon />
              <ListItemText
                css={`
                  margin-left: 1rem;
                  p {
                    color: ${theme.palette.primary.light};
                  }
                `}
                secondary="Logout"
              />
            </Box>
          </MenuItem>
        </MenuList>
      </ClickAwayListener>
    </Box>
  );
};

export default MenuPop;
