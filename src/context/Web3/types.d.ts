import { ethers } from "ethers";
import { ReactNode } from "react";
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

export interface IStorageParams {
  account: string | null;
  isApproved: boolean;
}
