import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import { useFormik } from 'formik';
import CloseIcon from '@material-ui/icons/Close';

const StyledTextField = styled(TextField)`
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  width: 160px;
  margin-top: 20px;
`;
const validationSchema = yup.object({
  currentPass: yup.string().required('Bạn quên nhập mật khẩu cũ!'),
  newPass: yup.string().required('Bạn quên nhập mật mới!'),
  newPassVeri: yup.string().required('Bạn quên xác thực mật khẩu mới!'),
});
interface PasswordSettingFormProps {
  handleClose: () => void;
}

const PasswordSettingForm = ({ handleClose }: PasswordSettingFormProps) => {
  const formik = useFormik({
    initialValues: {
      currentPass: '',
      newPass: '',
      newPassVeri: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <Box width='100%' height='100%' bgcolor='rgba(0,0,0,0.7)' position='absolute' left='0px' top='0px' zIndex={10} />
      <Box
        zIndex={12}
        bgcolor='#fff'
        borderRadius='8px'
        p='20px'
        flexDirection='column'
        display='flex'
        width='540px'
        position='absolute'
        top='50%'
        left='50%'
        style={{ transform: 'translate(-50%, -50%)' }}>
        <Box display='flex' justifyContent='space-between'>
          <Box fontWeight='bold' mb='10px'>
            Đổi mật khẩu
          </Box>
          <CloseIcon onClick={handleClose} />
        </Box>

        <StyledTextField
          label='Mật khẩu hiện tại'
          name='currentPass'
          onChange={formik.handleChange}
          error={formik.touched.currentPass && Boolean(formik.errors.currentPass)}
          type='password'
        />
        <StyledTextField
          label='Mật khẩu mới'
          name='newPass'
          onChange={formik.handleChange}
          error={formik.touched.newPass && Boolean(formik.errors.newPass)}
          type='password'
        />
        <StyledTextField
          label='Nhập lại mật khẩu mới'
          name='newPassVeri'
          onChange={formik.handleChange}
          error={formik.touched.newPassVeri && Boolean(formik.errors.newPassVeri)}
          type='password'
        />
        <StyledButton variant='contained' color='primary' onClick={() => formik.handleSubmit()}>
          Cập nhật
        </StyledButton>
      </Box>
    </>
  );
};

export default PasswordSettingForm;
