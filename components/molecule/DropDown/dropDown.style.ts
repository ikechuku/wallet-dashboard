import styled from 'styled-components';
import { DropDownProps } from './dropDown.interface';

export default function style(Text: React.SFC<DropDownProps>) {
  const styledText = styled(Text)<DropDownProps>`
    margin: ${({ margin }) => margin};
    [role='button'] {
      padding: ${({ padding }) => padding || '15px'};
    }
    .fake-label {
      font-weight: ${({ fontWeight }) => fontWeight || '400'};
    }
    color: ${({ theme, color }) => color || theme.palette.primary.contrastText};
    font-size: ${({ fontSize }) => fontSize || ''};
    width: ${({ width }) => width};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    label[data-shrink='true'] {
      color: ${({ theme }) => theme.palette.primary.light};
    }
    label {
      transform: translate(14px, 17px) scale(1);
    }
    .MuiInput-underline:after {
      border-bottom-color: ${({ theme }) => theme.palette.primary.light};
      opacity: 0.5;
    }
    .MuiSelect-root {
      height: ${({ height }) => height || 'auto'};
    }
    .MuiOutlinedInput-root {
      & fieldset {
        border-color: rgba(0, 0, 0, 0.2);
      }
      &:hover fieldset {
        border-color: #666;
      }
      &.Mui-focused fieldset {
        border-color: ${({ theme }) => theme.palette.primary.light};
        opacity: 0.5;
      }
      & .MuiSelect-select:focus {
        background-color: #fff;
      }
    }
    & .combo {
      width: 100%;
      background: #fff;
      & > div {
        &:hover fieldset {
          border: 1.5px solid #7884c2;
        }
        &.Mui-focused:focus fieldset {
          border: 1.5px solid #7884c2;
        }
      }
      svg {
        color: rgba(0, 0, 0, 0.27);
      }
      fieldset {
        border: 1px solid rgba(16, 33, 129, 0.2);
      }
    }
  `;
  return styledText;
}
