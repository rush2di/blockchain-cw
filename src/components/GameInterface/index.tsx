import { ethers } from "ethers";
import { useContext } from "react";
import { Tab } from "@headlessui/react";

import GameNav from "./GameNav";
import GameTicket from "./GameTicket";

import {
  approvePayment,
  feeFromParticipationsCount,
  tokenContractFromAddress,
} from "./utils";
import { _GameticketContent } from "./constants";
import { TICKET_PRICE } from "shared/constants";
import { Web3AppContext } from "context/Web3";

const GameInterface = () => {
  const { currentAccount, contracts } = useContext(Web3AppContext);

  const handleClick = async (tokenAddress: string, decimals: number) => {
    const ticketPrice = ethers.utils.parseUnits(TICKET_PRICE, decimals);
    const tokenContract = tokenContractFromAddress(tokenAddress, contracts);

    const participations = await contracts.chainPrizes!.playersParticipations(
      currentAccount
    );
    const formatEtherParticipations = ethers.utils.formatEther(participations);
    const feePrice = feeFromParticipationsCount(formatEtherParticipations);

    const isApproved = await approvePayment(tokenContract, ticketPrice);

    if (isApproved) {
      console.log("is Approved ?", tokenAddress, ticketPrice, {
        value: feePrice,
      });
      const options = { value: feePrice };
      await contracts.chainPrizes!.participate(
        tokenAddress,
        ticketPrice,
        options
      );

      const newParticipations =
        await contracts.chainPrizes!.playersParticipations(currentAccount);
      const newPlayers = await contracts.chainPrizes!.players(0);

      console.log("new participations", newParticipations);
      console.log("new players", newPlayers, {
        newPlayers: {
          gameID: newPlayers[3],
          participations: newPlayers[4],
          player: newPlayers[5],
        },
      });
      console.log("new players", newPlayers, {
        newPlayers: {
          gameID: newPlayers[0].toNumber(),
          participations: newPlayers[2].toNumber(),
          player: newPlayers[1],
        },
      });
    }
  };

  return (
    <Tab.Group defaultIndex={1}>
      <GameNav />
      <Tab.Panels>
        <Tab.Panel>Content 1</Tab.Panel>
        <GameTicket
          title={`1$ Game \nTicket`}
          cover={"https://source.unsplash.com/yJpjLD3c9bU"}
          content={_GameticketContent}
          disabled={!currentAccount}
          handleClick={handleClick}
          minimumPlayers={10000}
          currentPlayers={1762}
        />
      </Tab.Panels>
    </Tab.Group>
  );
};

export default GameInterface;
