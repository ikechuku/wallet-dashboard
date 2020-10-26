import styled from 'styled-components';

const HomeNavStyle = styled.nav`
  padding: 1rem 0;
  & {
    .min-nav {
      background: ${({ theme }) => theme.palette.primary.main};
    }
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
  .auth-btns {
    display: flex;
  }
  .auth-btns .signup,
  .nav-links {
    display: none;
  }

  .menu-icon {
    display: flex;
    align-items: center;
    button {
      color: #fff;
    }
  }
  ${({ theme }) => theme.breakpoints.up('sm')} {
    .auth-btns .signup {
      display: inline-block;
    }
  }
  ${({ theme }) => theme.breakpoints.up('md')} {
    .menu-icon {
      display: none;
    }
    .nav-links {
      display: flex;
    }
  }
`;

export default HomeNavStyle;
