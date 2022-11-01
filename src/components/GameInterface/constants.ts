import { GAME_TARGET, TICKET_PRICE } from "shared/constants";
import { toUSDCurrencyString } from "./GameTicket/utils";

export const _GameticketContent = {
  heading: `Win the Grand Prize - 1 Million Dollar BUSD !`,
  intro: `Enter the game with ${parseFloat(TICKET_PRICE)} BUSD or USDT/USDC`,
  winOutcome: `One lucky player will win 1 Million Dollar worth of BUSD`,
  loseOutcome: `Rest of players can still withdraw their ${toUSDCurrencyString(
    parseFloat(TICKET_PRICE)
  )} or use it for the next game`,
  prevPrice: toUSDCurrencyString(GAME_TARGET),
  entryPrice: parseFloat(TICKET_PRICE),
};
