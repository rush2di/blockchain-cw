import Image from "next/image";
import React, { ReactNode } from "react";
import { progressPercent } from "./utils";

interface TicketProps extends ProgressBarProps {
  title: string;
  intro: string;
  heading: string;
  winOutcome: string;
  loseOutcome: string;
  entryPrice: number;
  prevPrice: number;
}

interface ProgressBarProps {
  minimumPlayers: number;
  currentPlayers: number;
}

const Ticket = ({
  title,
  intro,
  heading,
  winOutcome,
  loseOutcome,
  entryPrice,
  prevPrice,
  minimumPlayers,
  currentPlayers,
}: TicketProps) => {
  return (
    <div className="w-full bg-shades-1 border-shades-3 rounded-lg ">
      <div className="flex flex-col md:flex-row items-center">
        <div className="min-h-[320px] w-full md:w-[370px] md:self-stretch flex items-center justify-center relative after:overlay overflow-hidden rounded-t-lg md:rounded-l-lg">
          <Image
            src={"https://source.unsplash.com/yJpjLD3c9bU"}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute flex items-center justify-center left-0 top-0 w-full h-full uppercase font-bold z-10 whitespace-pre text-center text-xl">
            {title}
          </div>
        </div>
        <div className="p-2 flex flex-col justify-between self-stretch">
          <div>
            <h1 className="text-shades-10 font-extrabold mb-0-75 text-1xl">
              {heading}
            </h1>
            <p className="text-shades-7">{intro}</p>
            <ul className="text-shades-7">
              <li>- {winOutcome}</li>
              <li>- {loseOutcome}</li>
            </ul>
          </div>
          <div className="pt-1 pb-1">
            <span className="text-shades-10 font-bold mb-0-5 inline-block text-base">
              Entry Price
            </span>
            <div className="flex items-end">
              <span className="block text-shades-10 font-bold text-md">
                {parseFloat(entryPrice.toFixed(2)).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
              <span className="block text-shades-7 line-through ml-1 text-md">
                {parseFloat(prevPrice.toFixed(2)).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between py-0-75">
            <div>
              <span className="text-shades-10 font-bold mb-0-5 block text-base">
                Minimum Participants
              </span>
              <span className="text-shades-8 mb-0-5 block text-md">
                ≥ {minimumPlayers}
              </span>
            </div>
            <div className="v-seperator" />
            <div>
              <span className="text-shades-10 font-bold mb-0-5 block text-base">
                Current Participants
              </span>
              <span className="text-shades-8 mb-0-5 block text-md">
                ~ {currentPlayers}
              </span>
            </div>
          </div>
          <div className="py-0-75">
            <ProgressBar
              minimumPlayers={minimumPlayers}
              currentPlayers={currentPlayers}
            />
          </div>
          <div className="pt-0-75">
            <button className="btn btn--light btn--rounded w-full md:w-1/2">
                Play Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressBar = ({ minimumPlayers, currentPlayers }: ProgressBarProps) => {
  return (
    <div className="w-full h-0-5 bg-shades-3 rounded">
      <div
        style={{ width: `${progressPercent(minimumPlayers, currentPlayers)}%` }}
        className="h-0-5 bg-amber-500 rounded"
      />
    </div>
  );
};

export default Ticket;
