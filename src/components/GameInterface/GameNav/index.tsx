import { Tab } from "@headlessui/react";
import { classNames } from "shared/utils";

const GameNav = () => {
  return (
    <div className="w-full py-0-5 bg-shades-1 border-shades-3 rounded-lg px-1">
      <Tab.List className="flex items-center mx-auto lg:w-3/6 w-full">
        <Tab
          className={classNames(
            "btn btn--rounded",
            "ui-selected:btn--prim ui-not-selected:btn--dark"
          )}
        >
          My Subscribtion
        </Tab>
        <hr className="v-seperator mx-1" />
        <Tab
          className={classNames(
            "btn btn--rounded",
            "ui-selected:btn--prim ui-not-selected:btn--dark"
          )}
        >
          Live Game
        </Tab>
      </Tab.List>
    </div>
  );
};

export default GameNav;
