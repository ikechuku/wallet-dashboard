/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  Dialog,
  DialogTitle,
  Box,
  useTheme,
  IconButton,
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { Text } from '../../atoms';
import CustomDialogStyle from './CustomDialog.style';

const DialogModal = ({ open, title, handleClose, form: Comp }) => {
  const theme = useTheme();
  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      css=".MuiPaper-root{margin: 10px; width: 90%; max-width: 500px;}"
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <CustomDialogStyle>
        <DialogTitle
          css="padding: .5rem 1rem 1rem;"
          className="customized-dialog"
        >
          <Box display="flex" justifyContent="center" flexDirection="column">
            <Box display="flex" justifyContent="flex-end">
              <IconButton css="padding: .3rem;" onClick={handleClose}>
                <Clear />
              </IconButton>
            </Box>
            <Text
              textAlign="center"
              color={theme.palette.primary.light}
              variant="h5"
            >
              {title}
            </Text>
          </Box>
        </DialogTitle>
        <Comp handleClose={handleClose} />
      </CustomDialogStyle>
    </Dialog>
  );
};
export default DialogModal;
