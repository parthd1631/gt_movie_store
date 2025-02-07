import React, { createContext, useContext, useState } from 'react';
import { CartItem, Movie } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (movie: Movie) => void;
  removeFromCart: (movieId: number) => void;
  updateQuantity: (movieId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (movie: Movie) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === movie.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === movie.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...movie, quantity: 1 }];
    });
  };

  const removeFromCart = (movieId: number) => {
    setCart(currentCart => currentCart.filter(item => item.id !== movieId));
  };

  const updateQuantity = (movieId: number, quantity: number) => {
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === movieId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};