import type { NextPage } from "next";

import Block from "components/Block";
import Layout from "components/Layout";
import Debuger from "components/Debuger";
import GameInterface from "components/GameInterface";

const Chainprizes: NextPage = () => {
  return (
    <Layout>
      <Debuger />
      <section className="container pt-5">
        <h1 className="text-shades-10 font-extrabold text-2xl mb-0-75">
          No Lose 1 Dollar Game
        </h1>
        <p className="text-shade-9 font-semibold">
          Deposit $1.75 worth of BUSD, USDT, or USDC for a chance to win 1,000,000.00$ in
          BUSD !
        </p>
      </section>
      <section className="container pt-3">
        <GameInterface />
      </section>
      <section className="container pt-2">
        <Block
          title="How to Participate"
          items={[
            "Connect Metamask and click “Play Now” to deposit $1.75 worth of Binance Smart Chain Network BUSD, USDT, or USDC.",
            "Each time you purchase a ticket there is a BNB fee that should be paid, first ticket fee is ~ 0.5$ worth of BNB, second ticket ~ 1$ worth of BNB, and ~ 2$ worth of BNB fee for more than three tickets. ( Make sure you have enough BNB to particapte )",
            "Invite New Users to participate the $1 Game to fix your next ticket purchase fee at 0.5$ BNB.",
          ]}
        />
      </section>
      <section className="container pt-2 pb-5">
        <Block
          title="Terms & Conditions"
          items={[
            "Completing “Play Now” will confirm your participation in this activity, upon successful payment of $1 on the product(s) listed on $1 campaign page.",
            "Users will win 1$ worth of BUSD for each new player participating through their referral link",
            "Users can invite their friends to participate in the no lose Game. When a new player participate through your referral link, your next ticket purchase fee at 0.5$ BNB.",
            "Winner annoucement will only happen if the participants exceed minimum number of participants.",
          ]}
        />
      </section>
    </Layout>
  );
};

export default Chainprizes;
