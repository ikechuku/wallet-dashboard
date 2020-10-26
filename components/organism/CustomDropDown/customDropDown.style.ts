import styled from 'styled-components';
import { Box } from '@material-ui/core';

const DropDownStyle = styled(Box)`
  .list-con {
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow-y: auto;

    ${({ theme }) => theme.breakpoints.up('sm')} {
      max-height: 250px;
    }
  }
  #search-field.drop-down-search .combo {
    svg {
      color: #bbb;
    }
  }
  z-index: 1000;
  border-radius: 0.1rem;
  width: ${({ width }) => width || '100%'};
  padding: 0.4rem;
  margin: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  position: absolute;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    div[role='button'] {
      height: 49px;
    }
    box-shadow: 0 1px 10px 5px rgba(0, 0, 0, 0.1);
  }
`;

export const DropDownConStyle = styled(Box)`
  ${({ theme }) => theme.breakpoints.up('md')} {
    div[role='button'] {
      height: 49px;
      &:focus {
        outline: none;
      }
    }
  }
`;

export default DropDownStyle;
