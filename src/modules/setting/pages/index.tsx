import React from 'react';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import AppAnimate from '../../../@crema/core/AppAnimate';
import UserSettingForm from '../container/UserSettingForm';
import BankSettingForm from '../container/BankSettingForm';

const StyledBox = styled.div`
  display: flex;
  width: calc((100% - 30px) / 2);
`;

const PageOne = () => {
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box display='flex' justifyContent='space-between'>
        <StyledBox>
          <UserSettingForm />
        </StyledBox>
        <StyledBox>
          <BankSettingForm />
        </StyledBox>
      </Box>
    </AppAnimate>
  );
};

export default PageOne;
