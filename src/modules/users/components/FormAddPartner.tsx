import React from 'react';
import Box from '@material-ui/core/Box';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import { useFormik } from 'formik';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'src/redux/store';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { createSellers } from 'src/redux/actions/dashboard';

const StyledTextField = styled(TextField)`
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  width: 160px;
  margin-top: 20px;
  @media screen and (max-width: 750px) {
    margin: 20px auto;
  }
`;

export const useStyles = makeStyles(() => ({
  wrap: {
    transform: 'translate(-50%, -50%)',
    zIndex: 12,
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    flexDirection: 'column',
    display: 'flex',
    width: '540px',
    position: 'absolute',
    top: '40%',
    left: '50%',
    '@media screen and (max-width: 750px)': {
      width: '100%',
      left: '0',
      transform: 'translate(0, -50%)',
    },
  },
}));

const validationSchema = yup.object({
  fullName: yup.string().required('Bạn quên nhập tên!'),
  phone: yup.number().required('Bạn quên nhập số điện thoại!'),
  email: yup.string().email().required('Bạn quên nhập email!'),
});
interface FormAddPartnerProps {
  handleClose: () => void;
}

const FormAddPartner = ({ handleClose }: FormAddPartnerProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector((state: AppState) => state.dashboard.errors.createSeller);
  const isLoading = useSelector((state: AppState) => state.dashboard.loadings.createSeller);
  const formik = useFormik({
    initialValues: {
      fullName: '',
      phone: '',
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(createSellers(values.fullName, values.email, values.phone));
    },
  });

  return (
    <>
      <Box width="100%" height="100%" bgcolor="rgba(0,0,0,0.7)" position="absolute" left="0px" top="0px" zIndex={10} />
      <Box className={classes.wrap}>
        <Box display="flex" justifyContent="space-between">
          <Box fontWeight="bold" mb="10px" fontSize="16px">
            Thêm cộng tác viên
          </Box>
          <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </Box>
        <StyledTextField
          label="Họ và tên"
          value={formik.values.fullName}
          name="fullName"
          onChange={formik.handleChange}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
        />
        <StyledTextField
          label="Số điện thoại"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          type="number"
        />
        <StyledTextField
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
        />

        {error && (
          <Box fontSize="14px" color="#F7685B" marginBottom="10px" textAlign="center">
            {error}
          </Box>
        )}
        <StyledButton variant="contained" color="primary" onClick={() => formik.handleSubmit()}>
          {isLoading ? <CircularProgress size={30} color="inherit" /> : 'Thêm'}
        </StyledButton>
      </Box>
    </>
  );
};

export default FormAddPartner;
