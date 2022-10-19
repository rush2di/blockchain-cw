import { Tab } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { GameContext } from "context/Game";
import { useContext } from "react";
import { HOST_NAME } from "shared/constants";
import { classNames } from "shared/utils";
import { IGameDashboardProps, IGameDashboardBodyItemProps } from "./types";

const GameDashboard = ({
  currAccount,
  handleCopyToClipboard,
}: IGameDashboardProps) => {
  return (
    <Tab.Panel
      className={classNames(
        "w-full py-0-5 bg-shades-1 min-h-[400px]",
        "border-shades-3 rounded-lg px-1",
        !currAccount ? "flex flex-col items-center justify-center" : "flex"
      )}
    >
      {!currAccount ? (
        <GameDashboardNotice />
      ) : (
        <GameDashboardBody
          currAccount={currAccount}
          handleCopyToClipboard={handleCopyToClipboard}
        />
      )}
    </Tab.Panel>
  );
};

const GameDashboardBody = ({
  currAccount,
  handleCopyToClipboard,
}: IGameDashboardProps) => {
  const { playerParticipations, playerRefunds, playerData } =
    useContext(GameContext);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="row w-full">
        <div className="lg:col-5 col-12">
          <div className="py-1 flex flex-col">
            <div className="mb-1">
              <GameDashboardBodyItem
                title="Your Connected Address"
                value={currAccount!}
                handleCopyToClipboard={handleCopyToClipboard}
              />
            </div>
            <div className="mb-1">
              <GameDashboardBodyItem
                title="Your Referral Link"
                value={`${HOST_NAME}?ref=${playerData!.referral_code}`}
                handleCopyToClipboard={handleCopyToClipboard}
              />
            </div>
            <p className="text-md text-shades-7 mx-0-25 mb-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              molestiae placeat dicta provident hic incidunt.
            </p>
            <div>
              <h3 className="font-semibold text-lg mb-0-5 ml-0-45">
                Your Referrals Status
              </h3>
              <div
                className={classNames(
                  "flex bg-black rounded border border-l-4",
                  "overflow-hidden border-shades-2 w-fit",
                  `${
                    playerData!.referred > 0
                      ? "border-l-green-500"
                      : "border-l-red-500"
                  }`
                )}
              >
                <span
                  className={classNames(
                    "flex items-center text-shades-8 font-bold",
                    "pointer-events-none px-1"
                  )}
                >
                  {playerData!.referred}
                </span>
                <div
                  className={classNames(
                    "px-1 py-0-5 flex items-center w-full",
                    "border-l border-shades-2"
                  )}
                >
                  <span className="block text-shades-9 text-md mb-0">
                    Person referred so far
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-7 col-12">
          <div className="py-1 px-0-25 h-full w-full font-[monospace]">
            <div
              className={classNames(
                "bg-black flex flex-col h-full",
                "justify-between rounded-lg w-full"
              )}
            >
              <div className="py-0-5 px-1-75 flex items-end">
                <span
                  className={classNames(
                    "block font-semibold text-[12em]",
                    "leading-none text-shades-8"
                  )}
                >
                  {playerParticipations}
                </span>
                <span className="block text-md ml-1 mb-1-75">
                  / current game participations
                </span>
              </div>
              <div className="px-1 pb-1-25">
                <table
                  className={classNames(
                    "table-auto w-full border",
                    " border-shades-2 rounded-lg lg:mt-auto"
                  )}
                >
                  <tbody>
                    <tr>
                      <td
                        className={classNames(
                          "p-0-75 lg:p-1 border-b border-shades-2",
                          " text-shades-10 font-semibold"
                        )}
                      >
                        Available refunds amount
                      </td>
                      <td className="p-0-75 lg:p-1 border-b border-shades-2">
                        {playerRefunds}
                      </td>
                      <td className="p-0-75 lg:p-1 border-b border-shades-2">
                        <button disabled className="btn btn--sm btn--muted">
                          Claim
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-0-75 lg:p-1 text-shades-10 font-semibold">
                        Wins history
                      </td>
                      <td className="p-0-75 lg:p-1 ">0</td>
                      <td
                        aria-hidden
                        className="p-0-75 lg:p-1 text-black pointer-events-none"
                      >
                        empty
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameDashboardNotice = () => {
  return (
    <div
      className={classNames(
        "border-red-800 py-0-5 px-1-25 rounded-lg bg-red-600",
        "w-fit text-center mx-auto flex items-center"
      )}
    >
      <div
        className={classNames(
          "mr-1 flex h-2-5 w-2-5 flex-shrink-0 items-center",
          "justify-center rounded-full bg-red-100"
        )}
      >
        <ExclamationTriangleIcon
          className="h-1-75 w-1-75 text-red-600"
          aria-hidden="true"
        />
      </div>
      <p>You need to connect your wallet in order to access your dashboard</p>
    </div>
  );
};

const GameDashboardBodyItem = ({
  title,
  value,
  handleCopyToClipboard,
}: IGameDashboardBodyItemProps) => {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-0-5 ml-0-45">{title}</h3>
      <div
        className={classNames(
          "lg:w-fit py-0-45 px-1 bg-black rounded-lg",
          "border border-shades-2 flex items-center",
          "w-full lg:justify-start justify-between"
        )}
      >
        <span
          className={classNames(
            "block text-md text-shades-7 pointer-events-none",
            "whitespace-nowrap text-ellipsis overflow-hidden"
          )}
        >
          {value}
        </span>
        <button
          onClick={() => handleCopyToClipboard(value)}
          className={classNames(
            "bg-shades-1 h-1-75 w-1-75 rounded-full",
            "flex items-center justify-center ml-1",
            "cursor-pointer hover:bg-shades-2"
          )}
        >
          <ClipboardDocumentCheckIcon
            className="h-1-25 w-1-25 text-shades-10"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

export default GameDashboard;