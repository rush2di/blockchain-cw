import React from "react";
import { _APP_NAME } from "shared/constants";


const Footer = () => {
  return (
    <div className="w-full bg-shades-1 py-1">
      <div className="container text-center text-shades-6">copyright {_APP_NAME} 2022</div>
    </div>
  );
};

export default Footer;
