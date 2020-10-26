import styled from 'styled-components';

const SuccessStyle = (Comp) => styled(Comp)`
  & {
    overflow: hidden;
    overflow-y: auto;
    ${({ theme }) => theme.breakpoints.up('sm')} {
      height: 100%;
    }
    .submit {
      width: 90%;
      ${({ theme }) => theme.breakpoints.up('sm')} {
        width: 40%;
        min-width: 400px;
      }
    }
    ${({ theme }) => theme.breakpoints.up('sm')} {
      width: 80%;
    }
  }
`;

export default SuccessStyle;
