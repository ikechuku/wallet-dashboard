import * as React from 'react';
import { Hidden } from '@material-ui/core';
import Router from 'next/router';
import Button from '../../atoms/Button';
import Image from '../../atoms/Image';
import Assets from '../../../utils/assets';
import LogoStyle from './logo.style';
import { LogoProps } from './logo.interface';

const Logo: React.SFC<LogoProps> = ({
  className = '',
  theme = 'light',
  imageSize = '10rem',
  smallSize = '7rem',
}) => {
  const { LIGHT_LOGO, DARK_LOGO } = Assets;
  return (
    <LogoStyle>
      <Button
        bgColor="transparent"
        className={`${className} logo`}
        onClick={() => {
          Router.push('/');
        }}
        variant="text"
      >
        <Hidden mdUp>
          <Image
            className="web-logo"
            width={smallSize}
            alt="Syrpa Logo"
            src={
              theme === 'light'
                ? require(`../../../public${LIGHT_LOGO}`)
                : require(`../../../public${DARK_LOGO}`)
            }
          />
        </Hidden>
        <Hidden smDown>
          <Image
            className="web-logo"
            width={imageSize}
            alt="Syrpa Logo"
            src={
              theme === 'light'
                ? require(`../../../public${LIGHT_LOGO}`)
                : require(`../../../public${DARK_LOGO}`)
            }
          />
        </Hidden>
      </Button>
    </LogoStyle>
  );
};

export default Logo;
