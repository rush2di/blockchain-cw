import { ReactNode, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

import Footer from "./Footer";
import Navbar from "./Navbar";
import { Web3AppContext } from "context/Web3App";
import MetamaskAlert from "./MetamaskAlert";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { mmInstalled, currentAccount, connectAccount } =
    useContext(Web3AppContext);

  const context = useContext(Web3AppContext);
  console.log({ context });

  const handleConnect = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) {
          connectAccount(accounts[0]);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleDisconnect = () => {
    connectAccount(null);
  };

  return (
    <>
      <Navbar
        currentAccount={currentAccount}
        handleConnect={handleConnect}
        handleDisconnect={handleDisconnect}
      />
      <main className="min-h-screen bg-pattern bg-cover bg-left-top">
        {mmInstalled === false && <MetamaskAlert />}
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
