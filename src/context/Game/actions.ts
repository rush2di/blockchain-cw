import {
  IOnDetectUserActionPayload,
  IOnGameStateLoadedActionPayload,
} from "./types";
import { GAME_ACTION_TYPES } from "./constants";

const onGameStateLoaded = (payload: IOnGameStateLoadedActionPayload) => {
  return {
    type: GAME_ACTION_TYPES.LOADED_DATA,
    payload,
  };
};

const onDetectUser = (payload: IOnDetectUserActionPayload) => {
  return {
    type: GAME_ACTION_TYPES.DETECT_USER,
    payload,
  };
};

const onUserParticipated = (payload: any) => {
  return {
    type: GAME_ACTION_TYPES.USER_PARTICIPATED,
    payload,
  };
};

export { onGameStateLoaded, onDetectUser, onUserParticipated };
