import { IReducerAction } from "shared/types";
import { GAME_ACTION_TYPES } from "./constants";
import { IGameState } from "./types";

export const initState = {
  minParticipants: 100000,
  currParticipants: 0,
  playerParticipations: 0,
  playerRefunds: null,
  playerWins: 0,
};

export const gameReducer = (
  state: IGameState = initState,
  actions: IReducerAction
) => {
  switch (actions.type) {
    case GAME_ACTION_TYPES.DETECT_USER:
      return {
        ...state,
        playerParticipations: actions.payload.playerParticipations,
        playerRefunds: actions.payload.playerRefunds,
        playerWins: actions.payload.playerWins,
      };
    case GAME_ACTION_TYPES.LOADED_DATA:
      return {
        ...state,
        currParticipants: actions.payload.currParticipations,
      };
    default:
      return state;
  }
};
