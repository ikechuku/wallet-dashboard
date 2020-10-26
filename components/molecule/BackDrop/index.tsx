import * as React from 'react';
import { Backdrop, makeStyles } from '@material-ui/core';
import Spinner from '../../atoms/Spinner';

interface BackDropProps {
  open: boolean;
  onClick?: Function;
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const BackDrop: React.SFC<BackDropProps> = (props) => {
  const classes = useStyles();
  return (
    <Backdrop
      className={classes.backdrop}
      open={props.open}
      onClick={() => {
        if (props.onClick) props.onClick();
      }}
    >
      <Spinner color="inherit" />
    </Backdrop>
  );
};

export default BackDrop;
