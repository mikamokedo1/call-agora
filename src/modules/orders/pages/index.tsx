import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import * as R from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';
import { CSVLink } from 'react-csv';
import styled from 'styled-components';
import AppAnimate from '../../../@crema/core/AppAnimate';
import AppSelect from '../../../@crema/core/AppSelect';
import TableItem from '../components/TableItem';
import TableHeading from '../components/TableHeading';

const useStyles = makeStyles({
  wrap: {
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    '@media screen and (max-width: 750px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  headerLeftTitle: {
    position: 'relative',
    top: '-1px',
  },
  buttonExport: {
    marginLeft: '10px',
    backgroundColor: 'rgba(52, 172, 109, 0.2)',
    color: ' #34AC6D',
    boxShadow: 'none',
    '@media screen and (max-width: 750px)': {
      marginLeft: '0px',
      marginTop: '10px',
    },
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: '4px',
    marginTop: '30px',
  },
  wrapSelectedCount: {
    display: 'flex',
    alignItems: 'end',
    marginLeft: '10px',
    '@media screen and (max-width: 750px)': {
      marginLeft: '0px',
    },
  },
  iconDelete: {
    cursor: 'pointer',
    marginLeft: '10px',
  },
});
const StyledButton = styled(CSVLink)`
  text-decoration: none;
`;

const DATA_TABLE = [
  {
    customer: 'le cao quy',
    email: 'mikamokedo@gmail.com',
    period: '0888222293',
    packageType: 50000000,
    seller: 'le cao quy2',
    id: '1',
  },
  {
    customer: 'le cao quy',
    email: 'mikamokedo@gmail.com',
    period: '0888222293',
    packageType: 50000000,
    seller: 'le cao quy2',
    id: '2',
  },
  {
    customer: 'le cao quy',
    email: 'mikamokedo@gmail.com',
    period: '0888222293',
    packageType: 50000000,
    seller: 'le cao quy2',
    id: '3',
  },
];
const PageOne = () => {
  const classes = useStyles();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const handleSelectionType = (data: unknown) => {
    console.log(data);
  };
  const handleChecked = (status: boolean, id: string) => {
    const index = R.findIndex(selectedUsers, (o) => {
      return o === id;
    });
    if (index === -1) {
      setSelectedUsers((state) => {
        const temp = [...state];
        temp.push(id);
        return temp;
      });
    } else {
      setCheckedAll(false);
      setSelectedUsers((state) => {
        const temp = [...state];
        temp.splice(index, 1);
        return temp;
      });
    }
  };
  const handleCheckedAll = (status: boolean) => {
    setCheckedAll(status);
    if (status === true) {
      setSelectedUsers(DATA_TABLE.map((item) => item.id));
    } else {
      setSelectedUsers([]);
    }
  };
  const filterColumns = () => {
    const headers = [
      { label: 'Họ và tên', key: 'name' },
      { label: 'Email', key: 'email' },
      { label: 'Số điện thoại	', key: 'phone' },
      { label: 'Doanh số	', key: 'money' },
      { label: 'Đơn hàng	', key: 'orders' },
      { label: 'Tỷ lệ', key: 'percent' },
      { label: 'id', key: 'id' },
    ];

    return headers;
  };
  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <Box className={classes.wrap}>
        <Box className={classes.header}>
          <Box display="flex" alignItems="center">
            <Box className={classes.headerLeftTitle}>Nhân sự: </Box>
            <AppSelect menus={['Ngày', 'Tuần', 'Tháng']} defaultValue="Ngày" onChange={handleSelectionType} />
          </Box>
          <StyledButton
            data={DATA_TABLE}
            headers={filterColumns()}
            filename={`Gotrust-users-${new Date().getTime()}.csv`}
          >
            <Button className={classes.buttonExport} variant="contained" endIcon={<GetAppIcon />}>
              Xuất Excel
            </Button>
          </StyledButton>
          {selectedUsers.length > 0 && (
            <Box className={classes.wrapSelectedCount}>
              <Box>{`${selectedUsers.length} nhân viên được chọn`}</Box>
              <DeleteIcon
                className={classes.iconDelete}
                onClick={() => {
                  setSelectedUsers([]);
                  setCheckedAll(false);
                }}
              />
            </Box>
          )}
          <Button className={classes.buttonExport} variant="contained" endIcon={<ScreenShareIcon />}>
            Chia sẻ File
          </Button>
        </Box>
        <TableContainer className={classes.table}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableHeading handleCheckedAll={handleCheckedAll} checked={checkedAll} />
            </TableHead>
            <TableBody>
              {DATA_TABLE.map((data) => (
                <TableItem
                  customer={data.customer}
                  email={data.email}
                  period={data.period}
                  packageType={data.packageType}
                  seller={data.seller}
                  checked={selectedUsers.includes(data.id)}
                  id={data.id}
                  handleChecked={handleChecked}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </AppAnimate>
  );
};

export default PageOne;
