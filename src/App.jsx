// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Carrinho from './pages/Carrinho';
import Pedidos from './pages/Pedidos';
import DetalhesPedido from './pages/DetalhesPedidos';
import { CarrinhoProvider } from './context/CarrinhoContext';

const App = () => {
  return (
    <BrowserRouter>
      <CarrinhoProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pedidos/:id" element={<DetalhesPedido />} />
        </Routes>
      </CarrinhoProvider>
    </BrowserRouter>
  );
};

export default App;