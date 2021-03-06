import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import AppAnimate from '../../../@crema/core/AppAnimate';
import UserSettingForm from '../container/UserSettingForm';
import BankSettingForm from '../container/BankSettingForm';
import PasswordSettingForm from '../container/PasswordSettingForm';

const StyledBox = styled.div`
  display: flex;
  max-width: 450px;
`;

const PageOne = () => {
  const [editBankFlag, setEditBankFlag] = useState(false);
  const [editPasswordFlag, setEditPasswordFlag] = useState(false);
  return (
    <>
      {editBankFlag && <BankSettingForm handleClose={() => setEditBankFlag(false)} />}
      {editPasswordFlag && <PasswordSettingForm handleClose={() => setEditPasswordFlag(false)} />}
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <StyledBox>
          <UserSettingForm
            handleEditBank={() => setEditBankFlag(true)}
            handleEditPassword={() => setEditPasswordFlag(true)}
          />
        </StyledBox>
      </AppAnimate>
    </>
  );
};

export default PageOne;
