import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Form, Formik, useField } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/redux/store';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Fonts } from '../../../shared/constants/AppEnums';
import { CremaTheme } from '../../../types/AppContextPropsType';
import { forgetPassword } from '../../../redux/actions/JWTAuth';

const useStyles = makeStyles((theme: CremaTheme) => ({
  wrap: {
    width: '1440px',
    height: '810px',
    display: 'flex',
    '@media screen and (max-width: 750px)': {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
      background: '#fff',
      justifyContent: 'center',
      padding: '0 20px',
    },
  },
  left: {
    width: '50%',
    backgroundImage: 'url(/assets/images/login-left.png)',
    '@media screen and (max-width: 750px)': {
      width: '100%',
    },
  },
  right: {
    background: '#fff',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '@media screen and (max-width: 750px)': {
      width: '100%',
    },
  },
  rightInner: {
    '@media screen and (max-width: 750px)': {
      width: '100%',
    },
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
    '@media screen and (max-width: 750px)': {
      fontSize: '18px',
    },
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
  loginAgain: {
    cursor: 'pointer',
    textAlign: 'left',
    display: 'block',
    marginBottom: '15px',
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
}));

const MyTextField = (props: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return <TextField {...props} {...field} helperText={errorText} error={!!errorText} />;
};
const validationSchema = yup.object({
  email: yup.string().email().required('Bạn quên nhập email!'),
  username: yup.string().required('Bạn quên nhập tên đăng nhập'),
});

const Signin: React.FC<{}> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state: AppState) => state.auth.errors.forgetPassword);
  const isLoading = useSelector((state: AppState) => state.auth.loadings.forgetPassword);
  const isFogotSuccess = useSelector((state: AppState) => state.auth.forgotPasswordSuccess);

  const onGoToSignIn = () => {
    history.push('/signin');
    dispatch({ type: 'RESET_FORGET_PASSWORD_SUCCESS_STATUS' });
  };

  return (
    <Box className={classes.wrap}>
      <Box className={classes.left} />
      <Box className={classes.right}>
        <Box className={classes.rightInner}>
          <Box className={classes.title}>Tìm lại mật khẩu</Box>
          {isFogotSuccess ? (
            <>
              <Box fontSize="16px" color="#90A0B7" mb="30px">
                Bạn hãy đăng nhập vào email để lấy lại mật khẩu mới!
              </Box>
              <Box component="span" className={classes.loginAgain} onClick={onGoToSignIn} fontSize={15}>
                Quay về trang đăng nhập
              </Box>
            </>
          ) : (
            <Formik
              validateOnChange
              initialValues={{
                email: '',
                username: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                dispatch(forgetPassword({ username: data.username, email: data.email }));
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form noValidate autoComplete="off">
                  <Box mb={{ xs: 5, xl: 8 }}>
                    <MyTextField placeholder="Nhập tên đăng nhập" name="username" label="Tên đăng nhập" fullWidth />
                  </Box>

                  <Box mb={{ xs: 5, xl: 8 }}>
                    <MyTextField placeholder="Nhập email" name="email" label="Email" fullWidth />
                  </Box>
                  <Box component="span" className={classes.pointer} onClick={onGoToSignIn} fontSize={15}>
                    Đăng nhập
                  </Box>
                  <Box>
                    {error && (
                      <Box fontSize="14px" color="#F7685B" marginBottom="10px" textAlign="center">
                        {error}
                      </Box>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                      className={classes.btnRoot}
                      fullWidth
                    >
                      {isLoading ? <CircularProgress size={30} color="inherit" /> : 'Tìm lại mật khẩu'}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Signin;
