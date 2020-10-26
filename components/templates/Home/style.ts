import styled from 'styled-components';
import Assets from '../../../utils/assets';

const { MOBILE_HOME_BG, HOME_BG, MOBILE_FOOTER_BG, FOOTER_BG } = Assets;

export default styled.div`
  & {
    overflow: hidden;
    overflow-y: auto;
    height: 100%;
    background-color: #f7f8ff;
    h4 {
      font-size: 2.2rem;
      ${({ theme }) => theme.breakpoints.up('md')} {
        font-size: 2.6rem;
      }
    }
    & > hr {
      color: rgba(0, 0, 0, 1);
      margin: 0 auto;
      height: 2px;
      width: 80%;
    }
  }
`;

export const Banner = styled.div`
    background-image: url('${require(`../../../public${MOBILE_HOME_BG}`)}');
    background-size: cover;
    height: 800px;
    width: 100%;
    background-repeat: no-repeat;
    padding: 0 0 4rem;
    ${({ theme }) => theme.breakpoints.up('sm')} {
      background-color: transparent;
      height: 1800px;
    }
    @media(min-width: 905px){
      background-image: url('${require(`../../../public${HOME_BG}`)}');
      height: 2000px;
    }
    ${({ theme }) => theme.breakpoints.up('md')} {
      height: 1600px;
    }
    ${({ theme }) => theme.breakpoints.up('lg')} {
      height: 1380px;
    }
`;

export const FooterBg = styled.div`
    background-image: url('${require(`../../../public${MOBILE_FOOTER_BG}`)}');
    background-repeat: no-repeat;
    height: 1050px;
    background-size: cover;
    width:100%;
    padding: 0 0 2rem;
    & > div {
      height: 100%;
    }
    ${({ theme }) => theme.breakpoints.up('sm')} {
      background-image: url('${require(`../../../public${FOOTER_BG}`)}');
      width: 103%;
      background-position-x: -.15rem;
      height: 600px;
    }
    ${({ theme }) => theme.breakpoints.up('md')} {
      height: 500px;
    }
`;

export const TestimonialStyle = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 0.5rem;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    padding-left: 2rem;
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    padding-left: 0;
  }

  .body {
    position: relative;
    ${({ theme }) => theme.breakpoints.up('md')} {
      margin-bottom: 1rem;
      width: 115%;
      padding: 0 2rem;
    }
  }
  .right-arrow {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      left: -6rem;
    }
    ${({ theme }) => theme.breakpoints.up('md')} {
      left: -10rem;
    }
  }
  .header {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      margin-top: 0;
    }
  }
  img {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      width: auto;
    }
  }
  h4 {
    width: 100%;
    line-height: 2rem;
    font-size: 1.5rem;
    ${({ theme }) => theme.breakpoints.up('sm')} {
      line-height: 2.5rem;
      font-size: 2.3rem;
      width: 70%;
      min-width: 25rem;
    }
  }
`;

export const SendCrypto = styled.section`
  padding: 1rem 0 2rem;
  ${({ theme }) => theme.breakpoints.up('md')} {
    padding: 3rem 0 2rem;
  }
  ${({ theme }) => theme.breakpoints.up('md')} {
    padding: 4rem 0 0;
  }
  .send-crypto {
    ${({ theme }) => theme.breakpoints.up('md')} {
      padding: 4rem 0;
    }
    .how-btns {
      padding: 1rem 0 0;
      width: 100%;
      justify-content: space-between;
      display: flex;
      flex-direction: column;
      button {
        margin: 0.3rem 0;
        font-weight: 300;
        width: 100%;
        height: 3.2rem;
        font-size: 1rem;
      }
      ${({ theme }) => theme.breakpoints.up('md')} {
        padding: 0;
        width: 450px;
        flex-direction: row;
        button {
          width: 48%;
        }
      }
      ${({ theme }) => theme.breakpoints.up('lg')} {
        width: 80%;
      }
    }
    .send-crypto-msg {
      width: 100%;
      justify-content: center;
      text-align: center;
      h4 {
        width: 100%;
        line-height: 2.5rem;
        margin: 0 auto 1rem;
        font-size: 1.9rem;
        ${({ theme }) => theme.breakpoints.up('sm')} {
          font-size: 2.3rem;
          width: 70%;
          min-width: 25rem;
        }
      }
      h6 {
        font-size: 1.1rem;
        ${({ theme }) => theme.breakpoints.up('md')} {
          font-size: 1.2rem;
        }
      }
      ${({ theme }) => theme.breakpoints.up('sm')} {
        padding: 0 2rem;
      }
      ${({ theme }) => theme.breakpoints.up('md')} {
        justify-content: flex-start;
        padding: 0 2rem;
        text-align: left;
        h4 {
          margin: 0 0 2rem;
        }
      }
      ${({ theme }) => theme.breakpoints.up('lg')} {
        padding: 1rem;
        h4 {
          width: 80%;
        }
      }
    }
    .send-crypto-img {
      img {
        min-width: 300px;
        width: 50%;
        background-size: cover;
        ${({ theme }) => theme.breakpoints.up('md')} {
          width: 100%;
        }
        ${({ theme }) => theme.breakpoints.up('lg')} {
          width: 85%;
        }
      }
      justify-content: center;
      align-items: center;
      ${({ theme }) => theme.breakpoints.up('md')} {
        justify-content: flex-end;
        align-items: flex-end;
      }
    }
  }
