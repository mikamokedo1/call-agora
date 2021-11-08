import React, { useState, useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { supabase } from 'src/shared/supabaseClient';
import { userIdSupbaseSelector } from 'src/redux/reducers/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from 'src/types/models/Chat';
import useAgora from 'src/hooks/useAgora';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { Button } from '@material-ui/core';
import agoraToken from 'agora-access-token';
import Header from '../components/Header';
import MessageBubble from '../components/MessageBubble';
import Composer from '../components/Composer';
import { scrollToLastMessage } from '../../../@crema/utility/scrollTobottom';
import MediaPlayer from '../components/MediaPlayer';
import CallIncoming from '../components/CallIncoming';

const APP_ID = 'b00c0b18d1194540bcef5c8be131eef8';

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
  const listFileWrapRef = useRef<HTMLDivElement>(null);
  const userIdSupbase = useSelector(userIdSupbaseSelector);
  const [messageList, setMessagesList] = useState<Message[]>([]);
  const [onCall, setOnCall] = useState(false);
  const classes = useStyles();
  const { localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers } = useAgora(client);
  const [channelCall, setChannelCall] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isOnBottom, setIsOnBottom] = useState(false);
  const [unviewedMessageCount, setUnviewedMessageCount] = useState(0);
  const [newIncomingMessageTrigger, setNewIncomingMessageTrigger] = useState(null);
  const renderToken = (isPublisher: boolean, channel: string, uid: number) => {
    const appID = APP_ID;
    const appCertificate = 'a4251e593b9e44a9b990770f4c6682b3';
    const expirationTimeInSeconds = 3600;
    const role = isPublisher ? agoraToken.RtcRole.PUBLISHER : agoraToken.RtcRole.SUBSCRIBER;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;

    const token = agoraToken.RtcTokenBuilder.buildTokenWithUid(
      appID,
      appCertificate,
      channel,
      uid,
      role,
      expirationTimestamp,
    );
    return token;
  };

  const handleCallComing = (message: Message) => {
    setOnCall(true);
    setChannelCall(message.channel);
  };
  const handleAcceptedCall = () => {
    const uid = Math.floor(Math.random() * 100000);
    join(APP_ID, channelCall, renderToken(true, channelCall, uid), uid);
  };
  const handleCancelcall = async () => {
    await supabase.from('messages').insert([
      {
        type: 'videoCall-end',
        channel: userIdSupbase,
        created_by: userIdSupbase,
      },
    ]);
    setOnCall(false);
    setChannelCall('');
  };

  // useEffect(() => {
  //   scrollToLastMessage(false, 0, 'chatview');
  // }, [messageList]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase.from('messages').select().range(0, 49).order('id', { ascending: false });
      setMessagesList(data.reverse());
      scrollToBottom();
    };
    fetchMessages();
    const mySubscription = supabase
      .from('messages')
      .on('*', (payload) => {
        setMessagesList((state) => [...state, payload.new]);
        setNewIncomingMessageTrigger(payload.new);
        if (payload.new.type === 'videoCall' && payload.new.created_by !== userIdSupbase) {
          handleCallComing(payload.new);
        }
        if (payload.new.type === 'videoCall-end' && payload.new.created_by !== userIdSupbase) {
          leave();
          setOnCall(false);
        }
      })

      .subscribe();

    return () => {
      supabase.removeSubscription(mySubscription);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onVideoCall = async () => {
    const uid = Math.floor(Math.random() * 100000);
    const token = renderToken(true, userIdSupbase, uid);
    join(APP_ID, userIdSupbase, token, uid);
    const { data, error } = await supabase.from('messages').insert([
      {
        type: 'videoCall',
        channel: userIdSupbase,
        created_by: userIdSupbase,
      },
    ]);
    setOnCall(true);
  };
  const onEndedCall = async () => {
    if (!joinState) {
      return;
    }
    leave();
    setOnCall(false);
    await supabase.from('messages').insert([
      {
        type: 'videoCall-end',
        channel: userIdSupbase,
        created_by: userIdSupbase,
      },
    ]);
  };
  const onScroll = async ({ target }) => {
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 1) {
      setUnviewedMessageCount(0);
      setIsOnBottom(true);
    } else {
      setIsOnBottom(false);
    }
    //* Load more messages when reaching top
    if (scrollRef?.current?.scrollTop === 1) {
      const { data, error } = await supabase
        .from('messages')
        .select()
        .range(messageList.length, messageList.length + 20)
        .order('id', { ascending: false });
      if (error) {
        return;
      }
      setMessagesList((prevMessages) => [...prevMessages, ...data.reverse()]);
    }
    //* This is a fix if user quickly scrolls to top
    if (scrollRef?.current?.scrollTop === 0) scrollRef.current.scrollTop = 20;
  };
  useEffect(() => {
    scrollToBottom();
  }, [newIncomingMessageTrigger]);

  const scrollToBottom = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  return (
    <Box className={classes.wrap}>
      <Header onVideoCall={onVideoCall} disabled={joinState} />
      {onCall ? (
        <>
          {joinState ? (
            <Box
              height={`calc(100% - ${(listFileWrapRef.current?.offsetHeight ?? 59) + 71}px)`}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <div className="local-player-wrapper">
                <MediaPlayer videoTrack={localVideoTrack} audioTrack={undefined} />
              </div>
              {remoteUsers.map((user) => (
                <div className="remote-player-wrapper" key={user.uid}>
                  <p className="remote-player-text">{`remoteVideo(${user.uid})`}</p>
                  <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack} />
                </div>
              ))}
              <Box mt="10px">
                <Button onClick={onEndedCall} fullWidth>
                  Kết thúc
                </Button>
              </Box>
            </Box>
          ) : (
            <CallIncoming onCancel={handleCancelcall} onAccept={handleAcceptedCall} />
          )}
        </>
      ) : (
        <div
          className={classes.messages}
          style={{ height: `calc(100% - ${(listFileWrapRef.current?.offsetHeight ?? 59) + 71}px)` }}
          id="chatview"
          ref={scrollRef}
          onScroll={onScroll}
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
            return (
              <MessageBubble isOut={item.created_by === userIdSupbase} text={item.type} created_at={item.created_at} />
            );
          })}
        </div>
      )}

      <div ref={listFileWrapRef}>
        <Composer />
      </div>
    </Box>
  );
};
export default ChatRoomView;
