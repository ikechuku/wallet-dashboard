import styled from 'styled-components';

export default (Comp) => styled(Comp)`
  & {
    .otpContainer {
      margin: 0.4rem;
      font-size: 1.3rem;
      padding: 0.5rem 0.2rem;
      width: 2.5rem;
      color: black;
      text-align: center;
      border: 1px solid rgba(16, 33, 129, 0.2);
    }
  }
`;
