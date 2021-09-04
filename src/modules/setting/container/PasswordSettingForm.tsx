import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import { useFormik } from 'formik';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'src/redux/reducers/Auth';
import { AppState } from 'src/redux/store';
import CircularProgress from '@material-ui/core/CircularProgress';
import { changePassword } from '../../../redux/actions/JWTAuth';

const StyledTextField = styled(TextField)`
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  width: 160px;
  margin-top: 20px;
  height: '40px';
`;
const validationSchema = yup.object({
  oldPassword: yup.string().required('Bạn quên nhập mật khẩu cũ!'),
  newPassword: yup
    .string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, 'Ít nhất 8 ký tự bao gồm chữ in hoa và số')
    .required('Bạn quên nhập mật mới!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), undefined], 'nhập chính xác mật khẩu mới!')
    .required('Bạn quên xác thực mật khẩu mới!'),
});
interface PasswordSettingFormProps {
  handleClose: () => void;
}

const PasswordSettingForm = ({ handleClose }: PasswordSettingFormProps) => {
  const error = useSelector((state: AppState) => state.auth.errors.changePassword);
  const isLoading = useSelector((state: AppState) => state.auth.loadings.changePassword);
  const user = useSelector(userSelector);
  const distpatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      distpatch(changePassword({ ...values, username: user?.displayName ?? '' }));
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
          <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </Box>

        <StyledTextField
          label='Mật khẩu hiện tại'
          name='oldPassword'
          onChange={formik.handleChange}
          error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
          type='password'
        />
        <StyledTextField
          label='Mật khẩu mới'
          name='newPassword'
          onChange={formik.handleChange}
          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
          type='password'
          helperText={formik.errors.newPassword}
        />
        <StyledTextField
          label='Nhập lại mật khẩu mới'
          name='confirmPassword'
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          type='password'
          helperText={formik.errors.confirmPassword}
        />
        {error && (
          <Box fontSize='14px' color='#F7685B' marginBottom='10px' textAlign='center'>
            {error}
          </Box>
        )}
        <StyledButton variant='contained' color='primary' onClick={() => formik.handleSubmit()} disabled={isLoading}>
          {isLoading ? <CircularProgress size={30} color='inherit' /> : ' Cập nhật'}
        </StyledButton>
      </Box>
    </>
  );
};

export default PasswordSettingForm;
