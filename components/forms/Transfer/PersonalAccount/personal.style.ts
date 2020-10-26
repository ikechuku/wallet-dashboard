import styled from 'styled-components';

export default (Comp) => styled(Comp)`
  ${({ theme }) => theme.breakpoints.up('sm')} {
    padding: 2rem 1.5rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
    width: 80%;
    background-color: white;
  }
  ${({ theme }) => theme.breakpoints.up('md')} {
    padding: 3rem 2rem;
    height: 100%;
    .row {
      margin-bottom: 1rem;
      flex-direction: row;
      justify-content: space-between;
      &:nth-child(2) {
        margin-bottom: 1rem;
      }
      & > div {
        margin-bottom: 0;
        width: 48%;
      }
    }
    .button-box {
      width: 48%;
    }
  }
`;
