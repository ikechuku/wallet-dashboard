import { AtomProps } from '../atoms.interface';

export interface ButtonProps extends AtomProps {
  onClick?: (e: any) => void;
  startIcon?: React.ReactNode;
  fontWeight?: string;
  isLoading?: boolean;
  borderRadius?: string;
  border?: string;
  endIcon?: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
}
