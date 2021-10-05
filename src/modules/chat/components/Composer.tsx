import Picker, { IEmojiData, SKIN_TONE_NEUTRAL } from 'emoji-picker-react';
import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import useOnClickOutside from '../../../@crema/utility/useOnClickOutside';

const StyledEmoji = styled.div`
  .emoji-picker-react {
    position: absolute;
    bottom: 100%;
    right: 0px;
    z-index: 90;
  }
`;

const StyledTextArea = styled(TextareaAutosize)`
  padding: 10px;
  border-radius: 4px;
  margin-right: 5px;
  width: 100%;
  border: none;
  background: #f6f6f6;
  resize: none;
  font-size: 15px;
  font-family: unset;
  &:focus {
    border: none;
    outline: none;
  }
`;
const useStyles = makeStyles(() => ({
  wrap: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#fff',
  },
}));
const Composer = () => {
  const classes = useStyles();
  const [flagEmojiTab, setFlagEmojiTab] = React.useState(false);
  const emojiRef = React.useRef(null);
  useOnClickOutside(emojiRef, () => {
    setFlagEmojiTab(false);
  });
  const onEmojiClick = useCallback((e: any, emojiObject: IEmojiData) => {
    console.log(emojiObject.emoji);
  }, []);
  const setText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.currentTarget.value);
  };

  return (
    <Box className={classes.wrap} id="composer">
      <StyledTextArea rowsMax={4} onChange={setText} />
      <Box onClick={() => setFlagEmojiTab(true)} position="relative">
        <InsertEmoticonIcon />
        {flagEmojiTab && (
          <StyledEmoji ref={emojiRef}>
            <Picker
              disableAutoFocus
              disableSearchBar
              disableSkinTonePicker
              onEmojiClick={onEmojiClick}
              skinTone={SKIN_TONE_NEUTRAL}
            />
          </StyledEmoji>
        )}
      </Box>
    </Box>
  );
};

export default Composer;
