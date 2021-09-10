import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { format } from 'date-fns';
import clsx from 'clsx';
import useStyles from './TableItem.style';
import { Statistic } from '../../../types/models/Dashboard';

interface Difff {
  diff: number;
}
interface TableItemProps {
  data: Statistic & Difff;
}

const TableItem: React.FC<TableItemProps> = ({ data }) => {
  const classes = useStyles();

  return (
    <TableRow key={data.orderDate} className="item-hover">
      <TableCell align="left" className={clsx(classes.tableCell, classes.whiteSpace)}>
        {format(new Date(data.orderDate), 'dd-MM-yyyy')}
      </TableCell>
      <TableCell align="right" className={classes.tableCell}>
        {data.totalOrder}
      </TableCell>
      <TableCell align="right" className={classes.tableCell}>
        {data.totalAmount.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        })}
      </TableCell>
      <TableCell align="right" className={`${classes.tableCell} ${data.diff < 0 ? classes.red : classes.green}`}>
        {data.diff.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        })}
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
