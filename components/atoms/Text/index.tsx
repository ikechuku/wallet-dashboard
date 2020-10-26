import React from 'react';
import Typography from '@material-ui/core/Typography';
import { TextProps } from './text.interface';
import style from './text.style';

const Text: React.SFC<TextProps> = ({
  className,
  colorTheme = '',
  ...props
}) => {
  return (
    <Typography
      className={`${className} ${colorTheme}`}
      variant={props.variant}
    >
      {props.children}
    </Typography>
  );
};

export default style(Text);
