// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Carrinho from './pages/Carrinho';
import Pedidos from './pages/Pedidos';
import DetalhesPedido from './pages/DetalhesPedidos';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ProfileScreen from './pages/ProfileScreen';
import { AuthProvider } from './context/AuthContext'; // Importe o AuthProvider
import { CarrinhoProvider } from './context/CarrinhoContext';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider> {/* Coloque o AuthProvider aqui para que todos os componentes de rota possam usá-lo */}
        <CarrinhoProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/pedidos/:id" element={<DetalhesPedido />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/registro" element={<RegisterScreen />} />
            <Route path="/perfil" element={<ProfileScreen />} />
          </Routes>
        </CarrinhoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;