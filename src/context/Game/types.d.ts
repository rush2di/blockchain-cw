import { ReactNode } from "react";

export interface IGameState {
  gameID: number;
  minParticipants: number;
  currParticipants: number;
  playerParticipations: number;
  playerRefunds: Array<number> | null;
  playerIsWinner: boolean;
}

export interface IGameVals extends IGameState {
  handleUserGameUpdates?(
    playerParticipations: number,
    currParticipants: number
  ): void;
}

export interface IGameContextProviderProps {
  children: ReactNode;
}

export interface IOnDetectUserActionPayload
  extends IGameState["playerParticipations"],
    IGameState["playerRefunds"],
    IGameState["playerIsWinner"] {}

export interface IOnGameStateLoadedActionPayload
  extends IGameState["currParticipants"],
    IGameState["gameID"] {}
