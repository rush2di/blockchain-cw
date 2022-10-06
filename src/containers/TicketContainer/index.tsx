import { useContext, useEffect } from "react";
import { ethers } from "ethers";

import GameNav from "components/GameNav";
import Ticket, { TicketContentProps } from "components/Ticket";
import { Web3AppContext } from "context/Web3App";
import { approvePayment, tokenContractFromAddress } from "./utils";
import { CHAINPRIZES_ADDRESS, MOCKBUSD_ADDRESS, TICKET_PRICE } from "shared/constants";

const _ticketContent: TicketContentProps = {
  heading: "10.000 BUSD Prize Reward",
  intro: "Enter the game with 1 BSC Network BUSD/USDT/USDC",
  winOutcome: "One lucky player will win 10.000 BUSD",
  loseOutcome:
    "If you don’t win you can withdraw your 1$  or use it to enter another game",
  prevPrice: 10000,
  entryPrice: 1,
};

const TicketContainer = () => {
  const { currentAccount, contracts } = useContext(Web3AppContext);

  //   useEffect(() => {
  //     if (contracts.mockBUSD !== null) {
  //       const test = async () => {
  //         const userBalance = await contracts.mockBUSD!.balanceOf(currentAccount);
  //         console.log({ userBalance: ethers.utils.formatEther(userBalance) });
  //       };
  //       test();
  //     }
  //   }, []);

  const handleClick = async (tokenAddress: string, decimals: number) => {
    const ticketPrice = ethers.utils.parseUnits(TICKET_PRICE, decimals);
    const feePrice = ethers.utils.parseEther("1");

    const tokenContract = tokenContractFromAddress(tokenAddress, contracts);
    const options = { value: feePrice };

    const isApproved = await approvePayment(tokenContract, ticketPrice);
    // console.log(isApproved);
    // if (isApproved) {
    //   console.log("is Approved ?", tokenAddress, ticketPrice, options);
    //   await contracts.chainPrizes!.participate(
    //     MOCKBUSD_ADDRESS,
    //     ticketPrice,
    //     options
    //   );
    // }
  };

  return (
    <section className="container pt-3">
      <GameNav />
      <div className="pt-2">
        <Ticket
          title={`1$ Game \nTicket`}
          cover={"https://source.unsplash.com/yJpjLD3c9bU"}
          content={_ticketContent}
          disabled={!currentAccount}
          handleClick={handleClick}
          minimumPlayers={10000}
          currentPlayers={1762}
        />
      </div>
    </section>
  );
};

export default TicketContainer;
