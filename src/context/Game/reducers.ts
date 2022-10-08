import { IReducerAction } from "shared/types";
import { GAME_ACTION_TYPES } from "./constants";
import { IGameState } from "./types";

export const initState = {
  gameID: 0,
  minParticipants: 100000,
  currParticipants: 0,
  playerParticipations: 0,
  playerRefunds: null,
  playerIsWinner: false,
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
        playerIsWinner: actions.payload.playerIsWinner,
      };
    case GAME_ACTION_TYPES.LOADED_DATA:
      return {
        ...state,
        currParticipants: actions.payload.currParticipants,
        gameID: actions.payload.gameID,
      };
    case GAME_ACTION_TYPES.USER_PARTICIPATED:
      return {
        ...state,
        currParticipants: actions.payload.currParticipants,
        playerParticipations: actions.payload.playerParticipations,
      };
    default:
      return state;
  }
};
