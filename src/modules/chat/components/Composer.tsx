import Picker, { IEmojiData, SKIN_TONE_NEUTRAL } from 'emoji-picker-react';
import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { updateInputComposer } from 'src/redux/actions/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { inputComposerReducer } from 'src/redux/reducers/Chat';
import { supabase } from 'src/shared/supabaseClient';
import { userIdSupbaseSelector } from 'src/redux/reducers/Auth';
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
  const dispatch = useDispatch();
  const inputComposer = useSelector(inputComposerReducer);
  const userIdSupbase = useSelector(userIdSupbaseSelector);
  const classes = useStyles();
  const [flagEmojiTab, setFlagEmojiTab] = React.useState(false);
  const emojiRef = React.useRef(null);
  useOnClickOutside(emojiRef, () => {
    setFlagEmojiTab(false);
  });
  const onEmojiClick = useCallback(
    (e: any, emojiObject: IEmojiData) => {
      dispatch(updateInputComposer(`${inputComposer}${emojiObject.emoji}`));
    },
    [dispatch, inputComposer],
  );
  const setText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateInputComposer(e.target.value));
  };
  const onPressInput = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
      } else if (e.key === 'Enter' && inputComposer) {
        e.preventDefault();
        const { data, error } = await supabase
          .from('messages')
          .insert([{ text: inputComposer, type: 'text', roomId: 1, created_by: userIdSupbase }]);
        dispatch(updateInputComposer(''));
        if (error) {
          console.log(error);
        }
      }
    },
    [dispatch, inputComposer],
  );
  return (
    <Box className={classes.wrap} id="composer">
      <StyledTextArea rowsMax={4} onChange={setText} value={inputComposer} onKeyDown={onPressInput} />
      <Box onClick={() => setFlagEmojiTab(true)} position="relative">
        <InsertEmoticonIcon color="primary" />
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
