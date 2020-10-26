import styled from 'styled-components';
import { Box } from '@material-ui/core';
import Assets from '../../../utils/assets';

const { HOME_BG } = Assets;

export const LogoBg = (Comp) => styled(Comp)`
  & {
    height: 100%;
    overflow-y:auto;
    display: none;
    ${({ theme }) => theme.breakpoints.up('md')} {
      display: inline-block;
    }
    width: 50%;
    .bg {
      height: 90%;
      background-position-y: -3rem;
      
      background-image: url('${HOME_BG}');
      background-size: cover;
      background-repeat: no-repeat;
      .logo{
        h1 {
          font-size: 3.3rem;
        
        }
      }
    }
  }
`;

export const Form = styled(Box)`
  & {
    background: #f7f8ff;
    vertical-align: top;
    display: inline-block;
    height: 100%;
    overflow-y: auto;
    width: 100%;
    padding: 0 1rem;
    ${({ theme }) => theme.breakpoints.up('sm')} {
      padding: 0 2rem;
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
      width: 50%;
      padding: 0;
    }
    .form-hd {
      height: inherit;
      .clear-hd {
        margin-bottom: 0.2rem;
        height: 4rem;
        button {
          height: fit-content;
        }
      }
      margin: 0 auto;
      h4 {
        width: 90%;
        font-size: 1.8rem;
        font-weight: 500;
      }
      ${({ theme }) => theme.breakpoints.up('sm')} {
        h4 {
          font-size: 2rem;
        }
      }
      ${({ theme }) => theme.breakpoints.up('md')} {
        h4 {
          width: 80%;
          font-size: 1.6rem;
          font-weight: 400;
        }
      }
      ${({ theme }) => theme.breakpoints.up('lg')} {
        h4 {
          font-size: 1.9rem;
        }
        width: 90%;
      }
      width: 100%;
      .form-con {
        ${({ theme }) => theme.breakpoints.up('md')} {
          height: 70%;
          &.auth {
            height: 80%;
          }
        }
        ${({ theme }) => theme.breakpoints.up('xl')} {
          height: 60%;
        }
        & > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 0 auto;
        width: 90%;
        ${({ theme }) => theme.breakpoints.up('sm')} {
          width: 70%;
        }
        ${({ theme }) => theme.breakpoints.up('md')} {
          justify-content: center;
          width: 80%;
          max-width: 600px;
        }
      }
    }
  }
`;

export const ResetPassOtpStyle = styled.div`
  & {
    display: flex;
    flex-direction: column;
    height: 70%;
    ${({ theme }) => theme.breakpoints.up('sm')} {
      height: 100vh;
    }
    justify-content: flex-start;
    align-items: center;
    .form-con {
      h2 {
        font-size: 1.7rem;
        ${({ theme }) => theme.breakpoints.up('md')} {
          font-size: 2rem;
        }
      }
      img {
        width: 3rem;
        margin-bottom: 1rem;
        ${({ theme }) => theme.breakpoints.up('md')} {
          width: 2.5rem;
          margin-bottom: 0;
        }
      }
    }
  }
`;

export const SuccessStyle = styled.div`
  & {
    display: flex;
    flex-direction: column;
    & > div {
      flex-grow: 1;
    }
    justify-content: center;
    align-items: center;
    min-height: 300px;
    width: 80%;
    button.action-btn {
      max-width: 400px;
      ${({ theme }) => theme.breakpoints.up('sm')} {
        width: 70%;
      }
      ${({ theme }) => theme.breakpoints.up('md')} {
        width: 80%;
      }
    }
    h2 {
      font-size: 1.4rem;
      ${({ theme }) => theme.breakpoints.up('md')} {
        font-size: 1.7rem;
      }
    }
  }
`;

export const VerifyEmailStyle = styled.div`
  & {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 0 1rem;
    ${({ theme }) => theme.breakpoints.up('sm')} {
      padding: 0 2rem;
    }
    & > div {
      flex-grow: 1;
    }
    justify-content: center;
    align-items: center;
    .email-hd {
      margin-bottom: 10rem;
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

export const SignupSuccessStyle = styled.div`
  & {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 0 1rem;
    ${({ theme }) => theme.breakpoints.up('sm')} {
      padding: 0 2rem;
    }
    & > div {
      flex-grow: 1;
    }
    justify-content: center;
    align-items: center;
    .email-hd {
      justify-content: center;
      align-items: center;
      height: 90%;
      min-height: 300px;
      width: 90%;
      .btn {
        width: 100%;
        ${({ theme }) => theme.breakpoints.up('sm')} {
          width: 80%;
        }
      }
      h2 {
        font-size: 1.4rem;
        ${({ theme }) => theme.breakpoints.up('md')} {
          font-size: 1.7rem;
        }
      }
      img {
        width: 200px;
        ${({ theme }) => theme.breakpoints.up('md')} {
          width: 250px;
        }
      }
      ${({ theme }) => theme.breakpoints.up('sm')} {
        width: 60%;
      }
      ${({ theme }) => theme.breakpoints.up('md')} {
        width: 40%;
      }
      ${({ theme }) => theme.breakpoints.up('lg')} {
        width: 35%;
      }
    }
  }
`;
