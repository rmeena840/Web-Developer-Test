import Pretender from "pretender";
import cartItems from "./cartItems.json";

// Set a delay to simulate network latency
const fakeDelay = 1000;

function init() {
  const server = new Pretender();

  server.get(
    process.env.CART_ITEMS_ENDPOINT,
    (request) => {
      return [
        200,
        { "content-type": "application/json" },
        JSON.stringify(cartItems),
      ];
    },
    fakeDelay
  );

  server.post(
    process.env.CART_SUBMIT_ENDPOINT,
    (request) => {
      return [
        200,
        { "content-type": "application/json" },
        JSON.stringify({
          status: "success",
          data: {},
          message: "Cart submitted with success",
        }),
      ];
    },
    fakeDelay
  );

  // Ignore other request, particularly webpack HMR ones

  server.unhandledRequest = function (verb, path, request) {
    const xhr = request.passthrough();

    xhr.onloadend = (ev) => {
      console.warn(`Response for ${path}`, {
        verb,
        path,
        request,
        responseEvent: ev,
      });
    };
  };
}

export default {
  init: init,
};
