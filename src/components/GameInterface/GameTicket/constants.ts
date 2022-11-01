import {
  BUSD_ADDRESS,
  BUSD_DECIMALS,
  USDC_ADDRESS,
  USDC_DECIMALS,
  USDT_ADDRESS,
  USDT_DECIMALS,
} from "shared/constants";

const _tokens = [
  { name: "BUSD", address: BUSD_ADDRESS, decimals: BUSD_DECIMALS },
  { name: "USDT", address: USDT_ADDRESS, decimals: USDT_DECIMALS },
  { name: "USDC", address: USDC_ADDRESS, decimals: USDC_DECIMALS },
];

const ACP_AMOUNT = 131278;

export { _tokens, ACP_AMOUNT };
