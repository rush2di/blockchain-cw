import { ethers } from "ethers";
import { initWeb3Response } from "services/ethers";

export interface Web3AppContextProps
  extends initWeb3Response<
    ethers.providers.Web3Provider | null,
    ethers.Contract | null
  > {
  mmInstalled: boolean | null;
  currentAccount: string | null;
  connectAccount?(account: string | null): void;
}

export interface Web3AppProviderProps {
  children: ReactNode;
}

export interface Web3ReducerActionsType {
  type: string;
  payload: any;
}
