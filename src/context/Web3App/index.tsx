import { Contract } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { useEffect, createContext, useReducer } from "react";

import { web3InitState, web3Reducer } from "./reducers";
import { Web3AppContextProps, Web3AppProviderProps } from "./types";
import initWeb3, { dappContractsProps } from "services/ethers";
import {
  setStorageSavedApproval,
  getStorageSavedApproval,
  mmAlertLogger,
} from "./utils";
import {
  onAccountStateChanged,
  onConnectWallet,
  onDetectWallet,
} from "./actions";

export const Web3AppContext = createContext<Web3AppContextProps>({
  ...web3InitState,
  connectAccount: () => {},
});

const Web3AppProvider = ({ children }: Web3AppProviderProps) => {
  const [state, dispatch] = useReducer(web3Reducer, web3InitState);

  const connectAccount = (account: string) => {
    dispatch(onAccountStateChanged(account));
    setStorageSavedApproval({ account: account, isApproved: true });
  };

  const handleAccountsChange = (accounts: Array<string>) => {
    if (accounts.length !== 0) {
      dispatch(onAccountStateChanged(accounts[0]));
      setStorageSavedApproval({ account: accounts[0], isApproved: true });
    } else if (accounts.length === 0) {
      dispatch(onAccountStateChanged(null));
      setStorageSavedApproval({ account: null, isApproved: false });
    }
  };

  useEffect(() => {
    const prevSessionData = getStorageSavedApproval();

    if (!window.ethereum) {
      mmAlertLogger();
      dispatch(onDetectWallet(false));
    } else {
      dispatch(onDetectWallet(true));
      prevSessionData !== null &&
        dispatch(onAccountStateChanged(prevSessionData.account));
      window.ethereum.on("accountsChanged", (accounts: Array<string>) =>
        handleAccountsChange(accounts)
      );
    }

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChange);
    };
  }, []);

  useEffect(() => {
    const init = async () => {
      const { provider, contracts } = await initWeb3();
      dispatch(
        onConnectWallet({
          provider: provider as Web3Provider,
          contracts: contracts as dappContractsProps<Contract>,
        })
      );
    };

    init().catch((err) => console.log(err));
  }, []);

  return (
    <Web3AppContext.Provider
      value={{
        provider: state.provider,
        mmInstalled: state.mmInstalled,
        currentAccount: state.currentAccount,
        connectAccount: connectAccount,
        contracts: {
          chainPrizes: state.contracts.chainPrizes,
          mockBUSD: state.contracts.mockBUSD,
          mockUSDT: state.contracts.mockUSDT,
          mockUSDC: state.contracts.mockUSDC,
        },
      }}
    >
      {children}
    </Web3AppContext.Provider>
  );
};

export default Web3AppProvider;
