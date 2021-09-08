import React, {useState, useRef} from 'react';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import FilterTime from '../components/FilterTime';
import DayReportItem from '../components/DayReportItem';
import 'react-datepicker/dist/react-datepicker.css';
import {format} from 'date-fns';

const TIME_FILTER = [
  {label: 'Ngày', id: 'ngay'},
  {label: 'Tuần', id: 'tuan'},
  {label: 'Tháng', id: 'thang'},
];

const StyledDate = styled(Box)`
  align-items: center;
  display: flex;
  border-bottom: 1px solid #e6eaf0;
  & input {
    border: none;
    font-size: 15px;
    &:focus {
      border: none;
      outline: none;
    }
  }
`;

const TableDayOrder = () => {
  const [currentTime, setCurrentTime] = useState('ngay');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const DatePickerRef = useRef(null);

  const onClickSearchDate = () => {
    if (!startDate && DatePickerRef.current) {
      DatePickerRef.current?.input.focus();
    } else {
      const date = format(startDate ?? new Date(), 'yyyy-MM-dd');
      console.log(date);
    }
  };
  const handleClickLabelFilterDate = (id: string) => {
    setCurrentTime(id);
  };
  return (
    <Box borderRadius='5px' bgcolor='#fff' p='15px' height='100%'>
      <Box fontWeight='bold' color='#334D6E' mb='15px'>
        Table Theo ngày
      </Box>
      <Box color='#334D6E'>Search</Box>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='start'
        marginTop='10px'>
        <StyledDate>
          <DatePicker
            wrapperClassName='datePicker'
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText='Nhập ngày'
            ref={DatePickerRef}
          />
          <Box style={{cursor: 'pointer'}} onClick={onClickSearchDate}>
            <SearchIcon />
          </Box>
        </StyledDate>
        <Box display='flex'>
          {TIME_FILTER.map((item) => (
            <FilterTime
              title={item.label}
              isActive={item.id === currentTime}
              handleClick={handleClickLabelFilterDate}
              id={item.id}
            />
          ))}
        </Box>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        px='10px'
        height='calc(100% - 95px)'>
        <Box
          display='flex'
          justifyContent='space-between'
          mt='30px'
          fontWeight='bold'
          mb='10px'>
          <Box color='#1F4173'>Ngày</Box>
          <Box color='#1F4173'>Tổng Tiền</Box>
          <Box color='#1F4173'>Chênh lệch</Box>
        </Box>
        <Box height='calc(100% - 58px)' overflow='auto' pr='10px'>
          <DayReportItem
            date='275'
            money='dsadsa'
            difference='asdasdsa'
            isLow
          />
          <DayReportItem
            date='275'
            money='dsadsa'
            difference='asdasdsa'
            isLow
          />
          <DayReportItem
            date='275'
            money='dsadsa'
            difference='asdasdsa'
            isLow
          />
          <DayReportItem
            date='275'
            money='dsadsa'
            difference='asdasdsa'
            isLow
          />
          <DayReportItem
            date='275'
            money='dsadsa'
            difference='asdasdsa'
            isLow
          />
          <DayReportItem
            date='275'
            money='dsadsa'
            difference='asdasdsa'
            isLow
          />
          <DayReportItem
            date='275'
            money='dsadsa'
            difference='asdasdsa'
            isLow
          />
          <DayReportItem
            date='275'
            money='dsadsa'
            difference='asdasdsa'
            isLow
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TableDayOrder;
