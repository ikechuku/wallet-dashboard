import styled from 'styled-components';
import Assets from '../../../../utils/assets';

const { WALLET_BG } = Assets;

export default styled.div`
  background-color: #f7f8ff;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TransactionListStyle = styled.div`
  width: 100%;
  .tranx-pagination {
    ul li button {
      height: 26px;
      min-width: 26px;
      font-size: 0.7rem;
    }
  }
  .tranx-header {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      width: 350px;
      margin: 0.3rem 0;
    }
  }
`;

export const DbHeaderStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #7DAF46;
  ${({ theme }) => theme.breakpoints.up('lg')} {
    padding-left: 2rem;
    padding-right: 4rem;
  }
  input {
    color: rgba(255, 255, 255, 0.4);
  }
  height: 12.5rem;
  padding: 0.6rem;
  .header-card {
    &:last-child {
      opacity: 0.3;
    }
    max-width: 11rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 45%;
    padding: 0.5rem;
    height: 4.7rem;
    margin-right: 0.5rem;
    &.active {
      background-image: url(${require(`../../../../public${WALLET_BG}`)});
      background-size: inherit;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
`;

export const DbBodyStyle = (Comp) => styled(Comp)`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  flex-grow: 1;
  padding: 1rem 0.6rem;
  .dashboard-btn {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      .img-actn {
        height: 1.6rem;
      }
      .text-actn {
        font-size: 1.2rem;
      }
    }
  }
  ${({ theme }) => theme.breakpoints.up('sm')} {
    .text-actn {
      font-size: 1rem;
    }
  }
  .placeholder {
    margin: 1rem 0;
    ${({ theme }) => theme.breakpoints.down('sm')} {
      p {
        font-size: 0.7rem;
      }
    }
    ${({ theme }) => theme.breakpoints.up('sm')} {
      margin: 0;
      img {
        margin-top: 0;
        width: 6rem;
      }
      h5 {
        font-size: 2rem;
      }
    }
  }
  .btns {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      width: 60%;
    }
    ${({ theme }) => theme.breakpoints.up('md')} {
      width: 40%;
    }
  }
  ${({ theme }) => theme.breakpoints.up('lg')} {
    padding-left: 2rem;
    padding-right: 4rem;
  }
  .deposit-header {
    padding: 0 0 0.5rem;
    ${({ theme }) => theme.breakpoints.up('sm')} {
      flex-direction: column;
      h6:first-child {
        color: ${({ theme }) => theme.palette.primary.light};
      }
    }
  }
  .card-deposit,
  .card-transaction {
    margin-top: 1rem;
    ${({ theme }) => theme.breakpoints.up('md')} {
      margin-top: 0;
    }
    .deposit-filter {
      ${({ theme }) => theme.breakpoints.up('sm')} {
        margin-top: 1rem;
        justify-content: space-between;
      }
      div:first-child {
        width: 12rem;
      }
    }
    button {
      padding: 0.5rem;
      min-width: 0;
      span {
        font-size: 0.7rem;
      }
    }
  }

  .transaction-details {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    .board {
      & > div {
        background-color: #eff1ff;
      }
    }
  }
  .board {
    & > div {
      display: flex;
      height: 100%;
      width: 100%;
      padding: 1rem;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  .deposit-board,
  .board,
  .transaction-board {
    height: 7rem;

    ${({ theme }) => theme.breakpoints.up('sm')} {
      height: 18rem;
    }
  }
`;

export const ActionCards = (Comp) => styled(Comp)`
  .action-card {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: auto;
      img {
        height: 1.2rem;
        margin-bottom: 0;
        margin-right: 0.5rem;
      }
    }
  }
`;
