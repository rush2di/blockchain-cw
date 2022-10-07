import {
  MOCKBUSD_ADDRESS,
  MOCKBUSD_DECIMALS,
  MOCKUSDC_ADDRESS,
  MOCKUSDC_DECIMALS,
  MOCKUSDT_ADDRESS,
  MOCKUSDT_DECIMALS,
} from "shared/constants";

const _tokens = [
  { name: "BUSD", address: MOCKBUSD_ADDRESS, decimals: MOCKBUSD_DECIMALS },
  { name: "USDT", address: MOCKUSDT_ADDRESS, decimals: MOCKUSDT_DECIMALS },
  { name: "USDC", address: MOCKUSDC_ADDRESS, decimals: MOCKUSDC_DECIMALS },
];

export { _tokens };
