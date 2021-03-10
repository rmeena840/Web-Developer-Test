import React, { useContext, useState, Fragment } from "react";
import { toast } from "react-toastify";

import IconButton from "./../../components/ui/IconButton";

import CartContext from "./state/CartContext";
import { notify } from "./CartToast";

import { round } from "./utilities";

function CartTableRow(props) {
  const { state, dispatch } = useContext(CartContext);
  const item = props.item;
  const itemIndex = state.items.findIndex(
    (loopItem) => loopItem.sku === item.sku
  );
  const [clonedQuantity, setClonedQuantity] = useState(item.quantity);

  function size(itemSize) {
    const sizes = {
      small: "S",
      medium: "M",
      large: "L",
    };
    return <span>({sizes[itemSize]})</span>;
  }

  function handleChange(e) {
    setClonedQuantity(e.target.value);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      validateInput(e.target.value);
    }
  }
  function handleBlur(e) {
    validateInput(e.target.value);
  }
  function validateInput(value) {
    if (value === "") {
      setClonedQuantity(state.items[itemIndex].quantity);
    } else if (isNaN(value)) {
      notify("NOT_A_NUMBER");
      setClonedQuantity(state.items[itemIndex].quantity);
    } else if (!Number.isInteger(Number(value))) {
      notify("NOT_AN_INTEGER");
      setClonedQuantity(state.items[itemIndex].quantity);
    } else if (Number(value) <= 0) {
      notify("MINIMUM_QUANTITY");
      setClonedQuantity(state.items[itemIndex].quantity);
    } else if (value > item.stockLevel) {
      notify("STOCK_LEVEL");
      setClonedQuantity(state.items[itemIndex].quantity);
    } else {
      dispatch({
        type: "UPDATE_ITEM",
        sku: item.sku,
        quantity: value,
      });
      setClonedQuantity(value);
    }
  }

  function decrease() {
    const newQuantity = item.quantity - 1;
    if (newQuantity >= 1) {
      dispatch({ type: "UPDATE_ITEM", sku: item.sku, quantity: newQuantity });
      setClonedQuantity(newQuantity);
    } else {
      notify("MINIMUM_QUANTITY");
    }
  }
  function increase() {
    const newQuantity = item.quantity + 1;
    if (newQuantity <= item.stockLevel) {
      dispatch({ type: "UPDATE_ITEM", sku: item.sku, quantity: newQuantity });
      setClonedQuantity(newQuantity);
    } else {
      notify("STOCK_LEVEL");
    }
  }

  function remove() {
    dispatch({
      type: "QUEUE_FOR_REMOVAL",
      sku: item.sku,
    });
    toast(
      () => {
        return (
          <div>
            <strong>{item.name}</strong> has been removed.{" "}
            <button className="CartToast__button" onClick={undoRemove}>
              Undo
            </button>
          </div>
        );
      },
      {
        onClose: () => dispatch({ type: "CLEAN_REMOVAL_QUEQUE" }),
        position: toast.POSITION.BOTTOM_CENTER,
      }
    );
  }
  function undoRemove() {
    dispatch({ type: "UNDO_REMOVE", sku: item.sku });
  }

  return (
    <tr
      className={`CartTable__row ${
        item.quantity > item.stockLevel ? "is-out-of-stock" : ""
      }`}
      key={item.sku}
    >
      <td
        className="CartTable__cell is-product has-no-h-padding"
        data-title="Product"
      >
        {item.quantity > item.stockLevel ? (
          <span className="CartTable__out-of-stock-msg-wr">
            {item.name}&nbsp;
            {item.size && <>&nbsp;{size(item.size)}</>}
            <span className="CartTable__out-of-stock-msg">
              This item is now out of stock
            </span>
          </span>
        ) : (
          <span>
            {item.name} {item.size && size(item.size)}
          </span>
        )}
      </td>
      <td className="CartTable__cell is-price" data-title="Price">
        £{item.price}
      </td>
      <td className="CartTable__cell is-quantity" data-title="Quantity">
        <div className="CartTable__quantity-input-wr">
          <button
            className="CartTable__quantity-input-btn is-minus"
            aria-label="Decrease quantity"
            onClick={decrease}
          ></button>
          <input
            className="CartTable__quantity-input-el"
            type="text"
            value={clonedQuantity}
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          <button
            className="CartTable__quantity-input-btn is-plus"
            aria-label="Increase quantity"
            onClick={increase}
          ></button>
        </div>
      </td>
      <td className="CartTable__cell is-cost" data-title="Cost">
        £{round(item.price * item.quantity)}
      </td>
      <td
        className="CartTable__cell is-delete has-no-h-padding"
        data-title="Delete"
      >
        <IconButton
          label="Delete"
          mask="/static/images/bin.svg"
          onClickHandler={remove}
        />
      </td>
    </tr>
  );
}

export default CartTableRow;
