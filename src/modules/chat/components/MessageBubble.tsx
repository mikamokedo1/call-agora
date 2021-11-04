import React from 'react';
import { Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';

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
    marginBottom: '20px',
  },
  time: {
    fontSize: '12px',
  },
}));

interface MessageBubbleProps {
  isOut?: boolean;
  text?: string;
  created_at: string;
}
const MessageBubble = ({ isOut, text, created_at }: MessageBubbleProps) => {
  const props = {
    isOut,
  };
  const classes = useStyles(props);

  return (
    <Box className={classes.wrap}>
      <Box mb={1}>{text}</Box>
      <Box className={classes.time}>{format(new Date(created_at), 'dd-MM hh:mm:a')}</Box>
    </Box>
  );
};

export default MessageBubble;
