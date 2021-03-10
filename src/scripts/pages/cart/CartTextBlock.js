import React from "react";

import "./CartTextBlock.scss";

function CartTextBlock(props) {
  return (
    <div className="CartTextBlock">
      <h1 className="CartTextBlock__heading">Your Basket</h1>
      <p className="CartTextBlock__body">
        Items you have added to your basket are shown below. Adjust the
        quantities or remove items before continuing purchase.
      </p>
    </div>
  );
}

export default CartTextBlock;
