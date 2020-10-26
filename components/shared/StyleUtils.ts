import styled from 'styled-components';

/* eslint-disable import/prefer-default-export */
export const ActiveStyle = (active) => `opacity: ${active ? 1 : 0.5};`;

export const PopAnimStyle = (active, style = '') =>
  `transition: all 0.2s ease-out;
&:hover {
  ${active && `transform:  scale(1.08); ${style}`}
}`;

export const InAppHeaderStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #2033a0;
  ${({ theme }) => theme.breakpoints.up('md')} {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  height: 4.5rem;
  padding: 0.6rem;
`;
