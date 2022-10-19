import axios from "axios";
import { ReactNode, useContext } from "react";

import MetamaskAlert from "components/MetamaskAlert";
import Footer from "components/Layout/Footer";
import Navbar from "components/Layout/Navbar";
import { Web3AppContext } from "context/Web3";
import { GameContext } from "context/Game";
import { hasConnectsHistory } from "./utils";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { query } = useRouter();
  const { connectsHistory } = useContext(GameContext);
  const { provider, mmInstalled, currAccount, connectAccount } =
    useContext(Web3AppContext);

  const handleConnect = () => {
    if (!provider || !!currAccount) return;

    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (!accounts.length || typeof connectAccount === "undefined") return;

        if (!hasConnectsHistory(connectsHistory, accounts[0])) {
          axios.post("/api/connects/create", {
            addr: accounts[0],
            referrer_code: query.ref || "",
          });
        }
        connectAccount(accounts[0]);
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
