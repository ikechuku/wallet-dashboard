import styled from 'styled-components';
import { Box } from '@material-ui/core';

export default styled(Box)`
  & {
    [role='tablist'] {
      button {
        letter-spacing: 0;
      }
      span.text-wrapper {
        &.active {
          color: ${({ theme }) => theme.palette.primary.main};
        }
        text-transform: capitalize;
        color: #9da8b6;
      }
      ${({ theme }) => theme.breakpoints.down('sm')} {
        .recipient-tab {
          align-items: flex-end;
          width: 50%;
        }
      }
    }
  }
`;
