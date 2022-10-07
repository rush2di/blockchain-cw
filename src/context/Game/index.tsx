import { createContext, useEffect, useReducer } from "react";
import { gameReducer, initState } from "./reducers";
import { IGameContextProviderProps, IGameState } from "./types";

const GameContext = createContext<IGameState>({ ...initState });

const GameContextProvider = ({ children }: IGameContextProviderProps) => {
  const [state, dispatch] = useReducer(gameReducer, initState);

  useEffect(() => {
    // logic goes here...
  }, [])

  return (
    <GameContext.Provider value={{ ...initState }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
