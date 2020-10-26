import { AtomProps } from '../atoms.interface';

export interface ImageProps extends AtomProps {
  alt: string;
  src: string;
  srcSet?: string;
}
