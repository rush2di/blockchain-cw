import { ethers, Contract } from "ethers";

import ChainPrizes from "contracts/ChainPrizes.json";
import MockBUSD from "contracts/MockBUSD.json";
import MockUSDT from "contracts/MockUSDT.json";
import MockUSDC from "contracts/MockUSDC.json";

import {
  CHAINPRIZES_ADDRESS,
  MOCKBUSD_ADDRESS,
  MOCKUSDT_ADDRESS,
  MOCKUSDC_ADDRESS,
} from "shared/constants";

export interface IDappContractsProps<T> {
  chainPrizes: T;
  mockBUSD: T;
  mockUSDT: T;
  mockUSDC: T;
}

export interface IWeb3Response<T1, T2> {
  provider: T1;
  contracts: IDappContractsProps<T2>;
}

const initWeb3 = async (): Promise<
  IWeb3Response<ethers.providers.Web3Provider | null, ethers.Contract | null>
> => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const chainPrizes = new Contract(
      CHAINPRIZES_ADDRESS as string,
      ChainPrizes.abi,
      signer
    );

    const mockBUSD = new Contract(
      MOCKBUSD_ADDRESS as string,
      MockBUSD.abi,
      signer
    );
    const mockUSDT = new Contract(
      MOCKUSDT_ADDRESS as string,
      MockUSDT.abi,
      signer
    );
    const mockUSDC = new Contract(
      MOCKUSDC_ADDRESS as string,
      MockUSDC.abi,
      signer
    );

    return {
      provider,
      contracts: { chainPrizes, mockBUSD, mockUSDT, mockUSDC },
    };
  } else {
    return {
      provider: null,
      contracts: {
        chainPrizes: null,
        mockBUSD: null,
        mockUSDT: null,
        mockUSDC: null,
      },
    };
  }
};

export default initWeb3;
