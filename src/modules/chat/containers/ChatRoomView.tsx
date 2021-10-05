import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header';
import MessageBubble from '../components/MessageBubble';
import Composer from '../components/Composer';
import { scrollToLastMessage } from '../../../@crema/utility/scrollTobottom';

const useStyles = makeStyles(() => ({
  wrap: {
    height: '100%',
  },
  messages: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 10px 20px 10px',
    overflow: 'auto',
  },
}));

const ChatRoomView = () => {
  const listFileWrapRef = React.useRef<HTMLDivElement>(null);
  const classes = useStyles();

  React.useEffect(() => {
    scrollToLastMessage(false, 0, 'chatview');
  }, []);
  return (
    <Box className={classes.wrap}>
      <Header />
      <Box
        className={classes.messages}
        height={`calc(100% - ${(listFileWrapRef.current?.offsetHeight ?? 59) + 71}px)`}
        id="chatview"
      >
        <MessageBubble isOut={false} />
        <MessageBubble isOut />
        <MessageBubble isOut={false} />
        <MessageBubble isOut />
        <MessageBubble isOut={false} />
        <MessageBubble isOut />
        <MessageBubble isOut={false} />
        <MessageBubble isOut />
        <MessageBubble isOut={false} />
        <MessageBubble isOut />
        <MessageBubble isOut={false} />
        <MessageBubble isOut />
        <MessageBubble isOut={false} />
        <MessageBubble isOut />
        <MessageBubble isOut={false} />
        <MessageBubble isOut />
      </Box>
      <div ref={listFileWrapRef}>
        <Composer />
      </div>
    </Box>
  );
};
export default ChatRoomView;
