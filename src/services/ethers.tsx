import { ethers, Contract } from "ethers";

import ChainPrizes from "contracts/ChainPrizes.json";
import BUSD_c from "contracts/MOCKBUSD.json";
import USDT_c from "contracts/MOCKUSDT.json";
import USDC_c from "contracts/MOCKUSDC.json";

import {
  CHAINPRIZES_ADDRESS,
  BUSD_ADDRESS,
  USDT_ADDRESS,
  USDC_ADDRESS,
} from "shared/constants";

export interface IDappContractsProps<T> {
  chainPrizes: T;
  BUSD: T;
  USDT: T;
  USDC: T;
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

    const BUSD = new Contract(BUSD_ADDRESS as string, BUSD_c.abi, signer);
    const USDT = new Contract(USDT_ADDRESS as string, USDT_c.abi, signer);
    const USDC = new Contract(USDC_ADDRESS as string, USDC_c.abi, signer);

    return {
      provider,
      contracts: { chainPrizes, BUSD, USDT, USDC },
    };
  } else {
    return {
      provider: null,
      contracts: {
        chainPrizes: null,
        BUSD: null,
        USDT: null,
        USDC: null,
      },
    };
  }
};

export default initWeb3;
