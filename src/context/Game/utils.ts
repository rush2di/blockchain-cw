import axios from "axios";
import { Contract } from "ethers";
import { User } from "@prisma/client";

const getGameState = async (contract: Contract) => {
  const currGameID = await contract.gameId();
  const currParticipants = await contract.gameIdParticipations(currGameID);
  return {
    currGameID: currGameID.toNumber(),
    currParticipants: currParticipants.toNumber(),
  };
};

const getGameConnectsHistory = async () => {
  const connectsHistory = (await axios.get("/api/connects")).data;
  return {
    connectsHistory,
  };
};

const getPrevGameWinner = async (gameID: number, gameContract: Contract) => {
  if (gameID == 0) return false;
  const prevGameWinner = await gameContract.gameHistory(gameID - 1);
  return prevGameWinner;
};

const getAccGameState = async (
  currAccount: string,
  gameContract: Contract,
  busdContract: Contract
) => {
  const currGameID = await gameContract.gameId();
  const playerGames = await gameContract.playersParticipations(currAccount);
  const playerRefunds = await busdContract.allowance(
    gameContract.address,
    currAccount
  );
  const prevGameWinner = await getPrevGameWinner(currGameID, gameContract);
  const playerData = (await axios.get(`/api/connects/${currAccount}`)).data;
  const playerIsWinner = prevGameWinner === currAccount;

  return {
    playerParticipations: playerGames.toNumber(),
    playerRefunds: playerRefunds.toNumber(),
    playerIsWinner,
    playerData,
  };
};

export { getGameState, getGameConnectsHistory, getAccGameState };
