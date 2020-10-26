import styled from 'styled-components';

const ProgressStyle = (Comp) => styled(Comp)`
  & {
    hr {
      &.divider-0 {
        border-radius: 5px 0 0 5px;
      }
      &.divider-4 {
        border-radius: 0 5px 5px 0;
      }
      width: 100%;
      &.active {
        background-color: ${({ theme }) => theme.palette.secondary.main};
      }
      &.inactive {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

export default ProgressStyle;
