import styled from 'styled-components';
import { ButtonProps } from './button.interface';

export default function style(Button: React.SFC<ButtonProps>) {
  const styledButton = styled(Button)<ButtonProps>`
    border-radius: ${({ borderRadius }) => borderRadius || '4px'};
    border: ${({ border }) => border || 'none'};
    cursor: pointer;
    letter-spacing: 0;
    height: ${({ height }) => height || 'auto'};
    width: ${({ width }) => width || 'auto'};
    font-size: ${({ fontSize }) => fontSize || '16px'};
    padding: ${({ padding }) => padding || '9px 14px'};
    margin: ${({ margin }) => margin};
    font-weight: ${({ fontWeight }) => fontWeight};
    background: ${({ theme, bgColor }) =>
      bgColor || theme.palette.secondary.main};
    &:hover {
      background: ${({ theme, bgColor }) =>
        bgColor || theme.palette.secondary.main};
    }
    color: ${({ theme, color }) =>
      color || theme.palette.secondary.contrastText};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    text-transform: none;
    display: ${({ display }) => display};
    &.transparent {
      background: none;
      &:hover {
        background: none;
      }
    }
  `;
  return styledButton;
}
