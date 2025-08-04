import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Product already exist → increase quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // new product → quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (removedProduct) => {
    console.log("Product removed:", removedProduct);
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === removedProduct.id
      );

      if (!existingItem) return prevCart;

      if (existingItem.quantity > 1) {
        // Decrease quantity
        return prevCart.map((item) =>
          item.id === removedProduct.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // If only 1 item -> remove
        return prevCart.filter((item) => item.id !== removedProduct.id);
      }
    });
  };

  //Remove alle products from cart
  const clearCart = () => {
    setCart([]);
  };
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
