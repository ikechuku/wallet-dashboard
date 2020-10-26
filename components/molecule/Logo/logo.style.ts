import styled from 'styled-components';

const LogoStyle = styled.div`
  & {
    @media (min-width: 1065px) {
      .logo h1 {
        display: inline-block;
      }
    }
    display: inline-block;
    button {
      padding: 0;
    }
    .MuiButton-startIcon {
      margin: 0;
      height: 100%;
    }
  }
`;

export default LogoStyle;
