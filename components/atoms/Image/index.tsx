import * as React from 'react';
import style from './image.style';
import { ImageProps } from './image.interface';

const Image: React.SFC<ImageProps> = ({
  alt,
  srcSet,
  className,
  src,
  params = {},
}) => {
  return (
    <img
      alt={alt}
      src={src}
      srcSet={srcSet}
      className={`${className}`}
      {...params}
    />
  );
};

export default style(Image);
