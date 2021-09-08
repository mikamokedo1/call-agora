import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { format } from 'date-fns';
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
      <TableCell align="left" className={classes.tableCell}>
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
      {/* <TableCell align='left' className={classes.tableCell}>
        <Box
          className={classes.badgeRoot}
          style={{
            color: getPaymentStatusColor(),
            backgroundColor: `${getPaymentStatusColor()}44`,
          }}>
          {data.status}
        </Box>
      </TableCell>
      <TableCell align='right' className={classes.tableCell}>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </TableCell> */}
    </TableRow>
  );
};

export default TableItem;
