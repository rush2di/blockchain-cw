import { ethers } from "ethers";
import { Fragment, useContext } from "react";
import { Web3AppContext } from "context/Web3";
import Draggable from "react-draggable";
import { Disclosure } from "@headlessui/react";
import { classNames } from "shared/utils";

const Debuger = () => {
  const { provider, contracts, currAccount } = useContext(Web3AppContext);

  const handleClick = async () => {
    const accounts = [
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    ];
    const amount = ethers.utils.parseEther("100000");
    await contracts.BUSD!.faucet(accounts, amount);
    await contracts.USDT!.faucet(accounts, amount);
    await contracts.USDC!.faucet(accounts, amount);
  };

  const fillContractFunds = async () => {
    const amount = ethers.utils.parseEther("1000");
    await contracts.BUSD!.faucet([contracts.chainPrizes!.address], amount);
  }

  const resetGameState = async () => {
    await contracts.chainPrizes!.resetGameState();
  };

  const logCurrPlayerParticipations = async () => {
    const res = await contracts.chainPrizes!.playersParticipations(currAccount!);
    console.log(`Current player participation = ${res.toNumber()}`);
  };

  const logPrevGamesWinner = async () => {
    const gameID = await contracts.chainPrizes!.gameId();
    const payload = gameID.toNumber() < 2 ? 0 : gameID.toNumber() - 1;
    const res = await contracts.chainPrizes!.gameHistory(payload);
    console.log(res);
  };

  const logFundsETH = async () => {
    const res = await provider?.getBalance(contracts.chainPrizes!.address);
    console.log(`Contract's ETH Balance = ${ethers.utils.formatEther(res!)}`);
  };

  const logFundsTokens = async () => {
    const busd = await contracts.BUSD!.balanceOf(
      contracts.chainPrizes!.address
    );
    const usdt = await contracts.USDT!.balanceOf(
      contracts.chainPrizes!.address
    );
    const usdc = await contracts.USDC!.balanceOf(
      contracts.chainPrizes!.address
    );
    console.log(`Contract's Tokens Balance 
    BUSD = ${ethers.utils.formatUnits(busd, 18)}
    USDT = ${ethers.utils.formatUnits(usdt, 6)}
    USDC = ${ethers.utils.formatUnits(usdc, 6)}
    `);
  };

  const logGameID = async () => {
    const gameID = await contracts.chainPrizes!.gameId();
    console.log(`Current Game ID = ${gameID.toNumber()}`);
  };

  const logPlayers = async () => {
    const players = await contracts.chainPrizes!.getPlayers();
    const transformedData = players.map((item: any) => {
      return {
        gameID: item[0].toNumber(),
        playerAddr: item[1],
        participations: item[2].toNumber(),
      };
    });
    console.log(
      `Current Game Players = ${JSON.stringify(transformedData, null, 2)}`
    );
  };

  const declareGameEnd = async () => {
    const seed = Math.random() * new Date().getSeconds();
    const ethSeed = ethers.utils.parseEther(seed.toFixed(1));
    const winAmount = ethers.utils.parseEther("10.0");
    const refundAmount = ethers.utils.parseEther("1");
    console.log(`
    seed = ${ethers.utils.formatEther(ethSeed)}
    winAmount = ${ethers.utils.formatEther(winAmount)}
    refundAmount = ${ethers.utils.formatEther(refundAmount)}
    `);
    await contracts.chainPrizes!.endGame(ethSeed, winAmount, refundAmount);
    console.log("Done");
  };

  return (
    <Draggable>
      <Disclosure
        as="div"
        className={classNames(
          "fixed p-1 bg-white rounded text-shades-2",
          "left-0 bottom-0 z-50 w-[280px] shadow-lg"
        )}
        style={{ transformOrigin: "center top !important" }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-center">Debugger</h3>
          <Disclosure.Button as={Fragment}>
            <button className="text-sm text-shades-5">menu</button>
          </Disclosure.Button>
        </div>
        <Disclosure.Panel as="div" className="[&>*:not(last-child)]:mt-1">
          <button onClick={handleClick} className="btn btn--dark btn--rounded">
            Fill Accounts
          </button>
          <button onClick={logGameID} className="btn btn--dark btn--rounded">
            Log Game ID
          </button>
          <button onClick={logPlayers} className="btn btn--dark btn--rounded">
            Log Players List
          </button>
          <button onClick={logFundsETH} className="btn btn--dark btn--rounded">
            Log Chain Native Funds
          </button>
          <button
            onClick={logFundsTokens}
            className="btn btn--dark btn--rounded"
          >
            Log Tokens Balances
          </button>
          <button
            onClick={logPrevGamesWinner}
            className="btn btn--dark btn--rounded"
          >
            Log Games History
          </button>
          <button
            onClick={resetGameState}
            className="btn btn--dark btn--rounded"
          >
            Reset Game State
          </button>
          <button
            onClick={declareGameEnd}
            className="btn btn--dark btn--rounded"
          >
            Declare Game End
          </button>
          <button
            onClick={logCurrPlayerParticipations}
            className="btn btn--dark btn--rounded"
          >
            Log player Participations
          </button>
          <button
            onClick={fillContractFunds}
            className="btn btn--dark btn--rounded"
          >
            Fill Contract Funds
          </button>
        </Disclosure.Panel>
      </Disclosure>
    </Draggable>
  );
};

export default Debuger;
