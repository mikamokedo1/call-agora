import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from './Avatar';

const useStyles = makeStyles(() => ({
  wrap: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    borderRadius: '4px',
  },
  avatar: {
    width: '55px',
    height: '55px',
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

const ChatRoomItem = () => {
  const classes = useStyles();
  return (
    <Box className={classes.wrap}>
      <Avatar
        size="big"
        url="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.6435-1/p100x100/152721571_909248686503731_2445109993268764589_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=7206a8&_nc_ohc=a-GCz6Y0caMAX_yLDxF&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn5-6.fna&oh=fdaae27dc810f9ef99a22d62e0d7d651&oe=61834A9F"
      />
      <Box className={classes.right}>
        <Box className={classes.name}>Tam</Box>
        <Box className={classes.lastMess}>tao đi đâu đây......tao đi đâu đây tao đi đâu đây tao đi đâu đây</Box>
      </Box>
    </Box>
  );
};

export default ChatRoomItem;
