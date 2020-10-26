import styled from 'styled-components';
import { Box } from '@material-ui/core';

export const TransferStyle = (Comp) => styled(Comp)`
  overflow-y: auto;
  & {
    ${({ theme }) => theme.breakpoints.down('sm')} {
      input,
      .select {
        font-size: 0.9rem;
      }
    }
    .navigation,
    .transfer-body {
      ${({ theme }) => theme.breakpoints.up('md')} {
        width: 80%;
      }

      ${({ theme }) => theme.breakpoints.up('lg')} {
        width: 70%;
        max-width: 1000px;
      }
    }
    .navigation {
      ${({ theme }) => theme.breakpoints.up('sm')} {
        margin-top: 2rem;
      }
    }
  }
`;

export const RecieptStyle = styled(Box)`
  & {
    input.auto-complete.auto-complete-input.auto-complete-datalist {
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;
    }
    & > div:nth-child(1),
    .recipient-form {
      ${({ theme }) => theme.breakpoints.up('sm')} {
        width: 80%;
      }
      ${({ theme }) => theme.breakpoints.up('lg')} {
        width: 50%;
      }
    }
    & > div:nth-child(1) {
      ${({ theme }) => theme.breakpoints.up('sm')} {
        margin: 0 auto;
      }
    }
    [role='tablist'] {
      button {
        letter-spacing: 0;
      }
      span.text-wrapper {
        &.active {
          color: ${({ theme }) => theme.palette.primary.main};
        }
        text-transform: capitalize;
        color: #9da8b6;
      }
      ${({ theme }) => theme.breakpoints.down('sm')} {
        .recipient-tab {
          align-items: flex-end;
          width: 50%;
        }
      }
    }
  }
`;

export const ConfirmStyle = styled(Box)`
  & {
    .confirm-box {
      box-shadow: 0 1px 10px 5px rgba(0, 0, 0, 0.03);
      min-width: 320px;
      padding: 1rem;
      margin: 0 auto;
      width: 100%;
      background-color: #fff;
      ${({ theme }) => theme.breakpoints.up('sm')} {
        width: 75%;
      }
      ${({ theme }) => theme.breakpoints.up('md')} {
        width: 45%;
      }
    }
    .key {
      text-align: left;
      color: #9da8b6;
      font-weight: 300;
    }
    .value {
      text-align: right;
      color: ${({ theme }) => theme.palette.primary.light};
      font-weight: 500;
    }
    .row {
      display: flex;
      width: 100%;
      padding: 0.4rem 0;
      align-items: center;
    }
  }
`;

export const CryptoPaymentStyle = styled(Box)`
  & {
    .confirm-box {
      box-shadow: 0 1px 10px 5px rgba(0, 0, 0, 0.03);
      min-width: 320px;
      padding: 1rem;
      margin: 0 auto;
      width: 100%;
      background-color: #fff;
      ${({ theme }) => theme.breakpoints.up('sm')} {
        width: 75%;
      }
      ${({ theme }) => theme.breakpoints.up('md')} {
        width: 45%;
      }
    }
    .key {
      textalign: left;
      color: #9da8b6;
      fontweight: 300;
    }
    .value {
      textalign: right;
      color: ${({ theme }) => theme.palette.primary.light};
      font-weight: 500;
    }
    .row {
      display: flex;
      width: 100%;
      padding: 0.4rem 0;
      align-items: center;
    }
  }
`;

export const TransferTypeStyle = styled(Box)`
  & {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      flex-direction: row;
      justify-content: center;
      & > button {
        margin: 0 1rem;
      }
    }
    .list-item-btn {
      ${({ theme }) => theme.breakpoints.up('sm')} {
        width: 13rem;
      }
    }
    .list-item {
      ${({ theme }) => theme.breakpoints.up('sm')} {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h6,
        span {
          text-align: center;
        }
        height: 15rem;
        & > div:nth-child(1) {
          margin-bottom: 0.5rem;
        }
        & > div:nth-child(2) {
          flex-grow: 0;
        }
        .content {
          width: 7rem;
          margin: 0 auto;
        }
      }
    }
  }
`;

export const CryptoPayMethodStyle = styled(Box)`
  & {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      min-width: 500px;
      width: 50%;
    }
    .card-box {
      ${({ theme }) => theme.breakpoints.up('sm')} {
        flex-direction: column;
        align-items: flex-start;
      }
      h6:nth-child(2) {
        margin: 0.5rem 0 1.5rem;
      }
    }
  }
`;

export const CashPayMethodStyle = styled(Box)`
  & {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      min-width: 500px;
      width: 75%;
    }
    ${({ theme }) => theme.breakpoints.up('md')} {
      width: 85%;
    }
    .card-box {
      ${({ theme }) => theme.breakpoints.up('sm')} {
        flex-direction: column;
        align-items: flex-start;
      }
      h6:nth-child(2) {
        margin: 0.5rem 0 1.5rem;
      }
    }
  }
`;

export const CardDetailsStyle = styled(Box)`
  & {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      min-width: 500px;
      width: 50%;
    }
    ${({ theme }) => theme.breakpoints.up('md')} {
      width: 45%;
    }
    .card-box {
      ${({ theme }) => theme.breakpoints.up('sm')} {
        flex-direction: column;
        align-items: flex-start;
      }
      h6:nth-child(2) {
        margin: 0.5rem 0 1.5rem;
      }
    }
  }
`;

export const EnterDetailStyle = styled(Box)`
  & {
    [role='tabpanel'] {
      width: 100%;
    }
    .simple-tab {
      opacity: 0.9;
      padding: 0.5rem 0;
      span.text-wrapper {
        &.active {
          color: ${({ theme }) => theme.palette.secondary.main};
        }
        text-align: left;
        text-transform: capitalize;
        display: inline;
        color: ${({ theme }) => theme.palette.primary.main};
      }
      &:nth-child(1) {
        margin-right: 0.5rem;
      }
    }
  }
`;

export const BusinessOwnerStyle = styled(Box)`
  .business-hd {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      width: 80%;
      background: white;
      margin-top: 1rem;
      padding: 1rem 1.5rem;
    }
    .footer {
      ${({ theme }) => theme.breakpoints.up('sm')} {
        width: 48%;
      }
      .add-director {
        ${({ theme }) => theme.breakpoints.up('sm')} {
          justify-content: flex-start;
          width: 15rem;
        }
      }
    }
  }
  .header {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      width: 70%;
    }
    ${({ theme }) => theme.breakpoints.up('md')} {
      width: 50%;
    }
  }
  .row {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      & > div {
        &:nth-child(1) {
          margin-bottom: 0;
        }
        width: 48%;
      }
    }
  }
`;
