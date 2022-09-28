import Block from "components/Block";
import GameNav from "components/GameNav";
import Layout from "components/Layout";
import Ticket from "components/Ticket";
import type { NextPage } from "next";

const Chainprizes: NextPage = () => {
  return (
    <Layout>
      <section className="container pt-5">
        <h1 className="text-shades-10 font-extrabold text-2xl mb-0-75">
          No Lose 1$ Game
        </h1>
        <p className="text-shade-9 font-semibold">
          Deposit 1$ worth of BUSD, USDT, or USDC for a chance to win 10.000$ in
          BUSD !
        </p>
      </section>
      <section className="container pt-3">
        <GameNav />
        <div className="pt-2">
          <Ticket
            title={`1$ Game \nTicket`}
            heading="10.000 BUSD Prize Reward"
            intro="Enter the game with 1 BSC Network BUSD/USDT/USDC"
            winOutcome="One lucky player will win 10.000 BUSD"
            loseOutcome="If you don’t win you can withdraw your 1$  or use it to enter another game"
            entryPrice={1}
            prevPrice={10000}
            minimumPlayers={10000}
            currentPlayers={1762}
          />
        </div>
      </section>
      <section className="container pt-2">
        <Block
          title="How to Participate"
          items={[
            "Connect Metamask and click “Play Now” to deposit $1 worth of Binance Smart Chain Network BUSD, USDT, or USDC.",
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
            "User will be able to view 'My Subscription' for participation confirmation.",
            "Users can invite their friends to participate in the $1 Game after successfully participating in the $1 Game. If you successfully invite one New player to participate in the $1 Game, you will fix your next ticket purchase fee at 0.5$ BNB.",
            "Winner annoucement will only happen if the participants exceed minimum number of participants.",
          ]}
        />
      </section>
    </Layout>
  );
};

export default Chainprizes;
