import { AtomProps } from '../../atoms/atoms.interface';

export interface LogoProps extends AtomProps {
  imageSize?: string;
  smallSize?: string;
  theme?: 'light' | 'dark';
}
