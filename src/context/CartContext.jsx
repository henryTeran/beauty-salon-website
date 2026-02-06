import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Ajouter un soin au panier
  const addToCart = (service) => {
    setCart((prevCart) => {
      const existingService = prevCart.find((item) => item.id === service.id);
      if (existingService) {
        return prevCart.map((item) =>
          item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...service, quantity: 1 }];
    });
  };

  // Supprimer un soin du panier
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Vider complètement le panier
  const clearCart = () => setCart([]);

  // Ouvrir le drawer du panier
  const openCart = () => setIsCartOpen(true);

  // Fermer le drawer du panier
  const closeCart = () => setIsCartOpen(false);

  // Toggle le drawer du panier
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Calculer le prix total
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.price * (item.quantity || 1);
      return total + price;
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      getTotalPrice,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Exporter le hook personnalisé pour accéder au panier
export function useCart() {
  return useContext(CartContext);
}
