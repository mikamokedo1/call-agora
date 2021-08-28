import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import { useFormik } from 'formik';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const StyledTextField = styled(TextField)`
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;
const validationSchema = yup.object({
  fullName: yup.string().required('Bạn quên nhập tên!'),
  phone: yup.string().required('Bạn quên nhập số điện thoại!'),
  email: yup.string().email().required('Bạn quên nhập email!'),
});

interface UserSettingFormProps {
  handleEditBank: () => void;
}

const UserSettingForm = ({ handleEditBank }: UserSettingFormProps) => {
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
    <Box
      bgcolor='#fff'
      borderRadius='8px'
      p='20px'
      flexDirection='column'
      display='flex'
      width='100%'
      boxShadow='0px 2x rgba(163, 171, 185, 0.24)'>
      <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
        <Box
          width='105px'
          height='105px'
          display='flex'
          justifyContent='center'
          alignItems='center'
          position='relative'>
          <img src='https://via.placeholder.com/150x150' alt='avatar' style={{ borderRadius: '50%' }} />
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            width='24px'
            height='24px'
            style={{ position: 'absolute', bottom: '5px', right: '5px', cursor: 'pointer' }}
            bgcolor='#fff'
            borderRadius='50%'
            p='3px'>
            <CameraAltIcon style={{ fontSize: '20px' }} />
          </Box>
        </Box>
        <Box fontWeight='bold' mb='5px' mt='10px' fontSize='16px'>
          Nguyễn Văn A
        </Box>
        <Box color='#90A0B7' fontSize='14px'>
          Cộng tác viên
        </Box>
      </Box>
      <Box
        onClick={handleEditBank}
        mb='20px'
        mt='20px'
        borderLeft='2px solid #34AC6D'
        bgcolor='#fff'
        display='flex'
        py='10px'
        px='20px'
        alignItems='center'
        justifyContent='space-between'
        borderBottom='1px solid #F5F6F8'
        borderTop='1px solid #F5F6F8'>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <img src='/assets/images/dasboard/cardnew.svg' alt='card' />
          <Box ml='20px'>
            <Box color='#90A0B7'>Tài khoản</Box>
            <Box fontWeight='bold'>*****2222</Box>
          </Box>
        </Box>

        <ArrowRightAltIcon />
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
      <Button variant='outlined' color='primary' style={{ marginTop: '30px' }}>
        Chính sách cộng tác viên
      </Button>
      <StyledButton variant='contained' color='primary' onClick={() => formik.handleSubmit()} fullWidth>
        Cập nhật
      </StyledButton>
    </Box>
  );
};

export default UserSettingForm;
