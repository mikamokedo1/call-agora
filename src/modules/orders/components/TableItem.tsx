import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from './TableItem.style';

interface TableItemProps {
  customer: string;
  email: string;
  period: string;
  packageType: number;
  seller: string;
  id: string;
  handleChecked: (status: boolean, id: string) => void;
  checked: boolean;
}

const TableItem = ({ customer, email, period, packageType, seller, id, checked, handleChecked }: TableItemProps) => {
  const classes = useStyles();

  return (
    <TableRow className="item-hover">
      <TableCell align="left" className={clsx(classes.tableCell, classes.whiteSpace)}>
        <Checkbox
          inputProps={{ 'aria-label': 'primary checkbox' }}
          checked={checked}
          onChange={(event) => handleChecked(event.target.checked, id)}
        />
      </TableCell>
      <TableCell align="center" className={classes.tableCell}>
        {id}
      </TableCell>
      <TableCell align="center" className={clsx(classes.tableCell, classes.whiteSpace)}>
        {customer}
      </TableCell>
      <TableCell align="center" className={classes.tableCell}>
        {email}
      </TableCell>
      <TableCell align="center" className={classes.tableCell}>
        {period}
      </TableCell>
      <TableCell align="center" className={classes.tableCell}>
        {packageType}
      </TableCell>
      <TableCell align="center" className={classes.tableCell}>
        {seller}
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
