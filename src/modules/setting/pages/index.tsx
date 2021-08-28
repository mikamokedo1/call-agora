import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import AppAnimate from '../../../@crema/core/AppAnimate';
import UserSettingForm from '../container/UserSettingForm';
import BankSettingForm from '../container/BankSettingForm';

const StyledBox = styled.div`
  display: flex;
  width: 450px;
`;

const PageOne = () => {
  const [editBankFlag, setEditBankFlag] = useState(false);
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <>
        {editBankFlag && <BankSettingForm handleClose={() => setEditBankFlag(false)} />}
        <StyledBox>
          <UserSettingForm handleEditBank={() => setEditBankFlag(true)} />
        </StyledBox>
      </>
    </AppAnimate>
  );
};

export default PageOne;
