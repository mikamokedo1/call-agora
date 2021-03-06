import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import * as R from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';
import { CSVLink } from 'react-csv';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { resetCreateUserStatus, fetchSellers } from 'src/redux/actions/dashboard';
import { AppState } from 'src/redux/store';
import AppAnimate from '../../../@crema/core/AppAnimate';
import AppSelect from '../../../@crema/core/AppSelect';
import TableItem from '../components/TableItem';
import TableHeading from '../components/TableHeading';
import FormAddPartner from '../components/FormAddPartner';

const useStyles = makeStyles({
  wrap: {
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '@media screen and (max-width: 750px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  headerInner: {
    display: 'flex',
    alignItems: 'center',
    '@media screen and (max-width: 750px)': {
      flexDirection: 'column',
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
  addButton: {
    '@media screen and (max-width: 750px)': {
      width: '140px',
    },
  },
});

const StyledButton = styled(CSVLink)`
  text-decoration: none;
`;

const DATA_TABLE = [
  {
    name: 'le cao quy',
    email: 'mikamokedo@gmail.com',
    phone: '0888222293',
    money: 50000000,
    orders: 150,
    percent: 20,
    id: '1',
  },
  {
    name: 'le cao quy',
    email: 'mikamokedo@gmail.com',
    phone: '0888222293',
    money: 50000000,
    orders: 150,
    percent: 20,
    id: '2',
  },
  {
    name: 'le cao quy',
    email: 'mikamokedo@gmail.com',
    phone: '0888222293',
    money: 50000000,
    orders: 150,
    percent: 20,
    id: '3',
  },
];
const PageOne = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [addUserFlag, setAddUserFlag] = useState(false);
  const createUserStatus = useSelector((state: AppState) => state.dashboard.createUserStatus);
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
      { label: 'H??? v?? t??n', key: 'name' },
      { label: 'Email', key: 'email' },
      { label: 'S??? ??i???n tho???i	', key: 'phone' },
      { label: 'Doanh s???	', key: 'money' },
      { label: '????n h??ng	', key: 'orders' },
      { label: 'T??? l???', key: 'percent' },
      { label: 'id', key: 'id' },
    ];

    return headers;
  };
  useEffect(() => {
    dispatch(fetchSellers());
  }, [dispatch]);
  useEffect(() => {
    if (createUserStatus) {
      setAddUserFlag(false);
    }
  }, [createUserStatus]);

  return (
    <>
      {addUserFlag && <FormAddPartner handleClose={() => setAddUserFlag(false)} />}
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <Box className={classes.wrap}>
          <Box className={classes.header}>
            <Box className={classes.headerInner}>
              <Box display="flex" alignItems="center">
                <Box className={classes.headerLeftTitle}>Nh??n s???: </Box>
                <AppSelect menus={['Ng??y', 'Tu???n', 'Th??ng']} defaultValue="Ng??y" onChange={handleSelectionType} />
              </Box>

              <StyledButton
                data={DATA_TABLE}
                headers={filterColumns()}
                filename={`Gotrust-users-${new Date().getTime()}.csv`}
              >
                <Button className={classes.buttonExport} variant="contained" endIcon={<GetAppIcon />}>
                  Xu???t Excel
                </Button>
              </StyledButton>

              {selectedUsers.length > 0 && (
                <Box className={classes.wrapSelectedCount}>
                  <Box>{`${selectedUsers.length} nh??n vi??n ???????c ch???n`}</Box>
                  <DeleteIcon
                    className={classes.iconDelete}
                    onClick={() => {
                      setSelectedUsers([]);
                      setCheckedAll(false);
                    }}
                  />
                </Box>
              )}
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setAddUserFlag(true);
                dispatch(resetCreateUserStatus());
              }}
              className={classes.addButton}
            >
              Th??m user
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
                    name={data.name}
                    email={data.email}
                    orders={data.orders}
                    phone={data.phone}
                    percent={data.percent}
                    money={data.money}
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
    </>
  );
};

export default PageOne;
