import { toast } from "react-toastify";
import { BigNumber, Contract, ethers, providers } from "ethers";
import { IDappContractsProps } from "services/ethers";

import {
  CHAINPRIZES_ADDRESS,
  GAME_FEE_1,
  GAME_FEE_2,
  GAME_FEE_3,
} from "shared/constants";

const tokenContractFromAddress = (
  address: string,
  contracts: IDappContractsProps<any>
) => {
  switch (address) {
    case "BUSD":
      return contracts.mockBUSD;
    case "USDT":
      return contracts.mockUSDT;
    case "USDC":
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
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const feeFromParticipationsCount = (playerParticipations: number) => {
  switch (playerParticipations) {
    case 0:
      return ethers.utils.parseEther(GAME_FEE_1);
    case 1:
      return ethers.utils.parseEther(GAME_FEE_2);
    default:
      return ethers.utils.parseEther(GAME_FEE_3);
  }
};

const getAccBalances = async (
  provider: providers.Web3Provider,
  tokenContract: Contract,
  currAccount: string,
  decimals: number
) => {
  const accBalanceBNB = await provider.getBalance(currAccount);
  const accBalanceToken = await tokenContract.balanceOf(currAccount);

  return {
    accBalanceBNB: ethers.utils.formatEther(accBalanceBNB),
    accBalanceToken: ethers.utils.formatUnits(accBalanceToken, decimals),
  };
};

const payFeeAndParticipate = async (
  tokenAddr: string,
  currAccount: string,
  currGameID: number,
  gameContract: Contract,
  ticketPrice: BigNumber,
  currFeePrice: BigNumber
) => {
  const options = { value: currFeePrice };
  const txParticipation = await gameContract.participate(
    tokenAddr,
    ticketPrice,
    options
  );
  await txParticipation.wait();
  const currAccPlays = await gameContract.playersParticipations(currAccount);
  const currPlays = await gameContract.gameIdParticipations(currGameID);

  return {
    currParticipants: currPlays.toNumber(),
    playerParticipations: currAccPlays.toNumber(),
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
  payFeeAndParticipate,
  tokenContractFromAddress,
  feeFromParticipationsCount,
  approvePayment,
  getAccBalances,
  copyToClipboard,
};
