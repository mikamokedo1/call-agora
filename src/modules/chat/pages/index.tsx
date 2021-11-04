import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import AppAnimate from '../../../@crema/core/AppAnimate';
import ChatRoomItem from '../components/ChatRoomItem';
import ChatRoomView from '../containers/ChatRoomView';

const useStyles = makeStyles(() => ({
  wrap: {
    display: 'flex',
    height: '100%',
    backgroundColor: 'rgb(246, 246, 246)',
    border: '5px',
  },
  chatList: {
    width: '300px',
    padding: '10px',
    overflow: 'auto',
  },
  chatView: {
    borderLeft: '1px solid gray',
    width: 'calc(100% - 300px)',
  },
}));
const PageOne = () => {
  const classes = useStyles();
  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <Box className={classes.wrap}>
        <Box className={classes.chatList}>
          <ChatRoomItem active />
        </Box>
        <Box className={classes.chatView}>
          <ChatRoomView />
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default PageOne;
