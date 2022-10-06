import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { _APP_NAME } from "shared/constants";

interface NavbarProps {
  currentAccount: string | null;
  handleConnect(): void;
}

const Navbar = ({ currentAccount, handleConnect }: NavbarProps) => {
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
              onClick={handleConnect}
              className="btn btn--light btn--rounded btn--flex-center"
            >
              {currentAccount === null
                ? "Connect MetaMask"
                : "Connected"}
              {currentAccount !== null && <ConnectionBadge />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const ConnectionBadge = () => {
  return (
    <span className="h-[1.40rem] w-[1.40rem] rounded-[50%] ml-0-45 flex items-center justify-center bg-inherit">
      <CheckCircleIcon className="w-full h-full text-green-600" />
    </span>
  );
};

export default Navbar;
