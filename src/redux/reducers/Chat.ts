import { UPDATE_INPUT_COMPOSER, ChatActionTypes } from 'src/types/actions/Chat.action';
import { Chat } from 'src/types/models/Chat';
import { AppState } from '../store/index';

const initialState: Chat = {
  inputComposer: '',
};

const ChatReducer = (state = initialState, action: ChatActionTypes): Chat => {
  switch (action.type) {
    case UPDATE_INPUT_COMPOSER:
      return { ...state, inputComposer: action.payload };

    default:
      return state;
  }
};

export default ChatReducer;

export const inputComposerReducer = (state: AppState) => state.chat.inputComposer;
