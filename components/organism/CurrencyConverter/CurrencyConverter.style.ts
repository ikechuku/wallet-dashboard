import styled from 'styled-components';
import { Box } from '@material-ui/core';

const MoneyOptionsStyle = ({ bg, activeBg, activeColor, inactiveColor }) => {
  const btn = (color, btnBg) => `background: ${btnBg};
    svg {
      fill: ${color};
    }
    h6 {
      color: ${color};
    }`;

  return `
    .money-option {
      border-radius: .5rem;
      background: ${bg};
      padding: 0.4rem;
      button {
        ${btn(inactiveColor, 'transparent')}
        &.active {
          ${btn(activeColor, activeBg)}
        }
      }
    }
    `;
};

const PayOptionStyle = ({ activeColor, inactiveColor }) => {
  const btn = (color) => `
    svg {
      fill: ${color};
      color: ${color};
    }
    h6 {
      font-weight: 400;
      color: ${color};
    }`;

  return `
  .pay-option {
      ${({ theme }) => theme.breakpoints.down('sm')} {
        span,
        h5 {
          font-size: 1.2rem;
        }
        .transfer-msg {
          font-size: 0.8rem;
        }
        img {
          width: 1.5em !important;
          height: 1.5em !important;
        }
      }
      margin-bottom: .5rem;
      button {
        background: transparent;
        ${btn(inactiveColor)}
        &.active {
          ${btn(activeColor)}
        }
      }
    }
    `;
};

const MoneyConverterStyle = ({ currencyColor, titleColor }) => {
  return `
    .money-converter {
      .currency{
        color: ${currencyColor};
      }
      .money-value {
        font-size: 1.2rem;
        color: ${currencyColor};
        input {
          text-align: right;
        }
      }
      svg {
        fill: ${currencyColor};
        color: ${currencyColor};
      }
      .transfer-msg{
        color: ${titleColor};
      }
    }
    `;
};

const ConverterStyle = (theme, hrColor) => {
  return `
  width: 100%;
  hr {
    height: 1px;
    background: ${hrColor};
  }
    `;
};

export default styled(Box)`
  & {
    &.home {
      /* background: ${({ theme }) => theme.palette.primary.main}; */
      .hd {
        border-radius: .8rem;
        background-color: ${({ theme }) => theme.palette.primary.main};
      }
      /* .rate-info {
        height: 12rem;
      } */
      ${({ theme }) => theme.breakpoints.up('sm')} {
        width: 90%;
      }
      /* ${({ theme }) => theme.breakpoints.up('sm')} {
        .rate-info {
          height: 14rem;
        }
      } */
      ${({ theme }) => ConverterStyle(theme, theme.palette.info.main)}     
      ${({ theme }) => theme.breakpoints.up('md')} {
        width: 400px;
      }
      ${({ theme }) =>
        MoneyOptionsStyle({
          bg: theme.palette.primary.dark,
          activeBg: theme.palette.info.main,
          activeColor: '#fff',
          inactiveColor: 'rgba(255, 255, 255, 0.3)',
        })}
      ${({ theme }) =>
        PayOptionStyle({
          activeColor: theme.palette.secondary.main,
          inactiveColor: '#fff',
        })}
      ${MoneyConverterStyle({
        currencyColor: '#fff',
        titleColor: 'rgba(255, 255, 255, 0.4)',
      })}
    }
    &.transfer-ctvr {
      ${({ theme }) => ConverterStyle(theme, 'rgb(210, 219, 248)')} 
      .hd {
        border-radius: .8rem;
        box-shadow: 0 1px 2px 2px #f5f5f5;
        background-color: #fff;
      }
      ${({ theme }) => theme.breakpoints.up('sm')} {
        width: 500px;
      }
      
      ${({ theme }) =>
        MoneyOptionsStyle({
          bg: 'rgb(237, 240, 255)',
          activeBg: theme.palette.primary.light,
          activeColor: '#fff',
          inactiveColor: 'rgba(0, 0, 0, 0.2)',
        })}
      ${({ theme }) =>
        PayOptionStyle({
          activeColor: theme.palette.secondary.main,
          inactiveColor: 'rgb(210, 219, 248)',
        })}
      ${({ theme }) =>
        MoneyConverterStyle({
          currencyColor: theme.palette.primary.light,
          titleColor: 'rgb(157, 168, 182)',
        })}
  }
`;
