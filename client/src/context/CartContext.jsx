import { useContext, createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    } 
    const cart = JSON.parse(localStorage.getItem("cart"));
    setCartItems(cart);
  }, []);

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const reduceQuantity = (item) => {
    const updatedCartItems = [...cartItems];
    const foundIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (foundIndex === -1) {
      updatedCartItems.push({ ...item, quantity: 1 });
    } else {
      updatedCartItems[foundIndex].quantity--;
    }
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  }

  const addToCart = (item) => {
    const updatedCartItems = [...cartItems];
    const foundIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (foundIndex === -1) {
      updatedCartItems.push({ ...item, quantity: 1 });
    } else {
      updatedCartItems[foundIndex].quantity++;
    }
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        // setCartItems,
        removeFromCart,
        addToCart,
        reduceQuantity,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
