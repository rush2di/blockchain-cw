import { ethers } from "ethers";
import { initWeb3Response } from "services/ethers";
import { Web3AppContextProps } from "./types";

export const web3ProviderActions = {
  DETECT_WALLET: "DETECT_WALLET",
  CONNECT_WALLET: "CONNECT_WALLET",
  DISCONNECT_WALLET: "DISCONNECT_WALLET",
  ACCOUNT_STATE_CHANGED: "ACCOUNT_STATE_CHANGED",
}

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

const onAccountStateChanged = (payload: Web3AppContextProps["currentAccount"]) => {
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
