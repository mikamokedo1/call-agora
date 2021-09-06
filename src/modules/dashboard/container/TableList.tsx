import React, { useMemo } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '@material-ui/core/TableContainer';
import SelectDate from './SelectDate';
import TableItem from './TableItem';
import TableHeading from './TableHeading';
import AppCard from '../../../@crema/core/AppCard';
import AppSelect from '../../../@crema/core/AppSelect';
import { statisticSelector } from '../../../redux/reducers/Dashboard';
import { fetchStatistic } from '../../../redux/actions/dashboard';

const TableList = () => {
  const statistics = useSelector(statisticSelector);
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
  return (
    <AppCard
      contentStyle={{ paddingRight: 0, paddingLeft: 0 }}
      title='Table theo ngày'
      action={<AppSelect menus={['Ngày', 'Tuần', 'Tháng']} defaultValue='Ngày' onChange={handleSelectionType} />}>
      <SelectDate />
      <TableContainer>
        <Table>
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
