import styled from 'styled-components';
import { Box } from '@material-ui/core';

export default styled(Box)`
  .header-left,
  .header-right {
    display: flex;
    width: 5rem;
  }
  .header-right {
    width: 8.5rem;
  }
  ${({ theme }) => theme.breakpoints.up('md')} {
    .header-right {
      width: 12rem;
    }
    .header-left {
      width: 15rem;
    }
  }
`;
