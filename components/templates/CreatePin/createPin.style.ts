import styled from 'styled-components';

export default styled.div`
  & {
    display: flex;
    height: 100vh;
    flex-direction: column;
    padding: 0 1rem;
    & > div {
      flex-grow: 1;
    }
    justify-content: center;
    align-items: center;
    .email-hd {
      margin-top: -5rem;
      justify-content: center;
      align-items: center;
      height: 40%;
      min-height: 300px;
      width: 90%;
      ${({ theme }) => theme.breakpoints.up('sm')} {
        width: 55%;
        min-width: 27rem;
      }
      h2 {
        font-size: 1.7rem;
        ${({ theme }) => theme.breakpoints.up('md')} {
          font-size: 2rem;
        }
      }
      .msg {
        width: 100%;
      }
      img {
        width: 5rem;
        margin-bottom: 1.5rem;
      }
    }
  }
`;
