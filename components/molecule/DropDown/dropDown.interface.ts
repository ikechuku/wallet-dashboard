import { AtomProps } from '../../atoms/atoms.interface';

export interface DropDownProps extends AtomProps {
  label?: string;
  variant?: 'combo' | 'standard';
  placeholder?: string;
  onChange: Function;
  native?: boolean;
  data?: Array<any>;
  initialValue?: any;
}
