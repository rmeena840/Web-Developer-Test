import React from "react";

import { ToastContainer, Slide, toast } from "react-toastify";

import "./CartToast.scss";

function CartToast(props) {
  return (
    <ToastContainer
      autoClose={2000}
      transition={Slide}
      className="CartToast__container"
      toastClassName="CartToast__toast"
      bodyClassName="CartToast__body"
      progressClassName="CartToast__progress"
    />
  );
}

export const notify = (notification, label) => {
  switch (notification) {
    case "MINIMUM_QUANTITY":
      toast(
        "You must have a minimum of 1 product. Please, use the delete button if you want to remove it.",
        {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: "MINIMUM_QUANTITY",
        }
      );
      break;
    case "STOCK_LEVEL":
      toast(
        "Hooray! You reached the top of our stock. Please, get in touch directly with us to know if we can satisfy your desires.",
        {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: "STOCK_LEVEL",
        }
      );
      break;
    case "NOT_A_NUMBER":
      toast(
        "We appreciate your interest for our products, but we cannot ship them as characters or symbols.",
        {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: "NOT_A_NUMBER",
        }
      );
      break;
    case "NOT_AN_INTEGER":
      toast(
        "We appreciate your interest for our products, but you can receive them only in one piece.",
        {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: "NOT_AN_INTEGER",
        }
      );
      break;
    default:
      console.warn("The function needs a notification name");
  }
};

export default CartToast;
