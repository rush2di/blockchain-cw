import { ethers } from "ethers";
import { useContext } from "react";
import { Tab } from "@headlessui/react";

import GameNav from "./GameNav";
import GameTicket from "./GameTicket";

import {
  approvePayment,
  feeFromParticipationsCount,
  getAccBalances,
  payFeeAndParticipate,
  tokenContractFromAddress,
} from "./utils";
import { _GameticketContent } from "./constants";
import { TICKET_PRICE } from "shared/constants";
import { Web3AppContext } from "context/Web3";
import { GameContext } from "context/Game";

const GameInterface = () => {
  const { provider, currAccount, contracts } = useContext(Web3AppContext);
  const {
    gameID,
    currParticipants,
    minParticipants,
    playerParticipations,
    handleUserGameUpdates,
  } = useContext(GameContext);

  const participate = async (tokenAddr: string, decimals: number) => {
    const tokenContract = tokenContractFromAddress(tokenAddr, contracts);
    const ticketPrice = ethers.utils.parseUnits(TICKET_PRICE, decimals);
    const currFeePrice = feeFromParticipationsCount(playerParticipations);
    const { accBalanceBNB, accBalanceToken } = await getAccBalances(
      provider!,
      tokenContract,
      currAccount!,
      decimals
    );

    if (!accBalanceBNB || !accBalanceToken) return;

    const isApproved = await approvePayment(tokenContract, ticketPrice);

    if (isApproved) {
      const gameUpdated = await payFeeAndParticipate(
        tokenAddr,
        currAccount!,
        gameID,
        contracts.chainPrizes!,
        ticketPrice,
        currFeePrice
      );
      handleUserGameUpdates!(
        gameUpdated.playerParticipations,
        gameUpdated.currParticipants
      );
    }
  };

  const handleClick = (tokenAddr: string, decimals: number) => {
    participate(tokenAddr, decimals).catch((err) => console.log(err));
  };

  return (
    <Tab.Group defaultIndex={1}>
      <GameNav />
      <Tab.Panels className="mt-1-75">
        <Tab.Panel>Content 1</Tab.Panel>
        <GameTicket
          title={`1$ Game \nTicket`}
          cover={"https://source.unsplash.com/yJpjLD3c9bU"}
          content={_GameticketContent}
          disabled={!currAccount}
          handleClick={handleClick}
          minParticipants={minParticipants}
          currParticipants={currParticipants}
        />
      </Tab.Panels>
    </Tab.Group>
  );
};

export default GameInterface;
