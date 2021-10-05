import React from 'react';
import { Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

interface StyledProps {
  isOut?: boolean;
}
const useStyles = makeStyles<Theme, StyledProps>(() => ({
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: ({ isOut }) => (isOut ? 'flex-start' : 'flex-end'),
    maxWidth: '500px',
    position: 'relative',
    minHeight: 'auto',
    padding: '10px 22px',
    borderRadius: ({ isOut }) => (isOut ? '0px 20px 20px' : '20px 0px 20px 20px'),
    backgroundColor: '#fff',
  },
  time: {
    fontSize: '12px',
  },
}));

interface MessageBubbleProps {
  isOut?: boolean;
}
const MessageBubble = ({ isOut }: MessageBubbleProps) => {
  const props = {
    isOut,
  };
  const classes = useStyles(props);

  return (
    <Box className={classes.wrap}>
      <Box>Tuần sao đủ người con mới về thăm nhà</Box>
      <Box className={classes.time}>11:17 AM</Box>
    </Box>
  );
};

export default MessageBubble;
