import React from "react";

import "./CartMessage.scss";

import IconButton from "./../../components/ui/IconButton";

function CartMessage(props) {
  return (
    <div className="CartMessage">
      <div className="CartMessage__panel">
        <div>
          <h2 className="CartMessage__heading">{props.heading}</h2>
          <p className="CartMessage__message">{props.message}</p>
        </div>
        {props.action && (
          <div className="CartMessage__action">{props.action}</div>
        )}
      </div>
    </div>
  );
}

export default CartMessage;
