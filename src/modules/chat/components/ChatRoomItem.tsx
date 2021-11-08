import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from './Avatar';
import getInitialsFromName from '../../../@crema/utility/getName';

const useStyles = makeStyles(() => ({
  wrap: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  avatar: {
    width: '45px',
    height: '45px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10px',
  },
  avatarImage: {
    borderRadius: '50%',
  },
  right: {
    width: 'calc(100% - 65px)',
  },
  name: {
    fontWeight: 600,
  },
  lastMess: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));
interface ChatRoomItemProps {
  active: boolean;
}

const ChatRoomItem = ({ active }: ChatRoomItemProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.wrap} bgcolor={active ? '#fff' : 'inherit'}>
      <Avatar size="big" url={getInitialsFromName('test') ?? ''} />
      <Box className={classes.right}>
        <Box className={classes.name}>Tam</Box>
        <Box className={classes.lastMess}>tao đi đâu đây......tao đi đâu đây tao đi đâu đây tao đi đâu đây</Box>
      </Box>
    </Box>
  );
};

export default ChatRoomItem;
