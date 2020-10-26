import * as React from 'react';
import { RecipientHeaderStyle } from './styles';
import HeaderNavigation from '../../../organism/HeaderNavigation';

const RecipientHeader = () => {
  return (
    <RecipientHeaderStyle>
      <HeaderNavigation title="Recipients" />
    </RecipientHeaderStyle>
  );
};

export default RecipientHeader;
