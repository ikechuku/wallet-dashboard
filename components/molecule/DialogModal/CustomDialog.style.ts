import { Box } from '@material-ui/core';
import styled from 'styled-components';

export default styled(Box)`
  & {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      .customized-dialog-content,
      .custom-dialog-actions {
        padding: 1rem 1.5rem;
      }
    }
  }
`;
