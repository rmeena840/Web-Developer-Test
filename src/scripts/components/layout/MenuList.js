import React, { Fragment, useContext } from "react";
import "./MenuList.scss";

import CartContext from "./../../pages/cart/state/CartContext";

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

function MenuList(props) {
  const { state, dispatch } = useContext(CartContext);
  return (
    <ul className={`MenuList ${props.type}`}>
      {menuItems.map((item, index) => (
        <li className="MenuList__item" key={index}>
          <a
            className={`MenuList__link ${
              item.iconUrl ? "is-icon" : "is-label"
            }`}
            href={item.href}
            aria-label={item.label}
          >
            {item.iconUrl ? (
              <Fragment>
                <span
                  className="MenuList__link-icon"
                  style={{
                    WebkitMaskImage: `url(${item.iconUrl})`,
                    maskImage: `url(${item.iconUrl})`,
                  }}
                >
                  {item.label}
                </span>
                {state.items.length > 0 && (
                  <span className="MenuList__link-icon-number">
                    {state.items.length}
                  </span>
                )}
              </Fragment>
            ) : (
              <span className="MenuList__link-label">{item.label}</span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default MenuList;
