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
import { onJwtSignIn } from '../../../redux/actions';
import { Fonts } from '../../../shared/constants/AppEnums';
import { CremaTheme } from '../../../types/AppContextPropsType';

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
    marginBottom: '30px',
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
  return <TextField {...props} {...field} helperText={errorText} error={!!errorText} fullWidth />;
};
const validationSchema = yup.object({
  userName: yup.string().required('Bạn quên nhập tài khoản!'),
  password: yup.string().required('Bạn quên nhập mật khẩu!'),
});

const Signin: React.FC<{}> = () => {
  const common = useSelector((state: AppState) => state.common.message);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const onGoToForgetPassword = () => {
    history.push('/forget-password');
  };

  return (
    <Box className={classes.wrap}>
      <Box className={classes.left} />
      <Box className={classes.right}>
        <Box>
          <Box className={classes.title}>Đăng nhập CRM Site</Box>
          <Formik
            validateOnChange
            initialValues={{
              userName: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              dispatch(onJwtSignIn({ username: data.userName, password: data.password }));
              setSubmitting(false);
            }}>
            {({ isSubmitting }) => (
              <Form noValidate autoComplete='off'>
                <Box mb={{ xs: 5, xl: 8 }}>
                  <MyTextField placeholder='Nhập ID' name='userName' label='Tài Khoản' />
                </Box>

                <Box mb={{ xs: 3, lg: 4 }}>
                  <MyTextField type='password' placeholder='Nhập mật khẩu' label='Mật khẩu' name='password' />
                </Box>

                <Box component='span' className={classes.pointer} onClick={onGoToForgetPassword} fontSize={15}>
                  Quên mật khẩu?
                </Box>
                {common && <Box className={classes.error}>{common}</Box>}

                <Box>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    disabled={isSubmitting}
                    className={classes.btnRoot}
                    fullWidth>
                    Đăng nhập
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Signin;
