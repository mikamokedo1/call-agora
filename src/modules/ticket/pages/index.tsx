import React, { useRef, useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import { Button, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'src/redux/reducers/Auth';
import {
  departmentsSelector,
  relatedServicesSelector,
  isLoadingSendTicketSelector,
  isErrorSendTicketSelector,
  prioritySelector,
} from 'src/redux/reducers/Ticket';
import { fetchDepartmentList, fetchPriority, fetchRelatedServices, sendTicket } from 'src/redux/actions/Ticket';
import axios from 'axios';
import AppAnimate from '../../../@crema/core/AppAnimate';
import { fileToByte } from '../../../@crema/utility/Utils';

const useStyles = makeStyles(() => ({
  inner: {
    background: '#fff',
    borderRadius: '5px',
    padding: '40px 20px',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  flex: {
    display: 'flex',
  },
  marginRight: {
    marginRight: '100px',
  },
  bold: {
    fontWeight: 'bold',
  },
  formControl: {
    width: 'calc((100% - 60px) / 4)',
    '@media screen and (max-width: 750px)': {
      width: '100%',
      marginBottom: '20px',
    },
  },
  wrapFormList: {
    display: 'flex',
    marginTop: '40px',
    justifyContent: 'space-between',
    '@media screen and (max-width: 750px)': {
      flexDirection: 'column',
    },
  },
  upload: {
    display: 'flex',
    width: '80px',
    height: '80px',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#F2F2F2',
    borderRadius: '4px',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  titleInput: {
    width: '300px',
  },
  buttonDisabled: {
    backgroundColor: 'rgba(194, 207, 224, 0.2)',
    width: '300px',
    marginLeft: '20px',
  },
  wrapImagesList: {
    display: 'flex',
    marginBottom: '20px',
  },
  imageItem: {
    marginRight: '5px',
    width: '50px',
    height: '50x',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const validationSchema = yup.object({
  phong: yup.string().required('Bạn quên chọn phòng ban!'),
  dichvu: yup.string().required('Bạn quên chọn dịch vụ liên quan!'),
  title: yup.string().required('Bạn quên nhập tiêu đề!'),
  description: yup.string().required('Bạn quên nhập nội dung!'),
});

const PageOne = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const departments = useSelector(departmentsSelector);
  const relatedServices = useSelector(relatedServicesSelector);
  const priority = useSelector(prioritySelector);
  const isLoadingSendTicket = useSelector(isLoadingSendTicketSelector);
  const isErrorSendTicket = useSelector(isErrorSendTicketSelector);
  const [binaryList, setBinaryList] = useState<number[][]>([]);
  const ticketUrl = process.env.REACT_APP_API_UPLOAD_FILE;

  const refInput = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<FileList>();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      phong: 1,
      uutien: 1,
      dichvu: 1,
      title: '',
      description: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const resultUploadImage = await axios.post(ticketUrl ?? '', {
        data: binaryList.map((item) => {
          return { optionon: 2, file: item, fileName: 'shit', userName: user?.displayName };
        }),
      });
      console.log(resultUploadImage);
      // dispatch(
      //   sendTicket({
      //     subject: values.title,
      //     body: values.description,
      //     userId: user?.uid ?? '',
      //     userName: user?.displayName ?? '',
      //     email: user?.email ?? '',
      //     relatedServices: values.dichvu,
      //     department: values.phong,
      //     priority: values.uutien,
      //     image: [],
      //   }),
      // );
    },
  });
  const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files;
      setAvatar(image);
      const bytesArrays: number[][] = [];
      await Promise.all(
        Array.from(image).map(async (item) => {
          const result = await fileToByte(item);
          bytesArrays.push(result);
        }),
      );

      setBinaryList(bytesArrays);
    }
  };

  useEffect(() => {
    if (!departments.length) {
      dispatch(fetchDepartmentList());
    }
    if (!relatedServices.length) {
      dispatch(fetchRelatedServices());
    }
    if (!priority.length) {
      dispatch(fetchPriority());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <Box>
        <input
          type="file"
          ref={refInput}
          style={{ display: 'none' }}
          onChange={handleChangeAvatar}
          accept=".jpg, .jpeg, .png, .svg"
          multiple
        />
        <Box className={classes.inner} mb="20px">
          {isErrorSendTicket && (
            <Box fontSize="14px" color="#F7685B" marginBottom="10px" textAlign="center">
              {isErrorSendTicket}
            </Box>
          )}
          <Box className={classes.title}>Thông tin yêu cầu hỗ trợ</Box>
          <Box className={classes.flex}>
            <Box className={classes.marginRight}>
              <Box color="#90A0B7" mb="5px">
                Họ và tên
              </Box>
              <Box className={classes.bold}>{user?.reseller}</Box>
            </Box>
            <Box>
              <Box color="#90A0B7" mb="5px">
                Địa chỉ email
              </Box>
              <Box className={classes.bold}> {user?.email}</Box>
            </Box>
          </Box>
          <Box className={classes.wrapFormList}>
            <FormControl className={classes.formControl}>
              <InputLabel id="phong">Phòng ban</InputLabel>
              <Select
                labelId="phong"
                id="phong"
                name="phong"
                value={formik.values.phong}
                onChange={formik.handleChange}
              >
                {(departments ?? []).map((item) => {
                  return <MenuItem value={item.id}>{item.departmentName}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="dichvu">Dịch vụ liên quan</InputLabel>
              <Select
                labelId="dichvu"
                id="dichvu"
                name="dichvu"
                value={formik.values.dichvu}
                onChange={formik.handleChange}
              >
                {(relatedServices ?? []).map((item) => {
                  return <MenuItem value={item.id}>{item.relatedServicesName}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="uutien">Ưu tiên</InputLabel>
              <Select
                labelId="uutien"
                id="uutien"
                name="uutien"
                value={formik.values.uutien}
                onChange={formik.handleChange}
              >
                {(priority ?? []).map((item) => {
                  return <MenuItem value={item.id}>{item.priorityName}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box className={classes.inner}>
          <Box className={classes.title}>Thông tin yêu cầu hỗ trợ</Box>
          <Box mb="20px" className={classes.titleInput}>
            <TextField
              id="outlined-basic"
              label="Tiêu đề"
              fullWidth
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
            />
          </Box>

          <Box mb="20px">
            <Box color="#90A0B7" mb="5px">
              Nội dung
            </Box>
            <TextField
              id="outlined-basic"
              fullWidth
              placeholder="nội dung"
              variant="outlined"
              name="description"
              multiline
              rows={6}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
            />
          </Box>
          <Box color="#90A0B7" mb="10px">
            File đính kèm(Nếu có)
          </Box>
          <Box className={classes.upload} onClick={() => refInput.current?.click()}>
            <AddIcon />
            <Box>chọn file</Box>
          </Box>
          {avatar && (
            <Box className={classes.wrapImagesList}>
              {Array.from(avatar).map((item) => (
                <Box className={classes.imageItem}>
                  <img src={URL.createObjectURL(item)} alt="files" />
                </Box>
              ))}
            </Box>
          )}
          <Box className={classes.flex}>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              onClick={() => formik.handleSubmit()}
              disabled={isLoadingSendTicket}
            >
              {isLoadingSendTicket ? <CircularProgress size={30} color="inherit" /> : 'Gữi ngay'}
            </Button>
            <Button className={classes.buttonDisabled} variant="contained" onClick={(e) => formik.handleReset(e)}>
              Hủy
            </Button>
          </Box>
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default PageOne;
