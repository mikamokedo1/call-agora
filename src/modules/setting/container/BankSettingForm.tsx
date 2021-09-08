import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import { useFormik } from 'formik';
import CloseIcon from '@material-ui/icons/Close';
import { userSelector } from 'src/redux/reducers/Auth';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'src/redux/store';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { changeBankInfo } from '../../../redux/actions/JWTAuth';

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
    top: '50%',
    left: '50%',
    '@media screen and (max-width: 750px)': {
      width: '100%',
      left: '0',
      transform: 'translate(0, -50%)',
    },
  },
}));

const validationSchema = yup.object({
  bankAccount: yup.string().required('Bạn quên nhập tên!'),
  bankName: yup.string().required('Bạn quên nhập số điện thoại!'),
  bankAccountNumber: yup.number().required('Bạn quên nhập số tài khoản!'),
});
interface BankSettingFormProps {
  handleClose: () => void;
}

const BankSettingForm = ({ handleClose }: BankSettingFormProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const error = useSelector((state: AppState) => state.auth.errors.changeBankInfo);
  const isLoading = useSelector((state: AppState) => state.auth.loadings.changeBankInfo);
  const [onEdit, setOnEdit] = useState(false);
  const formik = useFormik({
    initialValues: {
      bankAccount: '',
      bankName: '',
      bankAccountNumber: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(changeBankInfo({ ...values, username: user?.displayName ?? '' }));
    },
  });

  useEffect(() => {
    if (!user?.bankAccount) {
      setOnEdit(true);
    } else {
      formik.setFieldValue('bankAccount', user.bankAccount);
      formik.setFieldValue('bankName', user.bankName);
      formik.setFieldValue('bankAccountNumber', user.bankAccountNumber);
    }
  }, []);

  const onClickSubmit = () => {
    if (onEdit) {
      formik.handleSubmit();
    } else {
      setOnEdit(true);
    }
  };

  return (
    <>
      <Box width="100%" height="100%" bgcolor="rgba(0,0,0,0.7)" position="absolute" left="0px" top="0px" zIndex={10} />
      <Box className={classes.wrap}>
        <Box display="flex" justifyContent="space-between">
          <Box fontWeight="bold" mb="10px">
            Tài khoản nhận tiền
          </Box>
          <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </Box>

        <StyledTextField
          label="Chủ tài khoản"
          value={formik.values.bankAccount}
          name="bankAccount"
          onChange={formik.handleChange}
          error={formik.touched.bankAccount && Boolean(formik.errors.bankAccount)}
          disabled={!onEdit}
        />
        <StyledTextField
          label="Ngân hàng"
          name="bankName"
          value={formik.values.bankName}
          onChange={formik.handleChange}
          error={formik.touched.bankName && Boolean(formik.errors.bankName)}
          disabled={!onEdit}
        />
        <StyledTextField
          label="Số tài khoản"
          name="bankAccountNumber"
          value={formik.values.bankAccountNumber}
          onChange={formik.handleChange}
          error={formik.touched.bankAccountNumber && Boolean(formik.errors.bankAccountNumber)}
          disabled={!onEdit}
        />
        {error && (
          <Box fontSize="14px" color="#F7685B" marginBottom="10px" textAlign="center">
            {error}
          </Box>
        )}
        <StyledButton variant="contained" color="primary" onClick={onClickSubmit}>
          {isLoading ? <CircularProgress size={30} color="inherit" /> : onEdit ? 'Cập nhật' : 'Thay đổi'}
        </StyledButton>
      </Box>
    </>
  );
};

export default BankSettingForm;
