import * as React from 'react';
import { unstable_createMuiStrictModeTheme as createTheme } from '@material-ui/core/styles';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import GridContainer from '../../../@gotrust/core/GridContainer';
import AppAnimate from '../../../@gotrust/core/AppAnimate';
import { purple } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import { Search } from '@material-ui/icons'
import { Form, Formik, useField } from 'formik';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import * as yup from 'yup';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridRowsProp,
  GridColumns
} from '@material-ui/data-grid';
import moment from 'moment';

const columns: GridColumns = [
  { field: 'name', headerName: 'Tên', minWidth: 120 },
  { field: 'surname', headerName: 'Họ', minWidth: 120 },
  {
    field: 'birthYear',
    headerName: 'Năm sinh',
    align: 'right',
    minWidth: 130
  },
  { field: 'address', headerName: 'Địa chỉ', minWidth: 120 },
  {
    field: 'dateStart',
    headerName: 'Ngày bắt đầu',
    align: 'right',
    minWidth: 150
  },
  {
    field: 'dateEnd',
    headerName: 'Ngày kết thúc',
    align: 'right',
    minWidth: 160
  },
];
interface Data {
  id: number;
  name: string;
  surname: string;
  birthYear: string;
  address: string;
  dateStart: string;
  dateEnd: string;
}

function createData(id: number, name: string, surname: string, birthYear: string, address: string, dateStart: string, dateEnd: string,): Data {
  return { id, name, surname, birthYear, address, dateStart, dateEnd };
}

const rows: GridRowsProp = [
  createData(1, 'Hải', 'Nguyễn', '1999', "Lê Văn Kiệt", '09/08/1999', '09/08/2017'),
  createData(2, 'Tuyền', 'Phạm', '1998', "Trần Long", '09/08/1988', '09/08/2016'),
  createData(3, 'Long', 'Phạm', '1998', "Trần Mai Lí", '09/02/1999', '09/08/2022'),
  createData(4, 'Bụt', 'Nguyễn', '1998', "Lê Thái Tông", '03/08/1998', '09/12/2018'),
  createData(5, 'Thanh', 'Trần', '1998', "Nguyễn Văn Lượng", '09/08/1999', '09/08/2017'),
  createData(6, 'Phội', 'Lê', '1998', "Trần Chân", '09/08/2000', '09/08/2017'),
  createData(7, 'Hải', 'Nguyễn', '1999', "Lê Văn Sĩ", '09/08/1999', '09/08/2017'),
  createData(8, 'Hải', 'Nguyễn', '1999', "Lê Văn Sĩ", '09/08/1999', '09/08/2017'),
  createData(9, 'Hải', 'Nguyễn', '1999', "Lê Văn Sĩ", '09/08/1999', '09/08/2017'),
  createData(10, 'Hải', 'Nguyễn', '1999', "Lê Văn Sĩ", '09/08/1999', '09/08/2017'),
  createData(11, 'Hải', 'Nguyễn', '1999', "Lê Văn Sĩ", '09/08/1999', '09/08/2017'),
]

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid Email')
    .required('Email required'),
  password: yup.string().required('Password required'),
});

const defaultTheme = createTheme();
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formRoot: {
      textAlign: 'left',
      marginBottom: 24,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    myTextFieldRoot: {
      width: '100%',
    },
    paper: {
      padding: theme.spacing(4),
    },
    paperWithData: {
      padding: theme.spacing(4),
      height: 700
    },
    button: {
      marginTop: 20,
      marginRight: 20,
      color: '#fff'
    },
    container: {
      maxHeight: 440,
    },
    rootDataGrid: {
      '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
        outline: 'none',
      },
    },
  }),
  { defaultTheme }
);

const PurpleButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const MyTextField = (props: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...props}
        {...field}
        helperText={errorText}
        error={!!errorText}
        size="small"
      />
    </Grid>
  );
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        csvOptions={{
          allColumns: true,
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
}

export default function ExportSelectorGrid() {
  const classes = useStyles();
  const [data, setData] = React.useState(rows);
  const [pageSize, setPageSize] = React.useState<number>(10);

  const validateString = (v: string) => {
    return v.length === 0 || !v.trim();
  }

  const formatDate = (date: string) => {
    return moment(date).format("DD/MM/YYYY");
  }

  const handleSearch = (values: any) => {
    var dataFilter = rows;

    if (!validateString(values.name)) dataFilter = dataFilter.filter((v) => v.name === values.name);

    if (!validateString(values.surname)) dataFilter = dataFilter.filter((v) => v.surname === values.surname);

    if (!validateString(values.birthYear)) dataFilter = dataFilter.filter((v) => v.birthYear === values.birthYear);

    if (!validateString(values.address)) dataFilter = dataFilter.filter((v) => v.address === values.address);

    if (!validateString(values.dateStart)) dataFilter = dataFilter.filter((v) => v.dateStart === formatDate(values.dateStart));

    if (!validateString(values.dateEnd)) dataFilter = dataFilter.filter((v) => v.dateEnd === formatDate(values.dateEnd));

    if (dataFilter.length == data.length) return;
    setData(dataFilter);
  }

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box className={classes.formRoot}>
        <Paper className={classes.paper}>
          <Box className={classes.title}>Danh sách đơn hàng</Box>
        </Paper>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <Formik
          validateOnChange={true}
          initialValues={{
            name: '',
            surname: '',
            birthYear: '',
            address: '',
            dateStart: '',
            dateEnd: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            // dispatch(onJwtSignIn({ email: data.email, password: data.password }));
            setSubmitting(false);
          }}>
          {({ values }) => (
            <Form className={classes.formRoot} noValidate autoComplete='off'>
              <Paper className={classes.paper}>
                <GridContainer spacing={6}>
                  <MyTextField
                    name='name'
                    label="Tên"
                    variant='outlined'
                    className={classes.myTextFieldRoot}
                  />
                  <MyTextField
                    name='surname'
                    label="Họ"
                    variant='outlined'
                    className={classes.myTextFieldRoot}
                  />
                  <MyTextField
                    name='birthYear'
                    label="Năm sinh"
                    variant='outlined'
                    className={classes.myTextFieldRoot}
                  />
                  <MyTextField
                    name='address'
                    label="Địa chỉ"
                    variant='outlined'
                    className={classes.myTextFieldRoot}
                  />
                  <MyTextField
                    name='dateStart'
                    type='date'
                    label="Ngày bắt đầu"
                    format="dd/MM/yyyy"
                    variant='outlined'
                    InputLabelProps={{
                      shrink: true
                    }}
                    className={classes.myTextFieldRoot}
                  />
                  <MyTextField
                    name='dateEnd'
                    type='date'
                    label="Ngày kết thúc"
                    variant='outlined'
                    InputLabelProps={{
                      shrink: true
                    }}
                    className={classes.myTextFieldRoot}
                  />
                </GridContainer>
                <PurpleButton
                  type="button"
                  variant="contained"
                  className={classes.button}
                  startIcon={<Search />}
                  onClick={() => handleSearch(values)}
                >
                  Tìm kiếm
                </PurpleButton>
              </Paper>
            </Form>
          )}
        </Formik>
        <Paper className={classes.paperWithData}>
          <DataGrid
            className={classes.rootDataGrid}
            rows={data}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[10, 20, 50]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pagination
            checkboxSelection
            disableColumnMenu
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </Paper>
      </div >
    </AppAnimate >
  );
}