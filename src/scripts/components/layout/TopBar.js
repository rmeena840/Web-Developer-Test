import React from "react";
import "./TopBar.scss";

import Menu from "./Menu";

const menuItems = [
  {
    label: "Products",
    href: "#",
  },
  {
    label: "News",
    href: "#",
  },
  {
    label: "Contact",
    href: "#",
  },
  {
    label: "Cart",
    href: "#",
    iconUrl: "/static/images/cart.svg",
  },
];

function TopBar() {
  return (
    <div className="TopBar">
      <div className="TopBar__container">
        <div className="TopBar__left">
          <a href="/" aria-label="Back home">
            <img
              className="TopBar__logo"
              src="/static/images/logo.svg"
              alt="Logo Apps"
            />
          </a>
        </div>
        <div className="TopBar__right">
          <Menu />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
