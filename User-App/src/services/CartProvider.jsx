import { createContext, useContext, useReducer } from "react";

const cartContext = createContext();

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "cart/add":
      const existingItemIndex = state.findIndex(function(item) {
        return item.id === action.payload.id;
      });

      if (existingItemIndex >= 0) {
        // Item already exists, increment its quantity
        return state.map(function(item, index) {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        });
      } else {
        // Add new item with quantity 1
        const newItem = {
          ...action.payload,
          quantity: 1,
        };
        return state.concat(newItem);
      }

    case "cart/remove":
      return state.filter(function(item) {
        return item.id !== action.payload;
      });

    case "cart/decrement":
      return state.map(function(item) {
        if (item.id === action.payload) {
          if (item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });

    case "cart/increment":
      return state.map(function(item) {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          return item;
        }
      });

      case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}



function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, initialState);
  console.log(cart);

  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  
  return (
    <cartContext.Provider value={{cart, dispatch, clearCart}}>
      {children}
    </cartContext.Provider>
  );
}

function useCart() {
  const context = useContext(cartContext);
  return context;
}

export { CartProvider, useCart };







































// import React, { createContext, useState } from 'react';

// export const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   // Function to add an item to the cart
//   const addToCart = (item) => {
//     setCart((prevCart) => {
//       const existingItemIndex = prevCart.findIndex((i) => i.id === item.id);
//       if (existingItemIndex >= 0) {
//         // If item already exists, increase its quantity
//         const updatedCart = [...prevCart];
//         updatedCart[existingItemIndex].quantity += 1;
//         return updatedCart;
//       } else {
//         // If item is not in cart, add it with quantity 1
//         return [...prevCart, { ...item, quantity: 1 }];
//       }
//     });
//   };

//   // Function to remove an item from the cart
//   const removeFromCart = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   // Function to update the quantity of an item in the cart
//   const updateQuantity = (id, delta) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(item.quantity + delta, 1) } // Ensure quantity doesn't go below 1
//           : item
//       )
//     );
//   };

//   // Function to clear the cart
//   const clearCart = () => {
//     setCart([]);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;
