import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Form, Formik, useField } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { Fonts } from '../../../shared/constants/AppEnums';
import { CremaTheme } from '../../../types/AppContextPropsType';
import OTPInput from './InputOtp';

const useStyles = makeStyles((theme: CremaTheme) => ({
  wrap: {
    width: '1440px',
    height: '810px',
    display: 'flex',
  },
  left: {
    width: '50%',
    backgroundImage: 'url(/assets/images/login-left.png)',
  },
  right: {
    background: '#fff',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointer: {
    cursor: 'pointer',
    textAlign: 'right',
    display: 'block',
    marginBottom: '15px',
    fontWeight: 'bold',
  },
  btnRoot: {
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    fontWeight: Fonts.REGULAR,
    fontSize: 16,
    textTransform: 'capitalize',
  },
  textGrey: {
    color: theme.palette.grey[500],
  },
  title: {
    fontWeight: 'bold',
    fontSize: '36px',
    marginBottom: '10px',
  },
  texforgot: {
    fontSize: '14px',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  error: {
    fontSize: '14px',
    color: '#F7685B',
  },
}));

const MyTextField = (props: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return <TextField {...props} {...field} helperText={errorText} error={!!errorText} />;
};
const validationSchema = yup.object({
  email: yup.string().email().required('Bạn quên nhập email!'),
});

const Signin: React.FC<{}> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [requested, setRequested] = useState(false);
  const [submitEmail, setSubmitEmail] = useState('');
  const [otp, setOtp] = React.useState('');
  const onGoToSignIn = () => {
    history.push('/signin');
  };
  const handleSubmitOtp = () => {
    console.log('handleSubmitOtp');
  };
  return (
    <Box className={classes.wrap}>
      <Box className={classes.left} />
      <Box className={classes.right}>
        {requested ? (
          <Box>
            <Box className={classes.title}>Xác minh email</Box>
            <Box fontSize='16px' color='#90A0B7' mb='30px'>
              Nhập 4 mã code được gửi tới&nbsp;<b>{submitEmail}</b>
            </Box>
            <OTPInput
              disabled={false}
              error={false}
              autoFocus
              isNumberInput
              length={6}
              onChangeOTP={(otp) => setOtp(otp)}
            />
            <Button
              onClick={handleSubmitOtp}
              variant='contained'
              color='primary'
              disabled={false}
              className={classes.btnRoot}
              fullWidth
              style={{ marginTop: '30px' }}>
              Tìm lại mật khẩu
            </Button>
          </Box>
        ) : (
          <Box>
            <Box className={classes.title}>Tìm lại mật khẩu</Box>
            <Box fontSize='16px' color='#90A0B7' mb='30px'>
              Nhập mail bạn đã đăng ký cho tài khoản
            </Box>
            <Formik
              validateOnChange
              initialValues={{
                email: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                console.log('foget password');
                setSubmitting(false);
                setSubmitEmail(data.email);
                setRequested(true);
              }}>
              {({ isSubmitting }) => (
                <Form noValidate autoComplete='off'>
                  <Box mb={{ xs: 5, xl: 8 }}>
                    <MyTextField placeholder='Nhập email' name='email' label='Email' fullWidth />
                  </Box>
                  <Box component='span' className={classes.pointer} onClick={onGoToSignIn} fontSize={15}>
                    Đăng nhập
                  </Box>
                  <Box>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      disabled={isSubmitting}
                      className={classes.btnRoot}
                      fullWidth>
                      Tìm lại mật khẩu
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Signin;
