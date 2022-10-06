import { BigNumber, Contract } from "ethers";
import { dappContractsProps } from "services/ethers";
import { CHAINPRIZES_ADDRESS } from "shared/constants";

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
    const transaction = await tokenContract.approve("0xb234b5d5296bd09F160FBFD69Cfaae2be01d1d5B", amount);
    const txMined = await transaction.wait();
    if (!!txMined) return true;
  } catch (error) {
    console.log(error)
    return false;
  }
};

// const feeFromParticipationsCount = (playerParticipations: number) => {
//   switch(playerParticipations) {
//     case 1:
//       return process.env.NEXT 
//   }
// }

export { tokenContractFromAddress, approvePayment };
