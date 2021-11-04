import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { supabase } from 'src/shared/supabaseClient';
import { userIdSupbaseSelector } from 'src/redux/reducers/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from 'src/types/models/Chat';
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
  const userIdSupbase = useSelector(userIdSupbaseSelector);
  const [messageList, setMessagesList] = useState<Message[]>([]);
  const classes = useStyles();

  React.useEffect(() => {
    scrollToLastMessage(false, 0, 'chatview');
  }, [messageList]);

  React.useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase.from('messages').select().range(0, 49).order('id', { ascending: false });
      setMessagesList(data);
    };
    fetchMessages();
    const mySubscription = supabase
      .from('messages')
      .on('*', (payload) => {
        setMessagesList((state) => [...state, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(mySubscription);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={classes.wrap}>
      <Header />
      <Box
        className={classes.messages}
        height={`calc(100% - ${(listFileWrapRef.current?.offsetHeight ?? 59) + 71}px)`}
        id="chatview"
      >
        {messageList.map((item) => (
          <MessageBubble isOut={item.create_by === userIdSupbase} text={item.text} created_at={item.created_at} />
        ))}
      </Box>
      <div ref={listFileWrapRef}>
        <Composer />
      </div>
    </Box>
  );
};
export default ChatRoomView;
