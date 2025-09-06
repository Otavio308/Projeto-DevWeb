// src/context/CarrinhoContext.jsx
import React, { createContext, useState, useContext } from 'react';

// 1. Cria o contexto
const CarrinhoContext = createContext();

// 2. Cria o provedor do contexto (Provider)
export const CarrinhoProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Adicionar um item ao carrinho
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remover um item do carrinho
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  // Limpar todo o carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  const decrementItem = (productId) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  return (
    <CarrinhoContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, decrementItem }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

// 3. Cria um hook customizado para usar o contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useCarrinho = () => useContext(CarrinhoContext);