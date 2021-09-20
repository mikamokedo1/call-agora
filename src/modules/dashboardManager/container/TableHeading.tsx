import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

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

const TableHeading = () => {
  const classes = useStyles();
  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell align="left">Ngày</TableCell>
      <TableCell align="right">Tổng đơn</TableCell>
      <TableCell align="right">Tổng Tiền</TableCell>
      <TableCell align="right">Chênh Lệch</TableCell>
    </TableRow>
  );
};

export default TableHeading;