`;

export const PaymentType = styled.section`
  .pay-types {
    padding-right: 1rem;
    padding-left: 1rem;
    ${({ theme }) => theme.breakpoints.up('md')} {
      padding: 4rem 0;
    }
    flex-direction: column-reverse;
    ${({ theme }) => theme.breakpoints.up('md')} {
      flex-direction: row;
    }
    .pay-types-hd {
      padding: 0 1rem;
      & > div {
        height: 100%;
        min-height: 300px;
      }
    }
    .pay-types-grid {
      text-align: center;

      .img-box {
        align-items: center;
        ${({ theme }) => theme.breakpoints.up('md')} {
          align-items: flex-end;
        }
        img {
          background-size: contain;
        }
      }
    }
    .pay-types-msg {
      text-align: center;
      h4 {
        width: 90%;
        min-width: 15rem;
        margin: 0 auto;

        font-size: 1.5rem;
        ${({ theme }) => theme.breakpoints.up('sm')} {
          font-size: 2.3rem;
        }
        ${({ theme }) => theme.breakpoints.up('md')} {
          width: 70%;
          margin: 0;
        }
      }
      h6 {
        width: 100%;
        font-size: 1.1rem;
        ${({ theme }) => theme.breakpoints.up('md')} {
          font-size: 1.2rem;
          width: 90%;
        }
      }
      ${({ theme }) => theme.breakpoints.up('md')} {
        text-align: left;
      }
    }
  }
`;

export const OptionMoney = styled.section`
  & {
    background-color: #fff;
    .pay-options {
      padding: 1.5rem 2rem 4rem;
      ${({ theme }) => theme.breakpoints.up('md')} {
        padding: 3.5rem 0 6rem;
      }
    }
    .pay-options-msg {
      padding: 3rem 0;
      h4 {
        text-align: center;
        width: 100%;
        font-size: 1.9rem;
        margin: 0 0 2rem;
        ${({ theme }) => theme.breakpoints.up('sm')} {
          margin: 0 0 3rem;
          font-size: 2.3rem;
          width: 70%;
          min-width: 25rem;
        }
        ${({ theme }) => theme.breakpoints.up('md')} {
          width: 40%;
          min-width: 30rem;
        }
      }
    }
    .pay-options-grid {
      ${({ theme }) => theme.breakpoints.up('md')} {
        padding: 0 11rem;
      }
      .card-box {
        padding: 1rem;
        box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.1);
        ${({ theme }) => theme.breakpoints.up('sm')} {
          padding: 0.5rem;
        }
        text-align: center;
        ${({ theme }) => theme.breakpoints.up('sm')} {
          text-align: left;
        }
        .body {
          min-height: 230px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.3rem 0.8rem;
        }
        img {
          width: 3rem;
          height: 3rem;
          margin: 0 auto;
          background-size: contain;
          ${({ theme }) => theme.breakpoints.up('sm')} {
            margin: 0;
          }
        }
        h6 {
          line-height: 1.43;
          font-size: 0.9rem;
          min-width: 15rem;
          margin: 0 auto;
          width: 100%;
          ${({ theme }) => theme.breakpoints.up('sm')} {
            margin: 0;
          }
        }
        h6:first-of-type {
          width: 100%;
        }
      }
    }
  }
