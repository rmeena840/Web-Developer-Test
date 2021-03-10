import React from "react";
import ReactDOM from "react-dom";
import Cart from "./cart/Cart";

function init() {
  ReactDOM.render(<Cart />, document.getElementById("cart"));
}

export default {
  init: init,
};
