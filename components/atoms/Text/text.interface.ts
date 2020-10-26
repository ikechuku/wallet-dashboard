import { AtomProps } from '../atoms.interface';

export interface TextProps extends AtomProps {
  textAlign?: 'center' | 'left' | 'right';
  lineHeight?: string;
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'button'
    | 'caption'
    | 'inherit'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline'
    | 'srOnly';
  fontWeight?: string;
}
