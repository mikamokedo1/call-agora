import React, { useMemo, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import TableItem from './TableItem';
import TableHeading from './TableHeading';
import AppCard from '../../../@crema/core/AppCard';
import AppSelect from '../../../@crema/core/AppSelect';
import { statisticSelector } from '../../../redux/reducers/Dashboard';
import { fetchStatistic } from '../../../redux/actions/dashboard';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 300,
  },
  input: {
    marginBottom: '20px',
    marginLeft: '20px',
  },
});
const TableList = () => {
  const statistics = useSelector(statisticSelector);
  const [searchText, setSearchText] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleSelectionType = (data: unknown) => {
    if (data === 'Ngày') {
      dispatch(fetchStatistic());
      console.log(data);
    }
  };

  const DATA_TABLE = useMemo(() => {
    const temp = [...statistics].map((item) => {
      return { ...item, diff: 0 };
    });
    let current = 0;
    statistics.forEach((item, index) => {
      const diff = item.totalAmount - current;
      temp[index] = { ...statistics[index], diff };
      current = item.totalAmount;
    });
    return temp;
  }, [statistics]);
  const onClickSearchDate = () => {
    console.log(searchText);
  };
  return (
    <AppCard
      contentStyle={{ paddingRight: 0, paddingLeft: 0 }}
      title="Nhân viên xuất sắc"
      action={<AppSelect menus={['Ngày', 'Tuần', 'Tháng']} defaultValue="Ngày" onChange={handleSelectionType} />}
    >
      <TextField
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className={classes.input}
        placeholder="Nhập tên nhân viên"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ cursor: 'pointer' }} onClick={onClickSearchDate} />
            </InputAdornment>
          ),
        }}
      />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableHeading />
          </TableHead>
          <TableBody>
            {DATA_TABLE.map((data) => (
              <TableItem data={data} key={data.orderDate} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AppCard>
  );
};

export default TableList;
