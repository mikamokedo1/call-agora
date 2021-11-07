import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';

interface CallIncomingProps {
  onCancel: () => void;
  onAccept: () => void;
}
const CallIncoming = ({ onCancel, onAccept }: CallIncomingProps) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box>Cuộc gọi đên!!!</Box>
      <Button onClick={onCancel}>Từ chối</Button>
      <Box mt="20px">
        <Button onClick={onAccept}>Đồng ý</Button>
      </Box>
    </Box>
  );
};

export default CallIncoming;
