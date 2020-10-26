import styled from 'styled-components';
import { ImageProps } from './image.interface';

export default function style(Button: React.SFC<ImageProps>) {
  const styledImage = styled(Button)<ImageProps>`
    border-radius: 2px;
    height: ${({ height }) => height || 'auto'};
    width: ${({ width }) => width || 'auto'};
    padding: ${({ padding }) => padding};
    margin: ${({ margin }) => margin};
    display: ${({ display }) => display};
  `;
  return styledImage;
}
