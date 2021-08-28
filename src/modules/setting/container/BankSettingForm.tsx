import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import { useFormik } from 'formik';

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

const BankSettingForm = () => {
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
    <Box bgcolor='#fff' borderRadius='8px' p='20px' flexDirection='column' display='flex' width='100%'>
      <Box fontWeight='bold' mb='10px'>
        Tài khoản nhận tiền
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
  );
};

export default BankSettingForm;
