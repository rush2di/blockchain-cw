import { Web3AppContext } from "context/Web3";
import { createContext, useContext, useEffect, useReducer } from "react";
import { onDetectUser, onGameStateLoaded, onUserParticipated } from "./actions";
import { gameReducer, initState } from "./reducers";
import { IGameContextProviderProps, IGameState, IGameVals } from "./types";
import { getAccGameState, getGameState } from "./utils";

export const GameContext = createContext<IGameVals>({ ...initState });

const GameContextProvider = ({ children }: IGameContextProviderProps) => {
  const [state, dispatch] = useReducer(gameReducer, initState);
  const { currAccount, contracts } = useContext(Web3AppContext);

  const handleUserGameUpdates = (
    playerParticipations: number,
    currParticipants: number
  ) => {
    dispatch(onUserParticipated({ playerParticipations, currParticipants }));
  };

  useEffect(() => {
    if (currAccount !== null) {
      getGameState(contracts.chainPrizes!)
        .then(({ currGameID, currParticipants }) => {
          dispatch(
            onGameStateLoaded({
              currParticipants: currParticipants,
              gameID: currGameID,
            })
          );
        })
        .catch((err) => console.log(err));
    }
  }, [currAccount, state.playerParticipations]);

  useEffect(() => {
    if (currAccount !== null) {
      getAccGameState(currAccount, contracts.chainPrizes!, contracts.mockBUSD!)
        .then(({ playerParticipations, playerRefunds, playerIsWinner }) => {
          dispatch(
            onDetectUser({
              playerParticipations,
              playerRefunds,
              playerIsWinner,
            })
          );
        })
        .catch((err) => console.log(err));
    }
  }, [currAccount]);

  console.log(state);

  return (
    <GameContext.Provider value={{ ...state, handleUserGameUpdates }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
