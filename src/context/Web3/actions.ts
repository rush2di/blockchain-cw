import { ethers } from "ethers";
import { initWeb3Response } from "services/ethers";
import { web3ProviderActions } from "./constants";
import { Web3AppContextProps } from "./types";

const onDetectWallet = (payload: Web3AppContextProps["mmInstalled"]) => {
  return {
    type: web3ProviderActions.DETECT_WALLET,
    payload,
  };
};

const onConnectWallet = (
  payload: initWeb3Response<ethers.providers.Web3Provider, ethers.Contract>
) => {
  return {
    type: web3ProviderActions.CONNECT_WALLET,
    payload,
  };
};

const onDisconnectWallet = (payload: Web3AppContextProps["currentAccount"]) => {
  return {
    type: web3ProviderActions.DISCONNECT_WALLET,
    payload,
  };
};

const onAccountStateChanged = (
  payload: Web3AppContextProps["currentAccount"]
) => {
  return {
    type: web3ProviderActions.ACCOUNT_STATE_CHANGED,
    payload,
  };
};

export {
  onDetectWallet,
  onConnectWallet,
  onDisconnectWallet,
  onAccountStateChanged,
};
