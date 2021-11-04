import { UPDATE_INPUT_COMPOSER } from '../../types/actions/Chat.action';

export const updateInputComposer = (text: string) => {
  return {
    type: UPDATE_INPUT_COMPOSER,
    payload: text,
  };
};
