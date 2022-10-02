import type { AppProps } from "next/app";

import "styles/globals.css";
import Web3AppProvider from "context/Web3App";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Web3AppProvider>
      <Component {...pageProps} />
    </Web3AppProvider>
  );
};

export default MyApp;
