import { useContext, createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartContextProvider({ children }) {

  const {user} = useAuth();

  const [cartItems, setCartItems] = useState([]);

  const updateCartApi = (cart) => {
    fetch(`https://shopbb.onrender.com/api/cart/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
  }

  const addToCartApi = (item) => {
    fetch(`https://shopbb.onrender.com/api/cart/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: item._id, quantity: 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
  }


  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    } 
    const cart = JSON.parse(localStorage.getItem("cart"));
    setCartItems(cart);
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`https://shopbb.onrender.com/api/cart/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCartItems(data.data);
            localStorage.setItem("cart", JSON.stringify(data.data));
          } else {
            console.log(data.error);
          }
        });
    }
  }, [user]);

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.product._id !== item._id
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    user && updateCartApi(updatedCartItems);
  };

  const reduceQuantity = (item) => {
    const updatedCartItems = [...cartItems];
    const foundIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem.product._id === item._id
    );
    if (foundIndex === -1) {
      updatedCartItems.push({ product: item, quantity: 1 });
      user && addToCartApi(item);
    } else {
      updatedCartItems[foundIndex].quantity--;
      user && updateCartApi(updatedCartItems);
    }
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  }

  const addToCart = (item) => {
    const updatedCartItems = [...cartItems];
    const foundIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem.product._id === item._id
    );
    if (foundIndex === -1) {
      updatedCartItems.push({ product: item, quantity: 1 });
      user && addToCartApi(item);
    } else {
      updatedCartItems[foundIndex].quantity++;
      user && updateCartApi(updatedCartItems);
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
