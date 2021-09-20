import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(() => ({
  tableRowRoot: {
    '& th': {
      fontSize: 13,
      padding: 8,
      fontWeight: 'bold',
      '&:first-child': {
        paddingLeft: 20,
        '@media screen and (max-width: 750px)': {
          paddingLeft: 10,
        },
      },
      '&:last-child': {
        paddingRight: 20,
        '@media screen and (max-width: 750px)': {
          paddingRight: 10,
        },
      },
    },
  },
}));

interface TableHeadingProps {
  handleCheckedAll: (status: boolean) => void;
  checked: boolean;
}

const TableHeading = ({ handleCheckedAll, checked }: TableHeadingProps) => {
  const classes = useStyles();
  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell align="left">
        <Checkbox
          checked={checked}
          inputProps={{ 'aria-label': 'primary checkbox' }}
          onChange={(event) => handleCheckedAll(event.target.checked)}
        />
      </TableCell>

      <TableCell align="center">Mã đơn hàng</TableCell>
      <TableCell align="center">Tên khách hàng</TableCell>
      <TableCell align="center">email</TableCell>
      <TableCell align="center">Thời hạn</TableCell>
      <TableCell align="center">Gói</TableCell>
      <TableCell align="center">Nhân viên</TableCell>
    </TableRow>
  );
};

export default TableHeading;
