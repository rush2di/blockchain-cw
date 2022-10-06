import { web3ProviderActions } from "./actions";
import { Web3AppContextProps, Web3ReducerActionsType } from "./types";

export const web3InitState = {
  provider: null,
  mmInstalled: null,
  currentAccount: null,
  contracts: {
    chainPrizes: null,
    mockBUSD: null,
    mockUSDT: null,
    mockUSDC: null,
  },
};

export const web3Reducer = (
  state: Web3AppContextProps = web3InitState,
  actions: Web3ReducerActionsType
) => {
  switch (actions.type) {
    case web3ProviderActions.CONNECT_WALLET:
      return {
        ...state,
        provider: actions.payload.provider,
        contracts: actions.payload.contracts,
      };
    case web3ProviderActions.DETECT_WALLET:
      return { ...state, mmInstalled: actions.payload };
    case web3ProviderActions.ACCOUNT_STATE_CHANGED:
      return { ...state, currentAccount: actions.payload };
    default:
      return state;
  }
};