`;

export const HeaderStyle = styled.section`
  padding: 0 0 2rem;
  ${({ theme }) => theme.breakpoints.up('md')} {
    padding: 0 0 3rem;
  }
  ${({ theme }) => theme.breakpoints.up('lg')} {
    padding: 1.2rem 0 3rem;
  }
  .greet {
    flex-direction: column-reverse;
    text-align: center;
    ${({ theme }) => theme.breakpoints.up('md')} {
      padding: 0 2rem;
      text-align: left;
      flex-direction: row;
    }
    ${({ theme }) => theme.breakpoints.up('lg')} {
      padding: 0;
    }
  }
  .action-btns {
    padding: 0.3rem 0 0;
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
  .greet-msg,
  .current-rates {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      padding: 2rem 0;
    }
  }
  .greet-msg {
    h3 {
      font-size: 2.2rem;
      ${({ theme }) => theme.breakpoints.up('lg')} {
        font-size: 2.4rem;
      }
    }
    h6 {
      font-size: 1.1rem;
      ${({ theme }) => theme.breakpoints.up('md')} {
        font-size: 1rem;
      }
      ${({ theme }) => theme.breakpoints.up('lg')} {
        font-size: 1.2rem;
      }
    }
    ${({ theme }) => theme.breakpoints.up('sm')} {
      padding: 2rem 0;
    }
    ${({ theme }) => theme.breakpoints.up('md')} {
      padding: 4rem 4rem 4rem 0;
    }
  }
  ${({ theme }) => theme.breakpoints.down('sm')} {
    .rate-con {
      width: inherit;
      p {
        font-size: 1rem;
        margin-bottom: 0.5rem;
      }
    }
  }
  .current-rates {
    h3 {
      font-size: 2rem;
      text-align: center;
      width: 90%;
      margin: '1rem 0 3rem' ${({ theme }) => theme.breakpoints.up('sm')} {
        font-size: 2.3rem;
        margin: 0 0 2rem;
        width: 80%;
      }
    }
    justify-content: center;
    flex-direction: column;
    ${({ theme }) => theme.breakpoints.up('md')} {
      justify-content: flex-end;
      flex-direction: row;
    }
  }
`;

export const FooterStyle = styled.section`
  & {
    .header {
      justify-content: center;
      ${({ theme }) => theme.breakpoints.up('sm')} {
        justify-content: flex-start;
      }
    }
    text-align: center;
    ${({ theme }) => theme.breakpoints.up('sm')} {
      text-align: left;
    }
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    color: ${({ theme }) => theme.palette.secondary.contrastText};
    h6 {
      color: white;
      font-weight: 500;
      text-align: center;
    }

    p {
      color: ${({ theme }) => theme.palette.secondary.contrastText};
      font-weight: 300;
      opacity: 0.7;
      font-size: 0.8rem;
    }
  }
`;

export const DownloadApp = styled.section`
  .download-app {
    padding: 2rem 1;
    ${({ theme }) => theme.breakpoints.up('sm')} {
      padding: 4rem 2rem;
    }
    ${({ theme }) => theme.breakpoints.up('md')} {
      padding: 4rem 5rem;
    }
    ${({ theme }) => theme.breakpoints.up('lg')} {
      padding: 4rem 9rem;
    }
    /* .download-btn {
      img {
        height: 2.3rem;
      }
    } */
    .download-app-img {
      justify-content: center;
      margin-left: 7rem;
      margin-top: 3rem;
      ${({ theme }) => theme.breakpoints.up('sm')} {
        margin-left: 10rem;
      }
      ${({ theme }) => theme.breakpoints.up('md')} {
        justify-content: flex-start;
        margin-left: 0;
        padding-left: 8rem;
      }
      img {
        background-size: contain;
        height: 400px;
        ${({ theme }) => theme.breakpoints.up('md')} {
          height: 500px;
        }
      }
    }
    .download-app-msg {
      text-align: center;
      padding: 0;
      h4 {
        width: 90%;
        min-width: 15rem;
        margin: 0 auto;

        font-size: 1.5rem;
        ${({ theme }) => theme.breakpoints.up('sm')} {
          font-size: 2.3rem;
        }
        ${({ theme }) => theme.breakpoints.up('md')} {
          margin: 0;
        }
      }
      h6 {
        width: 100%;
        font-size: 0.8rem;
        color: rgba(0, 0, 0, 0.4);
        ${({ theme }) => theme.breakpoints.up('sm')} {
          font-size: 1rem;
        }
        ${({ theme }) => theme.breakpoints.up('md')} {
          color: rgba(0, 0, 0, 0.8);
          font-size: 1.2rem;
        }
      }
      ${({ theme }) => theme.breakpoints.up('md')} {
        text-align: left;
      }
    }
  }
`;

export const ChooseSkarpa = styled.section`
  .choose-skarpa {
    h4 {
      font-size: 2rem;
      ${({ theme }) => theme.breakpoints.up('sm')} {
        font-size: 2.5rem;
      }
    }
  }
  .choose-skarpa-grid {
    .image-box {
      padding: 1rem;
      text-align: center;
      img {
        width: 6rem;
        margin: 0 auto;
        height: 100px;
        ${({ theme }) => theme.breakpoints.up('md')} {
          width: 8rem;
          height: 150px;
        }
      }
      h6,
      p {
        width: 60%;
        min-width: 15rem;
        margin: 0 auto;
        ${({ theme }) => theme.breakpoints.up('sm')} {
          width: 60%;
        }
        ${({ theme }) => theme.breakpoints.up('md')} {
          width: 55%;
        }
        ${({ theme }) => theme.breakpoints.up('lg')} {
          width: 80%;
        }
      }
      h6 {
        line-height: 1.6rem;
      }
      p {
        /* line-height: 1rem; */
        font-size: 0.85rem;
      }
    }
  }
`;
