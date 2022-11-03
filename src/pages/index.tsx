import type { NextPage } from "next";

import Block from "components/Block";
import Layout from "components/Layout";
import Debuger from "components/Debuger";
import GameInterface from "components/GameInterface";
import { isProd, PRIZE_AMOUNT_TEXT, TICKET_PRICE } from "shared/constants";

const Chainprizes: NextPage = () => {
  return (
    <Layout>
      {!isProd && <Debuger />}
      <section className="container sm:pt-1 md:pt-3 lg:pt-5">
        <h1 className="text-shades-10 font-extrabold text-2xl mb-0-75">
          No Lose 1 Dollar Game
        </h1>
        <p className="text-shade-9 font-semibold">
          Deposit ${TICKET_PRICE} worth of BUSD or USDT for a chance to win{" "}
          {PRIZE_AMOUNT_TEXT} in BUSD !
        </p>
      </section>
      <section className="container pt-3">
        <GameInterface />
      </section>
      <section className="container pt-2">
        <Block
          title="How to Participate"
          items={[
            "Connect Metamask and click “Play Now” to deposit $1.75 worth of Binance Smart Chain Network BUSD/USDT.",
            "Each time you purchase a ticket there is a BNB fee that should be paid, your first ticket purchase fee is ~ 0.5$, then for each of your next purchases the fee will be increasing by ~0.25$. ( Make sure you have enough BNB to particapte )",
            "Invite New Users to participate the $1 Game to fix your next ticket purchase fee at 0.5$ BNB.",
            "For each new user participating through your referral link you win a 1$ worth of BUSD.",
          ]}
        />
      </section>
      <section className="container pt-2 pb-5">
        <Block
          title="Terms & Conditions"
          items={[
            "Completing “Play Now” will confirm your participation in this activity, upon successful payment of $1 on the product(s) listed on $1 campaign page.",
            "Winner annoucement will only happen if the participants exceed minimum number of participants.",
          ]}
        />
      </section>
    </Layout>
  );
};

export default Chainprizes;
