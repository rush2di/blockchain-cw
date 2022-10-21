export const _APP_NAME: string = "Chainprizes";

export const CHAINPRIZES_ADDRESS = process.env.NEXT_PUBLIC_CHAINPRIZES_ADDRESS || "";

export const BUSD_ADDRESS = process.env.NEXT_PUBLIC_MOCKBUSD_ADDRESS || "";

export const USDT_ADDRESS = process.env.NEXT_PUBLIC_MOCKUSDT_ADDRESS || "";

export const USDC_ADDRESS = process.env.NEXT_PUBLIC_MOCKUSDC_ADDRESS || "";

export const BUSD_DECIMALS = 18;

export const USDT_DECIMALS = 6;

export const USDC_DECIMALS = 6;

export const TICKET_PRICE = "1.00";

export const GAME_TARGET = 10;

export const GAME_FEE_1 = process.env.NEXT_PUBLIC_GAME_FEE_1 || "0.001";

export const GAME_FEE_2 = process.env.NEXT_PUBLIC_GAME_FEE_2 || "0.003";

export const GAME_FEE_3 = process.env.NEXT_PUBLIC_GAME_FEE_3_PLUS || "0.007";

export const HOST_NAME = "http://localhost:3000/";

export const DAPP_STORAGE_KEY = "isDappApproved";

export const isBrowser = typeof window !== "undefined";
