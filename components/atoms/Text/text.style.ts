import styled from 'styled-components';
import { TextProps } from './text.interface';

export default function style(Text: React.SFC<TextProps>) {
  const styledText = styled(Text)<TextProps>`
    font-size: ${({ fontSize }) => fontSize || ''};
    text-transform: none;
    width: ${({ width }) => width};
    line-height: ${({ lineHeight }) => lineHeight};
    letter-spacing: 0;
    text-align: ${({ textAlign }) => textAlign};
    display: ${({ display }) => display};
    margin: ${({ margin }) => margin};
    padding: ${({ padding }) => padding};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-weight: ${(prop) => prop.fontWeight};
    color: ${({ theme, color }) => color || theme.palette.primary.contrastText};
  `;
  return styledText;
}
