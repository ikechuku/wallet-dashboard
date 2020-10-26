import styled from 'styled-components';
import { InputProps } from './textfield.interface';

export default function style(Text: React.SFC<InputProps>) {
  const styledText = styled(Text)<InputProps>`
    & {
      margin: ${({ margin }) => margin};
      input {
        padding: ${({ padding }) => padding || '15px'};
        ${({ startIcon }) => (startIcon ? 'padding-left: 0;' : '')}
        background: ${({ bgColor }) => bgColor || '#fff'};
        font-weight: 300;
      }
      .tx-helper-text {
        margin: 3px 0 0;
        font-size: 0.75rem;
      }
      label {
        transform: translate(14px, 17px) scale(1);
      }
      .fake-label {
        font-weight: ${({ fontWeight }) => fontWeight || '400'};
        padding: ${({ padding }) => padding};
        font-size: ${({ fontSize }) => fontSize || ''};
        color: ${({ color }) => color || ''};
      }
      color: ${({ theme, color }) =>
        color || theme.palette.primary.contrastText};
      width: ${({ width }) => width};
      text-align: ${({ textAlign }) => textAlign};
      font-family: ${({ theme }) => theme.typography.fontFamily};
      & .combo {
        & > div {
          background: ${({ bgColor }) => bgColor || 'transparent'};
        }
        width: 100%;
        svg {
          color: ${({ theme, color }) =>
            color || theme.palette.primary.contrastText};
        }
      }
      ${({ css }) => css}
    }
  `;
  return styledText;
}
