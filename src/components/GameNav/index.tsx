const GameNav = () => {
  return (
    <div className="w-full py-0-5 bg-shades-1 border-shades-3 rounded-lg px-1">
      <div className="flex items-center mx-auto lg:w-3/6 w-full">
        <button className="btn btn--dark btn--rounded">My Subscribtion</button>
        <hr className="v-seperator mx-1" />
        <button className="btn btn--dark btn--rounded">Live Game</button>
      </div>
    </div>
  );
};

export default GameNav;
