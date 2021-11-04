import { reduxRequestActionGenerator } from '../../@crema/utility/Utils';

const scope = 'CHAT';

export const UPDATE_INPUT_COMPOSER = `${scope}/UPDATE_INPUT_COMPOSER`;

export interface UpdateInputComposerAction {
  type: typeof UPDATE_INPUT_COMPOSER;
  payload: string;
}

export type ChatActionTypes = UpdateInputComposerAction;
