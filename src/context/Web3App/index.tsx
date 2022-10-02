import { useState, useEffect, createContext, ReactNode } from "react";
import initWeb3, { initWeb3Response } from "services/ethers";

interface Web3AppContextProps extends initWeb3Response {
  mmInstalled: boolean | null;
  currentAccount: string | null;
  connectAccount(account: string | null): void;
}

interface Web3AppProviderProps {
  children: ReactNode;
}

export const Web3AppContext = createContext<Web3AppContextProps>({
  mmInstalled: null,
  currentAccount: null,
  chainPrizes: undefined,
  mockBUSD: undefined,
  mockUSDT: undefined,
  mockUSDC: undefined,
  connectAccount: () => {},
});

const Web3AppProvider = ({ children }: Web3AppProviderProps) => {
  const [provider, setProvider] = useState<any | null>(null);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [mmInstalled, setMmInstalled] = useState<boolean | null>(null);
  const [chainPrizes_abi, setChainPrizes_abi] = useState<any>();
  const [mockBUSD_abi, setMockBUSD_abi] = useState<any>();
  const [mockUSDT_abi, setMockUSDT_abi] = useState<any>();
  const [mockUSDC_abi, setMockUSDC_abi] = useState<any>();

  useEffect(() => {
    if (!window.ethereum) {
      console.error("Please install MetaMask");
      setMmInstalled(false);
    } else {
      setMmInstalled(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const { provider, chainPrizes, mockBUSD, mockUSDT, mockUSDC } =
        await initWeb3();
      setProvider(provider);
      setChainPrizes_abi(chainPrizes);
      setMockBUSD_abi(mockBUSD);
      setMockUSDT_abi(mockUSDT);
      setMockUSDC_abi(mockUSDC);
    };

    if (currentAccount !== null && provider === null) {
      init();
    }
  }, [currentAccount]);

  const connectAccount = (account: string | null) => {
    setCurrentAccount(account);
  };

  return (
    <Web3AppContext.Provider
      value={{
        provider: provider,
        mmInstalled: mmInstalled,
        currentAccount: currentAccount,
        connectAccount: connectAccount,
        chainPrizes: chainPrizes_abi,
        mockBUSD: mockBUSD_abi,
        mockUSDT: mockUSDT_abi,
        mockUSDC: mockUSDC_abi,
      }}
    >
      {children}
    </Web3AppContext.Provider>
  );
};

export default Web3AppProvider;
