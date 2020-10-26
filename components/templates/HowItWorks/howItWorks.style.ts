/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Box } from '@material-ui/core';

export const Header = styled(Box)`
  & {
    padding: 0 0 2rem;
    display: flex;
    align-items: center;
    ${({ theme }) => theme.breakpoints.up('lg')} {
      padding: 1.2rem 0;
    }
    justify-content: space-between;
    .action-btns {
      width: 100%;
      justify-content: space-between;
      display: flex;
      flex-direction: column;
      button {
        margin: 0.3rem 0;
        font-weight: 300;
        width: 100%;
        height: 3.2rem;
        fontsize: 1.2rem;
      }
      ${({ theme }) => theme.breakpoints.up('md')} {
        width: 25rem;
        flex-direction: row;
        button {
          width: 48%;
        }
      }
    }
    .banner-img {
      max-width: 25rem;
      height: 10rem;
      margin-bottom: 2rem;
      ${({ theme }) => theme.breakpoints.up('sm')} {
        max-width: 35rem;
        height: 20rem;
      }
      ${({ theme }) => theme.breakpoints.up('md')} {
        margin: 0;
        min-width: 30rem;
      }
    }
    .greet-msg,
    .banner-img-con {
      width: 100%;
      text-align: center;
      h3 {
        font-size: 1.8rem;
        ${({ theme }) => theme.breakpoints.up('md')} {
          font-size: 2.3rem;
        }
      }
      h6 {
        font-size: 1.1rem;
        ${({ theme }) => theme.breakpoints.up('md')} {
          font-size: 1.2rem;
        }
      }
      ${({ theme }) => theme.breakpoints.up('sm')} {
        padding: 2rem;
      }
      ${({ theme }) => theme.breakpoints.up('md')} {
        width: 50%;
        text-align: left;
        padding: 3rem;
      }
      ${({ theme }) => theme.breakpoints.up('lg')} {
        width: 47%;
        padding: 3rem 1rem;
      }
    }
  }
`;

export const Body = styled(Box)`
  & {
    h3 {
      font-size: 2rem;
      ${({ theme }) => theme.breakpoints.up('md')} {
        font-size: 2.3rem;
      }
    }
  }
`;

export const FooterStyle = styled(Box)`
  & {
    .cont {
      ${({ theme }) => theme.breakpoints.up('md')} {
        width: 85%;
        margin: 1rem 3rem 5rem;
      }
      width: 100%;
      border-radius: 0.7rem;
      background-color: ${({ theme }) => theme.palette.primary.light};
      margin-bottom: 5rem;
      .content {
        padding: 1.5rem;
        justify-content: center;
        ${({ theme }) => theme.breakpoints.up('md')} {
          width: 40%;
          justify-content: flex-start;
          min-width: 15rem;
        }
        button {
          margin-top: 1rem;
        }
        h4 {
          font-size: 1.5rem;
          ${({ theme }) => theme.breakpoints.up('md')} {
            font-size: 1.8rem;
          }
        }
      }
    }
  }
`;

export const StepBody = styled(Box)`
  & {
    min-height: 18rem;
    padding: 2rem 1rem;
    flex-direction: column;
    ${({ theme }) => theme.breakpoints.up('sm')} {
      padding: 2rem 3rem;
    }
    ${({ theme }) => theme.breakpoints.up('md')} {
      width: 85%;
      padding: 1rem 3rem;
      flex-direction: ${({ flexDirection }) => flexDirection};
    }
    width: 100%;
    .syarpa-step-detail {
      width: 100%;
      flex-direction: row;
      text-align: left;
      ${({ theme }) => theme.breakpoints.up('md')} {
        text-align: ${({ textAlign }) => textAlign};
        flex-direction: ${({ flexDirection }) => flexDirection};
        width: 60%;
      }
      .content {
        flex-grow: 1;
        ${({ theme }) => theme.breakpoints.up('md')} {
          flex-grow: 0;
          width: 60%;
        }
      }
      min-width: 20rem;
    }
    .syarpa-step-img {
      margin-top: 1rem;
      ${({ theme }) => theme.breakpoints.up('md')} {
        margin: 0;
      }
      width: 40%;
      min-width: 15rem;
    }
  }
`;
