import styled from 'styled-components';

export default styled.div`
  & {
    height: 70%;
    width: 100%;
    margin: 0 auto;
    .radio-group {
      justify-content: space-between;
    }
  }
`;

export const RadioStyle = styled.div`
  & {
    display: flex;
    width: 100%;
    ${({ theme }) => theme.breakpoints.up('md')} {
      width: 48%;
    }
    .radio-label {
      width: 100%;
    }
    margin: 0.5rem 0;
    background-color: #fff;
    border: 1px solid rgba(16, 33, 129, 0.2);
    border-radius: 5px;
    align-items: center;
    .radio,
    .title {
      display: inline-block;
      margin: 0 0.2rem;
    }
    .radio {
      min-width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      background: #eee;
      border-radius: 20px;
      .check {
        border-radius: 15px;
        margin: auto;
        width: 15px;
        height: 15px;
      }
    }
  }
`;
