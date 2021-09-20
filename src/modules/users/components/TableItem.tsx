import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import useStyles from './TableItem.style';

const StyledAvatar = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  .avatar {
    margin-right: 5px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    img {
      border-radius: 50%;
      max-width: 100%;
    }
  }
`;

interface TableItemProps {
  name: string;
  email: string;
  phone: string;
  money: number;
  orders: number;
  percent: number;
  id: string;
  handleChecked: (status: boolean, id: string) => void;
  checked: boolean;
  avatar?: string;
}

const TableItem = ({
  name,
  email,
  phone,
  money,
  orders,
  percent,
  id,
  checked,
  handleChecked,
  avatar,
}: TableItemProps) => {
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
      <TableCell align="center" className={clsx(classes.tableCell, classes.whiteSpace)}>
        <StyledAvatar>
          <Box className="avatar">
            <img alt={name} src={avatar ?? 'https://via.placeholder.com/24x24'} />
          </Box>
          <Box>{name}</Box>
        </StyledAvatar>
      </TableCell>
      <TableCell align="center" className={classes.tableCell}>
        {email}
      </TableCell>
      <TableCell align="center" className={classes.tableCell}>
        {phone}
      </TableCell>
      <TableCell align="right" className={classes.tableCell}>
        {money.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        })}
      </TableCell>
      <TableCell align="right" className={classes.tableCell}>
        {orders}
      </TableCell>
      <TableCell align="right" className={`${classes.tableCell} ${percent < 0 ? classes.red : classes.green}`}>
        {`${percent}%`}
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
