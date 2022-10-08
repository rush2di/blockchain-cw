import { ReactNode, useContext } from "react";

import MetamaskAlert from "components/MetamaskAlert";
import Footer from "components/Layout/Footer";
import Navbar from "components/Layout/Navbar";
import { Web3AppContext } from "context/Web3";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { provider, mmInstalled, currAccount, connectAccount } =
    useContext(Web3AppContext);

  const handleConnect = () => {
    if (!provider || !!currAccount) return;

    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0 && typeof connectAccount !== "undefined") {
          connectAccount(accounts[0]);
        }
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <Navbar currAccount={currAccount} handleConnect={handleConnect} />
      <main className="min-h-screen bg-pattern bg-cover bg-left-top">
        {mmInstalled === false && <MetamaskAlert />}
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
