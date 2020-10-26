import styled from 'styled-components';

export default styled.div`
  overflow-y: hidden;
  background-color: #f7f8ff;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  .search-header {
    ${({ theme }) => theme.breakpoints.up('md')} {
      padding: 1.5rem 2rem;
    }
  }
`;

export const ProfileHeaderStyle = styled.div`
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

export const PersonalProfileStyle = (Comp) => styled(Comp)`
  ${({ theme }) => theme.breakpoints.up('md')} {
    .row {
      margin-bottom: 1rem;
      flex-direction: row;
      justify-content: space-between;
      &:nth-child(2) {
        margin-bottom: 1rem;
      }
      & > div {
        margin-bottom: 0;
        width: 48%;
      }
    }
    .button-box {
      width: 48%;
    }
  }
`;
