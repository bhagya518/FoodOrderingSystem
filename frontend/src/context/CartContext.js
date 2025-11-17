import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const resolveId = (item) => item._id || item.id || `${item.name}-${item.price}`;

  // ✅ Add item or increment quantity
  const addToCart = (item, quantity = 1) => {
    const identifier = resolveId(item);
    setCart((prev) => {
      const exist = prev.find((c) => resolveId(c) === identifier);
      if (exist) {
        return prev.map((c) =>
          resolveId(c) === identifier
            ? { ...c, quantity: Number(c.quantity) + Number(quantity) }
            : c
        );
      }
      return [
        ...prev,
        { ...item, quantity: Number(quantity), _id: identifier, id: identifier },
      ];
    });
  };

  // ✅ Update quantity
  const updateQuantity = (id, quantity) => {
    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((i) => resolveId(i) !== id);
      }
      return prev.map((i) =>
        resolveId(i) === id ? { ...i, quantity: Number(quantity) } : i
      );
    });
  };

  // ✅ Remove item from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => resolveId(item) !== id));
  };

  // ✅ Clear cart completely
  const clearCart = () => setCart([]);

  // ✅ Calculate total amount
  const totalAmount = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
