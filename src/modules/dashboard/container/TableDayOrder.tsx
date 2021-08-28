import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import FilterTime from '../components/FilterTime';
import DayReportItem from '../components/DayReportItem';

const TIME_FILTER = [
  { label: 'Ngày', id: 'ngay' },
  { label: 'Tuần', id: 'tuan' },
  { label: 'Tháng', id: 'thang' },
];

const TableDayOrder = () => {
  const [currentTime, setCurrentTime] = useState('ngay');

  return (
    <Box borderRadius='5px' bgcolor='#fff' p='15px'>
      <Box fontWeight='bold' color='#334D6E' mb='15px'>
        Table Theo ngày
      </Box>
      <Box color='#334D6E'>Search</Box>
      <Box display='flex' justifyContent='space-between'>
        <TextField
          placeholder='Nhập ngày'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box display='flex'>
          {TIME_FILTER.map((item) => (
            <FilterTime
              title={item.label}
              isActive={item.id === currentTime}
              handleClick={(id: string) => setCurrentTime(id)}
              id={item.id}
            />
          ))}
        </Box>
      </Box>
      <Box display='flex' flexDirection='column' px='10px'>
        <Box display='flex' justifyContent='space-between' mt='30px' fontWeight='bold' mb='10px'>
          <Box color='#1F4173'>Ngày</Box>
          <Box color='#1F4173'>Tổng Tiền</Box>
          <Box color='#1F4173'>Chênh lệch</Box>
        </Box>
        <DayReportItem date='275' money='dsadsa' difference='asdasdsa' isLow />
        <DayReportItem date='275' money='dsadsa' difference='asdasdsa' isLow />
        <DayReportItem date='275' money='dsadsa' difference='asdasdsa' isLow />
        <DayReportItem date='275' money='dsadsa' difference='asdasdsa' isLow />
      </Box>
    </Box>
  );
};

export default TableDayOrder;
