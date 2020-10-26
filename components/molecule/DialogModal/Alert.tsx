/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  Dialog,
  DialogTitle,
  useTheme,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from '@material-ui/core';
import { Text } from '../../atoms';
import CustomDialogStyle from './CustomDialog.style';

const AlertModal = ({ open, title, handleClose, children, nextAction }) => {
  const theme = useTheme();
  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      css=".MuiPaper-root{margin: 10px; width: 90%; max-width: 400px;}"
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <CustomDialogStyle>
        <DialogTitle
          css="padding: .5rem 1rem 1rem;"
          className="customized-dialog"
        >
          <Box padding=".5rem">
            <Text color={theme.palette.primary.light} variant="h5">
              {title}
            </Text>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={nextAction} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </CustomDialogStyle>
    </Dialog>
  );
};
export default AlertModal;
