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
  fullName: yup.string().required('Bạn quên nhập tên!'),
  bank: yup.string().required('Bạn quên nhập số điện thoại!'),
  bankNum: yup.number().required('Bạn quên nhập số tài khoản!'),
});
interface BankSettingFormProps {
  handleClose: () => void;
}

const BankSettingForm = ({ handleClose }: BankSettingFormProps) => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      bank: '',
      bankNum: '',
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
            Tài khoản nhận tiền
          </Box>
          <CloseIcon onClick={handleClose} />
        </Box>

        <StyledTextField
          label='Chủ tài khoản'
          name='fullName'
          onChange={formik.handleChange}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
        />
        <StyledTextField
          label='Ngân hàng'
          name='bank'
          onChange={formik.handleChange}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
        />
        <StyledTextField
          label='Số tài khoản'
          name='bankNum'
          onChange={formik.handleChange}
          error={formik.touched.bankNum && Boolean(formik.errors.bankNum)}
        />
        <StyledButton variant='contained' color='primary' onClick={() => formik.handleSubmit()}>
          Cập nhật
        </StyledButton>
      </Box>
    </>
  );
};

export default BankSettingForm;
