import styled from 'styled-components';
import { Box } from '@material-ui/core';

export default styled.div`
  background-color: #f7f8ff;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  .search-header {
    ${({ theme }) => theme.breakpoints.up('md')} {
      padding: 1.5rem 2rem;
    }
  }
`;

export const RecipientHeaderStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #2033a0;
  ${({ theme }) => theme.breakpoints.up('md')} {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  height: 4.5rem;
  padding: 0.6rem;
`;

export const RecipientListStyle = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  .list-box {
    padding: 0 1rem 0.5rem;
    ${({ theme }) => theme.breakpoints.up('sm')} {
      padding: 0rem;
    }
  }
  .list-con {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      padding-left: 1rem;
      border: none;
    }
  }
`;

export const RecieptTabStyle = styled(Box)`
  & {
    padding: 0 1rem;
    ${({ theme }) => theme.breakpoints.up('md')} {
      padding: 0 2rem;
    }
  }
`;

export const RecipientListItemStyle = styled(Box)`
  & {
    .list-actions {
      ${({ theme }) => theme.breakpoints.up('sm')} {
        width: 6rem;
      }
    }
    .info-action {
      display: flex;
      flex-direction: column;
      button {
        width: 100%;
        margin-bottom: 0.5rem;
        ${({ theme }) => theme.breakpoints.up('sm')} {
          max-width: 10rem;
        }
      }
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      ${({ theme }) => theme.breakpoints.up('sm')} {
        padding: 0 1.5rem 1.2rem 3.9rem;
        flex-direction: row;
        justify-content: space-between;
      }
    }
    .info-cont {
      ${({ theme }) => theme.breakpoints.up('sm')} {
        display: flex;
        padding: 1rem 0 1.2rem 3.9rem;
        flex-direction: row;
        justify-content: flex-start;
        .info-item {
          display: flex;
          width: 30%;
          p {
            font-size: 0.8rem;
          }
          span {
            font-size: 0.85rem;
          }
        }
      }
    }
  }
`;
