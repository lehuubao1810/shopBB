import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.jsx";
import CartContextProvider from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </CartContextProvider>
);
