import styled from 'styled-components';

const HomeNavStyle = styled.nav`
  width: 100%;
  padding: 1rem 0;
  .clear {
    height: fit-content;
  }
  h1 {
    font-size: 2rem;
    ${({ theme }) => theme.breakpoints.up('md')} {
      font-size: 2.2rem;
    }
  }
  & {
    a: hover {
      text-decoration: none;
    }
    a.nav-link {
      margin: 0 1.1rem 0;

      ${({ theme }) => theme.breakpoints.up('lg')} {
        margin: 0 1.7em 0;
      }
    }
  }
  a.nav-link > span,
  .auth-btns span {
    font-weight: 200;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
  }
  .nav-links,
  .auth-btns {
    display: none;
  }
  @media (min-width: 1065px) {
    .nav-links,
    .auth-btns {
      display: flex;
    }
  }
`;

export default HomeNavStyle;
