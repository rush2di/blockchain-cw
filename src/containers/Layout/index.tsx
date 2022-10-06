import { ReactNode, useContext } from "react";

import MetamaskAlert from "components/MetamaskAlert";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { Web3AppContext } from "context/Web3App";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { provider, mmInstalled, currentAccount, connectAccount } =
    useContext(Web3AppContext);

  const handleConnect = () => {
    if (!provider || !!currentAccount) return;

    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) connectAccount(accounts[0]);
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <Navbar currentAccount={currentAccount} handleConnect={handleConnect} />
      <main className="min-h-screen bg-pattern bg-cover bg-left-top">
        {mmInstalled === false && <MetamaskAlert />}
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
