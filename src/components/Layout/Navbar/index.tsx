import Image from "next/image";
import { _APP_NAME } from "utils/globales/constants";

interface NavbarProps {
  currentAccount: string | null;
  handleConnect(): void;
  handleDisconnect(): void;
}

const Navbar = ({
  currentAccount,
  handleConnect,
  handleDisconnect,
}: NavbarProps) => {
  const handleClick = () => {
    currentAccount === null ? handleConnect() : handleDisconnect();
  };

  return (
    <nav className="bg-shades-1 w-full border-b border-shades-3">
      <div className="container">
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center">
            <div className="w-2 h-2 relative">
              <Image src={"/assets/logo.png"} layout="fill" />
            </div>
            <span className="ml-0-5 font-bold">{_APP_NAME}</span>
          </div>
          <div>
            <button
              onClick={handleClick}
              className="btn btn--light btn--rounded"
            >
              {currentAccount === null ? "Connect Wallet" : "Disconnect Wallet"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
