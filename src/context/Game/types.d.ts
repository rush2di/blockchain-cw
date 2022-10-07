import { ReactNode } from "react";

export interface IGameState {
  minParticipants: number;
  currParticipants: number;
  playerParticipations: number;
  playerRefunds: Array<number> | null;
  playerWins: number;
}

export interface IGameContextProviderProps {
  children: ReactNode;
}

export interface IOnDetectUserActionPayload
  extends IGameState["playerParticipations"],
    IGameState["playerRefunds"],
    IGameState["playerWins"] {}
