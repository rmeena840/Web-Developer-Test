// 
import "./../styles/app.scss";
import "remove-focus-outline";
import mockApi from "./mockApi";
import cart from "./pages/cart";

if (process.env.USE_MOCK_API === "true") {
  mockApi.init();
}

if (document.getElementById("cart")) {
  cart.init();
}
