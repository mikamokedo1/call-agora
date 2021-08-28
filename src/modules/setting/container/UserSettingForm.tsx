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
  phone: yup.string().required('Bạn quên nhập số điện thoại!'),
  email: yup.string().email().required('Bạn quên nhập email!'),
});

const UserSettingForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      phone: '',
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Box bgcolor='#fff' borderRadius='8px' p='20px' flexDirection='column' display='flex' width='100%'>
      <Box fontWeight='bold' mb='10px'>
        Thông tin tài khoản
      </Box>
      <StyledTextField
        label='Họ và tên'
        name='fullName'
        onChange={formik.handleChange}
        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
      />
      <StyledTextField
        label='Số điện thoại'
        name='phone'
        onChange={formik.handleChange}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
      />
      <StyledTextField
        label='Email'
        name='email'
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
      />
      <StyledButton variant='contained' color='primary' onClick={() => formik.handleSubmit()}>
        Cập nhật
      </StyledButton>
    </Box>
  );
};

export default UserSettingForm;
