import { GAME_ACTION_TYPES } from "./constants";
import { IGameState, IOnDetectUserActionPayload } from "./types";

const onDataLoaded = (payload: IGameState["currParticipants"]) => {
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

export { onDataLoaded, onDetectUser };
