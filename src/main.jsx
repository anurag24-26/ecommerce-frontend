import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext"; // ✅ Import CartProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      {" "}
      {/* ✅ Wrap App inside CartProvider */}
      <App />
    </CartProvider>
  </StrictMode>
);
