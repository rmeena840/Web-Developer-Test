import React, { useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";

import "./Menu.scss";

import Portal from "./../Portal";
import MenuList from "./MenuList";

function Menu() {
  const layoutBreakpointMatches = useMediaQuery(
    "only screen and (min-width: 1024px)"
  );
  const [mobileIsVisible, setMobileIsVisible] = useState(false);

  function toggleVisibility() {
    setMobileIsVisible(!mobileIsVisible);
  }

  if (layoutBreakpointMatches) {
    return (
      <nav className="Menu">
        <MenuList type="desktop" />
      </nav>
    );
  } else {
    return (
      <nav className="Menu">
        <button className="Menu__toggle" onClick={toggleVisibility}>
          <span className="Menu__toggle-icon"></span>
          <span className="Menu__toggle-label">Menu</span>
        </button>

        {mobileIsVisible && (
          <Portal>
            <span className="Menu__backdrop" onClick={toggleVisibility}></span>
            <MenuList type="mobile" />
          </Portal>
        )}
      </nav>
    );
  }
}

export default Menu;
