import Image from "next/image";
import { _APP_NAME } from "utils/globales/constants";

const Navbar = () => {
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
            <button className="btn btn--light btn--rounded">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
