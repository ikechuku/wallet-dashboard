import styled from 'styled-components';

const BusinessStyle = (Comp) => styled(Comp)`
  ${({ theme }) => theme.breakpoints.up('sm')} {
    padding: 2rem 1.5rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
    width: 80%;
    background-color: white;
  }
  ${({ theme }) => theme.breakpoints.up('md')} {
    .country-note {
      font-size: 0.9rem;
      text-align: left;
    }
    padding: 3rem 2rem;
    height: 100%;
    .row {
      &.break {
        & > div {
          &:nth-child(1) {
            width: 69%;
          }
          &:nth-child(2) {
            width: 29%;
          }
        }
      }
      margin-bottom: 1rem;
      flex-direction: row;
      justify-content: space-between;
      &:nth-child(2) {
        margin-bottom: 1.6rem;
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

export default BusinessStyle;
