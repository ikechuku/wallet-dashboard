import { AtomProps } from '../../atoms/atoms.interface';

export interface InputProps extends AtomProps {
  textAlign?: 'center' | 'left' | 'right';
  label?: string;
  css?: string;
  type?: 'password' | 'text';
  variant?: string;
  value?: string;
  onChange: Function;
  onFocus?: Function;
  labelPosition?: 'in' | 'out';
  placeholder?: string;
  endIcon?: JSX.Element;
  startIcon?: JSX.Element;
}
