import React, { useContext, Fragment } from "react";

import "./CartTable.scss";

import CartTableRow from "./CartTableRow";

import { round } from "./utilities";

import CartContext from "./state/CartContext";

function CartTable(props) {
  const { state, dispatch } = useContext(CartContext);

  function getSubtotal(items) {
    let itemsToCount = state.items.filter((item) => {
      return (
        item.quantity <= item.stockLevel && !state.toRemove.includes(item.sku)
      );
    });
    let subTotal = 0;
    for (let i = 0; i < itemsToCount.length; ++i) {
      subTotal += itemsToCount[i].price * itemsToCount[i].quantity;
    }
    return round(subTotal);
  }
  function getVat(items) {
    return round((getSubtotal(items) / 100) * 20);
  }
  function getTotal(items) {
    return round(getSubtotal(items) + getVat(items));
  }

  return (
    <div
      className={`CartTable ${
        props.hasBeenSubmitted ? "has-been-submitted" : ""
      }`}
    >
      <table className="CartTable__table">
        <thead className="CartTable__head">
          <tr>
            <th className="CartTable__cell is-heading is-product" id="product">
              Product
            </th>
            <th className="CartTable__cell is-heading is-price" id="price">
              Price
            </th>
            <th
              className="CartTable__cell is-heading is-quantity"
              id="quantity"
            >
              Quantity
            </th>
            <th className="CartTable__cell is-heading is-cost" id="cost">
              Cost
            </th>
            <th className="CartTable__cell is-heading is-delete" id="delete">
              Delete
            </th>
          </tr>
        </thead>
        {props.isLoading ? (
          <tbody className="CartTable__body" aria-hidden="true">
            {[...Array(3)].map((item, index) => (
              <tr className="CartTable__row" key={index}>
                <td className="CartTable__cell is-loading" colSpan="5">
                  &nbsp;
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <Fragment>
            <tbody className="CartTable__body">
              {state.items
                .filter((item) => !state.toRemove.includes(item.sku))
                .map((item) => (
                  <CartTableRow key={item.sku} item={item} />
                ))}
            </tbody>
            <tfoot className="CartTable__recap">
              <tr className="CartTable__row">
                <td className="CartTable__cell is-subheading" colSpan="3">
                  Subtotal
                </td>
                <td className="CartTable__cell is-subtotal">
                  £{getSubtotal(state.items, state.toRemove)}
                </td>
              </tr>
              <tr className="CartTable__row">
                <td className="CartTable__cell is-subheading" colSpan="3">
                  VAT at 20%
                </td>
                <td className="CartTable__cell is-vat">
                  £{getVat(state.items)}
                </td>
              </tr>
              <tr className="CartTable__row">
                <td
                  className="CartTable__cell is-subheading is-highlighted"
                  colSpan="3"
                >
                  Total cost
                </td>
                <td className="CartTable__cell is-total is-highlighted">
                  £{getTotal(state.items)}
                </td>
              </tr>
            </tfoot>
          </Fragment>
        )}
      </table>
    </div>
  );
}

export default CartTable;
