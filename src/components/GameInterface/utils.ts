import axios from "axios";
import { toast } from "react-toastify";
import { User } from "@prisma/client";
import { BigNumber, Contract, ethers } from "ethers";

import {
  GAME_FEE_1,
  GAME_FEE_2,
  GAME_FEE_3,
  MOCKBUSD_ADDRESS,
  MOCKUSDT_ADDRESS,
  MOCKUSDC_ADDRESS,
  CHAINPRIZES_ADDRESS,
} from "shared/constants";
import { IDappContractsProps } from "services/ethers";
import { IGABFunctParams, IPPFuncParams, ISCUFuncParams } from "./type";

const tokenContractFromAddress = (
  address: string,
  contracts: IDappContractsProps<any>
) => {
  switch (address) {
    case MOCKBUSD_ADDRESS:
      return contracts.mockBUSD;
    case MOCKUSDT_ADDRESS:
      return contracts.mockUSDT;
    case MOCKUSDC_ADDRESS:
      return contracts.mockUSDC;
    default:
      return contracts.mockBUSD;
  }
};

const approvePayment = async (tokenContract: Contract, amount: BigNumber) => {
  try {
    const transaction = await tokenContract.approve(
      CHAINPRIZES_ADDRESS,
      amount
    );
    await transaction.wait();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const participationsToFee = (playerParticipations: number) => {
  switch (playerParticipations) {
    case 0:
      return ethers.utils.parseEther(GAME_FEE_1);
    case 1:
      return ethers.utils.parseEther(GAME_FEE_2);
    default:
      return ethers.utils.parseEther(GAME_FEE_3);
  }
};

const hasFeeDiscount = (player: User | any) => {
  const playerReferralsCount = player.referred;
  const playerFeeFixtures = player.fee_fixed;

  if (playerReferralsCount === 0) return false;
  if (playerReferralsCount > playerFeeFixtures) return true;
};

const getAccBalances = async ({
  provider,
  currAccount,
  tokenContract,
  tokenDecimals,
}: IGABFunctParams) => {
  const accBalanceBNB = await provider.getBalance(currAccount);
  const accBalanceToken = await tokenContract.balanceOf(currAccount);

  return {
    accBalanceBNB: ethers.utils.formatEther(accBalanceBNB),
    accBalanceToken: ethers.utils.formatUnits(accBalanceToken, tokenDecimals),
  };
};

const playerParticipate = async ({
  gameContract,
  tokenAddress,
  currFeePrice,
  ticketPrice,
  player,
}: IPPFuncParams) => {
  const options = {
    value: hasFeeDiscount(player)
      ? ethers.utils.parseEther(GAME_FEE_1)
      : currFeePrice,
  };
  const txParticipation = await gameContract.participate(
    tokenAddress,
    ticketPrice,
    options
  );

  await txParticipation.wait(); // waits until tx is mined
};

const syncChainUpdates = async ({
  gameContract,
  currGameID,
  player,
}: ISCUFuncParams) => {
  const reqBody = {
    addr: player.addr,
  };
  const currAccPlays = await gameContract.playersParticipations(player.addr);
  const currPlays = await gameContract.gameIdParticipations(currGameID);
  const currPlayer = hasFeeDiscount(player)
    ? (await axios.put(`/api/connects/${player.addr}/bonus`, reqBody)).data
    : player;

  return {
    currParticipants: currPlays.toNumber(),
    playerParticipations: currAccPlays.toNumber(),
    playerData: currPlayer,
  };
};

const copyToClipboard = (str: string) => {
  if (!navigator.clipboard) {
    toast.error("Something went wrong");
    return;
  }
  navigator.clipboard.writeText(str);
  toast.success("Copied succesfuly");
};

export {
  playerParticipate,
  tokenContractFromAddress,
  participationsToFee,
  approvePayment,
  getAccBalances,
  copyToClipboard,
  hasFeeDiscount,
  syncChainUpdates,
};
