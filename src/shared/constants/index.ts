import { ethers } from "ethers";

export const _APP_NAME: string = "Chainprizes";

export const CHAINPRIZES_ADDRESS = process.env.NEXT_PUBLIC_CHAINPRIZES_ADDRESS || "";

export const MOCKBUSD_ADDRESS = process.env.NEXT_PUBLIC_MOCKBUSD_ADDRESS || "";

export const MOCKUSDT_ADDRESS = process.env.NEXT_PUBLIC_MOCKUSDT_ADDRESS || "";

export const MOCKUSDC_ADDRESS = process.env.NEXT_PUBLIC_MOCKUSDC_ADDRESS || "";

export const MOCKBUSD_DECIMALS = 18;

export const MOCKUSDT_DECIMALS = 6;

export const MOCKUSDC_DECIMALS = 6;

export const TICKET_PRICE = "1.00";

export const GAME_FEE_1 = process.env.NEXT_PUBLIC_GAME_FEE_1 || "0.001";

export const GAME_FEE_2 = process.env.NEXT_PUBLIC_GAME_FEE_2 || "0.003";

export const GAME_FEE_3 = process.env.NEXT_PUBLIC_GAME_FEE_3_PLUS || "0.007";