import React from 'react';
import Box from '@material-ui/core/Box';

interface DayReportItemProps {
  date: string;
  money: string;
  difference: string;
  isLow: boolean;
}
const DayReportItem = ({ date, money, difference, isLow }: DayReportItemProps) => {
  return (
    <Box display='flex' justifyContent='space-between' py='10px' borderTop='1px solid #E6EAF0'>
      <Box color='#1F4173'>{date}</Box>
      <Box color='#1F4173'>{money}</Box>
      <Box color={isLow ? '#F7685B' : '##34AC6D'}>{difference}</Box>
    </Box>
  );
};
export default DayReportItem;
