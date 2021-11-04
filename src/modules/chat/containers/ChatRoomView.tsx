import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { supabase } from 'src/shared/supabaseClient';
import { userIdSupbaseSelector } from 'src/redux/reducers/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from 'src/types/models/Chat';
import useAgora from 'src/hooks/useAgora';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { Button } from '@material-ui/core';
import Header from '../components/Header';
import MessageBubble from '../components/MessageBubble';
import Composer from '../components/Composer';
import { scrollToLastMessage } from '../../../@crema/utility/scrollTobottom';
import MediaPlayer from '../components/MediaPlayer';

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
const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

const ChatRoomView = () => {
  const listFileWrapRef = React.useRef<HTMLDivElement>(null);
  const userIdSupbase = useSelector(userIdSupbaseSelector);
  const [messageList, setMessagesList] = useState<Message[]>([]);
  const [onCall, setOnCall] = useState(false);
  const classes = useStyles();
  const { localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers } = useAgora(client);

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
        if (payload.new.type === 'videoCall') {
          setOnCall(true);
          join('b00c0b18d1194540bcef5c8be131eef8', payload.new.channel, payload.new.token);
        }
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(mySubscription);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onVideoCall = async () => {
    setOnCall(true);
    join(
      'b00c0b18d1194540bcef5c8be131eef8',
      'taone',
      '006b00c0b18d1194540bcef5c8be131eef8IADr6TYmXn4ZqZUBRW5y2f3UNoHos+sN/3f+FW2+VOQ8S5d+x8wAAAAAEAAAIFGK0xSFYQEAAQDRFIVh',
    );
    const { data, error } = await supabase.from('messages').insert([
      {
        type: 'videoCall',
        channel: 'taone',
        created_by: userIdSupbase,
        token:
          '006b00c0b18d1194540bcef5c8be131eef8IADr6TYmXn4ZqZUBRW5y2f3UNoHos+sN/3f+FW2+VOQ8S5d+x8wAAAAAEAAAIFGK0xSFYQEAAQDRFIVh',
      },
    ]);
  };

  return (
    <Box className={classes.wrap}>
      <Header onVideoCall={onVideoCall} />
      {onCall ? (
        <Box height={`calc(100% - ${(listFileWrapRef.current?.offsetHeight ?? 59) + 71}px)`}>
          <div className="local-player-wrapper">
            <p className="local-player-text">
              {localVideoTrack && `localTrack`}
              {joinState && localVideoTrack ? `(${client.uid})` : ''}
            </p>
            <MediaPlayer videoTrack={localVideoTrack} audioTrack={undefined} />
          </div>
          {remoteUsers.map((user) => (
            <div className="remote-player-wrapper" key={user.uid}>
              <p className="remote-player-text">{`remoteVideo(${user.uid})`}</p>
              <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack} />
            </div>
          ))}
          <Button onClick={() => leave()} fullWidth>
            Kết thúc
          </Button>
        </Box>
      ) : (
        <Box
          className={classes.messages}
          height={`calc(100% - ${(listFileWrapRef.current?.offsetHeight ?? 59) + 71}px)`}
          id="chatview"
        >
          {messageList.map((item) => {
            if (item.type === 'text') {
              return (
                <MessageBubble
                  isOut={item.created_by === userIdSupbase}
                  text={item.text}
                  created_at={item.created_at}
                />
              );
            }
            return null;
          })}
        </Box>
      )}

      <div ref={listFileWrapRef}>
        <Composer />
      </div>
    </Box>
  );
};
export default ChatRoomView;
