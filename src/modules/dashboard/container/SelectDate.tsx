import SearchIcon from '@material-ui/icons/Search';
import DatePicker from 'react-datepicker';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { fetchStatistic } from '../../../redux/actions/dashboard';

const StyledDate = styled(Box)`
  margin-left: 20px;
  margin-bottom: 10px;
  align-items: center;
  display: flex;
  max-width: 200px;
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
const SelectDate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const DatePickerRef = useRef(null);
  const dispatch = useDispatch();

  const onClickSearchDate = () => {
    if (!startDate && DatePickerRef.current) {
      DatePickerRef.current?.input.focus();
    } else {
      const date = format(startDate ?? new Date(), 'yyyy-MM-dd');
      dispatch(fetchStatistic(date, date));
    }
  };
  console.log('re render');
  return (
    <StyledDate>
      <DatePicker
        wrapperClassName='datePicker'
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText='Nhập ngày'
        ref={DatePickerRef}
      />
      <Box style={{ cursor: 'pointer' }} onClick={onClickSearchDate}>
        <SearchIcon />
      </Box>
    </StyledDate>
  );
};

export default SelectDate;
