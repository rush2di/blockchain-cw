import React from "react";
import { _APP_NAME, _APP_VERSION } from "shared/constants";


const Footer = () => {
  return (
    <div className="w-full bg-shades-1 py-1">
      <div className="container text-center text-shades-6">{_APP_NAME} v{_APP_VERSION} beta  &#8212;  &#9400;{new Date().getFullYear()}</div>
    </div>
  );
};

export default Footer;
