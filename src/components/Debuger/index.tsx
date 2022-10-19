import { ethers } from "ethers";
import { useContext } from "react";
import { Web3AppContext } from "context/Web3";

const Debuger = () => {
  const { contracts } = useContext(Web3AppContext);

  const handleClick = async () => {
    const accounts = [
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    ];
    const amount = ethers.utils.parseEther("100000");
    await contracts.mockBUSD!.faucet(accounts, amount);
    await contracts.mockUSDT!.faucet(accounts, amount);
    await contracts.mockUSDC!.faucet(accounts, amount);
  };

  return (
    <div className="fixed p-1 bg-black rounded shadow-md text-shades-10 left-0 bottom-0 z-50">
      <button onClick={handleClick} className="btn btn--light">
        Fill accounts
      </button>
    </div>
  );
};

export default Debuger;
