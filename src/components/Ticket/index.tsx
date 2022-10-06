import Image from "next/image";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import {
  MOCKBUSD_ADDRESS,
  MOCKBUSD_DECIMALS,
  MOCKUSDC_ADDRESS,
  MOCKUSDC_DECIMALS,
  MOCKUSDT_ADDRESS,
  MOCKUSDT_DECIMALS,
} from "shared/constants";
import {
  progressPercent,
  tokenImageTransformer,
  toUSDCurrencyString,
} from "./utils";

interface TicketProps extends TicketProgressBarProps, TicketButtonsProps {
  title: string;
  cover: `https://source.unsplash.com/${string}`;
  content: TicketContentProps;
}

interface TicketButtonsProps {
  disabled: boolean;
  handleClick: (tokenAddress: string, decimals: number) => void;
}

export interface TicketContentProps {
  intro: string;
  heading: string;
  winOutcome: string;
  loseOutcome: string;
  entryPrice: number;
  prevPrice: number;
}

interface TicketProgressBarProps {
  minimumPlayers: number;
  currentPlayers: number;
}

const _tokens = [
  { name: "BUSD", address: MOCKBUSD_ADDRESS, decimals: MOCKBUSD_DECIMALS },
  { name: "USDT", address: MOCKUSDT_ADDRESS, decimals: MOCKUSDT_DECIMALS },
  { name: "USDC", address: MOCKUSDC_ADDRESS, decimals: MOCKUSDC_DECIMALS },
];

const Ticket = ({
  title,
  cover,
  content,
  disabled,
  minimumPlayers,
  currentPlayers,
  handleClick,
}: TicketProps) => {
  return (
    <div className="w-full bg-shades-1 border-shades-3 rounded-lg ">
      <div className="flex flex-col md:flex-row items-center">
        <div className="min-h-[320px] w-full md:w-[370px] md:self-stretch flex items-center justify-center relative after:overlay overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
          <Image src={cover} layout="fill" objectFit="cover" />
          <div className="absolute flex items-center justify-center left-0 top-0 w-full h-full uppercase font-bold z-10 whitespace-pre text-center text-xl">
            {title}
          </div>
        </div>
        <div className="p-2 flex flex-col justify-between self-stretch">
          <div>
            <h1 className="text-shades-10 font-extrabold mb-0-75 text-1xl">
              {content.heading}
            </h1>
            <p className="text-shades-7">{content.intro}</p>
            <ul className="text-shades-7">
              <li>- {content.winOutcome}</li>
              <li>- {content.loseOutcome}</li>
            </ul>
          </div>
          <div className="pt-1 pb-1">
            <span className="text-shades-10 font-bold mb-0-5 inline-block text-base">
              Entry Price
            </span>
            <div className="flex items-end">
              <span className="block text-shades-10 font-bold text-md">
                {toUSDCurrencyString(content.entryPrice)}
              </span>
              <span className="block text-shades-7 line-through ml-1 text-md">
                {toUSDCurrencyString(content.prevPrice)}
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
            <TicketProgressBar
              minimumPlayers={minimumPlayers}
              currentPlayers={currentPlayers}
            />
          </div>
          <div className="pt-0-75 flex flex-col-reverse md:flex-row items-stretch">
            <TicketButtons handleClick={handleClick} disabled={disabled} />
          </div>
        </div>
      </div>
    </div>
  );
};

const TicketProgressBar = ({
  minimumPlayers,
  currentPlayers,
}: TicketProgressBarProps) => {
  return (
    <div className="w-full h-0-5 bg-shades-3 rounded">
      <div
        style={{ width: `${progressPercent(minimumPlayers, currentPlayers)}%` }}
        className="h-0-5 bg-amber-500 rounded"
      />
    </div>
  );
};

const TicketButtons = ({ disabled, handleClick }: TicketButtonsProps) => {
  const [selected, setSelected] = useState(_tokens[0]);

  return (
    <>
      <button
        disabled={disabled}
        onClick={() => handleClick(selected.address, selected.decimals)}
        className={`btn--rounded w-full md:w-1/2 ${
          disabled ? "btn" : "btn--light"
        }`}
      >
        Play Now
      </button>
      <div className="block self-stretch w-full mb-1 md:mb-0 md:w-1/2 md:ml-1">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative w-full h-full">
            <Listbox.Button className="relative h-full w-full cursor-default btn btn--dark btn--rounded pl-1 pr-2-75 text-left font-bold">
              <div className="flex truncate text-shades-9 items-center">
                <span className="text-sm font-normal">pay with </span>
                <span className="ml-0-45">{selected.name}</span>
                <div className="relative w-1-5 h-1-5 ml-0-45">
                  <Image
                    src={`/assets/${selected.name.toLowerCase()}.png`}
                    layout="fill"
                  />
                </div>
              </div>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-0-5">
                <ChevronUpDownIcon
                  className="h-1-5 w-1-5 text-shades-7"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-shades-1 border-shades-3 py-1 text-base shadow-lg ring-1 ring-shades-3 ring-opacity-5 focus:outline-none sm:text-sm">
                {_tokens.map((token, tokenIdx) => (
                  <Listbox.Option
                    key={tokenIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-1 px-1-25 mx-1 rounded ${
                        active ? "bg-amber-100 text-amber-900" : "text-shades-9"
                      }`
                    }
                    value={token}
                  >
                    {({ selected }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={`block truncate w-3 ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {token.name}
                          </span>
                          <div className="relative w-2 h-2">
                            <Image
                              src={tokenImageTransformer(token.name)}
                              layout="fill"
                            />
                          </div>
                        </div>
                        {selected ? (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-1 text-amber-600">
                            <CheckIcon
                              className="h-1-45 w-1-45"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </>
  );
};

export default Ticket;
