import React from 'react';
import Box from '@material-ui/core/Box';

interface FilterTimeProps {
  title: string;
  isActive: boolean;
  handleClick: (id: string) => void;
  id: string;
}
const FilterTime = ({ title, isActive, handleClick, id }: FilterTimeProps) => {
  return (
    <Box
      style={{ cursor: 'pointer' }}
      onClick={() => handleClick(id)}
      borderRadius='8px'
      ml='20px'
      py='8px'
      px='16px'
      bgcolor={isActive ? 'rgba(52, 172, 109, 0.2)' : '#fff'}
      color={isActive ? '#34AC6D' : '#90A0B7'}>
      {title}
    </Box>
  );
};
export default FilterTime;
