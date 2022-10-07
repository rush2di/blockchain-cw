import { BigNumber, Contract, ethers } from "ethers";
import { dappContractsProps } from "services/ethers";
import {
  CHAINPRIZES_ADDRESS,
  GAME_FEE_1,
  GAME_FEE_2,
  GAME_FEE_3,
} from "shared/constants";

const tokenContractFromAddress = (
  address: string,
  contracts: dappContractsProps<any>
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

const feeFromParticipationsCount = (playerParticipations: string) => {
  switch (playerParticipations) {
    case "0.0":
      return ethers.utils.parseEther(GAME_FEE_1);
    case "1.0":
      return ethers.utils.parseEther(GAME_FEE_2);
    default:
      return ethers.utils.parseEther(GAME_FEE_3);
  }
};

export { tokenContractFromAddress, feeFromParticipationsCount, approvePayment };
