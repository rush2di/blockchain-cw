import { ethers, Contract } from "ethers";

import ChainPrizes from "contracts/ChainPrizes.json";
import MockBUSD from "contracts/MockBUSD.json";
import MockUSDT from "contracts/MockUSDT.json";
import MockUSDC from "contracts/MockUSDC.json";

import {
  _CHAINPRIZES_ADDRESS,
  _MOCKBUSD_ADDRESS,
  _MOCKUSDT_ADDRESS,
  _MOCKUSDC_ADDRESS,
} from "utils/globales/constants";

export interface initWeb3Response {
  provider?: any;
  chainPrizes: any;
  mockBUSD: any;
  mockUSDT: any;
  mockUSDC: any;
}

const initWeb3 = async (): Promise<initWeb3Response> => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const chainPrizes = new Contract(
      _CHAINPRIZES_ADDRESS,
      ChainPrizes.abi,
      signer
    );

    const mockBUSD = new Contract(_MOCKBUSD_ADDRESS, MockBUSD.abi, signer);
    const mockUSDT = new Contract(_MOCKUSDT_ADDRESS, MockUSDT.abi, signer);
    const mockUSDC = new Contract(_MOCKUSDC_ADDRESS, MockUSDC.abi, signer);

    return { provider, chainPrizes, mockBUSD, mockUSDT, mockUSDC };
  } else {
    return {
      provider: undefined,
      chainPrizes: undefined,
      mockBUSD: undefined,
      mockUSDT: undefined,
      mockUSDC: undefined,
    };
  }
};

export default initWeb3;
