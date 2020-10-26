import { AtomProps } from '../atoms.interface';

export interface SwitchProps extends AtomProps {
  toggle?: (e: any) => void;
  checked?: boolean;
  name?: string;
}
