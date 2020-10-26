import styled from 'styled-components';
import { SwitchProps } from './switch.interface';

const SwitchStyle = (Comp: React.SFC<SwitchProps>) => styled(Comp)`
  & {
    .root {
      width: 42px;
      height: 18px;
      padding: 0;
      margin: ${({ theme }) => theme.spacing(1)}px;
    }
    .switchBase {
      padding: 0.4px;
      &.checked {
        transform: translateX(24px);
        color: ${({ theme }) => theme.palette.common.white};
        & + .track {
          background-color: ${({ theme, bgColor }) =>
            bgColor || theme.palette.secondary.main};
          opacity: 1;
          border: none;
        }
      }
      &.focusVisible,
      &.thumb {
        color: #52d869;
        border: 6px solid #fff;
      }
    }
    .thumb {
      width: 17.5px;
      height: 17.5px;
      background: #fff;
    }

    .track {
      border-radius: calc(20px / 2);
      border: none;
      background-color: #d2dbf8;
      opacity: 1;
      transition: ${({ theme }) =>
        theme.transitions.create(['background-color', 'border'])};
    }
  }
`;

export default SwitchStyle;
