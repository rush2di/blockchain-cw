export const _APP_NAME = "Chainprizes";

export const _APP_VERSION = "0.1.0";

export const CHAINPRIZES_ADDRESS = process.env.NEXT_PUBLIC_CHAINPRIZES_ADDRESS || "";

export const BUSD_ADDRESS = process.env.NEXT_PUBLIC_MOCKBUSD_ADDRESS || "";

export const USDT_ADDRESS = process.env.NEXT_PUBLIC_MOCKUSDT_ADDRESS || "";

export const USDC_ADDRESS = process.env.NEXT_PUBLIC_MOCKUSDC_ADDRESS || "";

export const BUSD_DECIMALS = 18;

export const USDT_DECIMALS = 6;

export const USDC_DECIMALS = 6;

export const TICKET_PRICE = "1.75";

export const GAME_TARGET = 1000000;

export const GAME_FEE_1 = "0,0015";

export const GAME_FEE_2 = "0,0023";

export const GAME_FEE_3 = "0,0030";

export const GAME_FEE_STEP = "0,0008";

export const HOST_NAME = "http://localhost:3000/";

export const DAPP_STORAGE_KEY = "isDappApproved";

export const isBrowser = typeof window !== "undefined";
