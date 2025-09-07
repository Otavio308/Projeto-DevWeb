// src/pages/LoginScreen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MdEmail, MdLock, MdPersonAdd } from 'react-icons/md';
import './LoginScreen.css'; // Opcional: crie este arquivo para estilização

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/dashboard'); // Redireciona para o dashboard após o login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Acesso à sua conta</h1>
        <p className="login-subtitle">Entre com seus dados para continuar</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <MdEmail size={20} className="input-icon" />
            <input 
              type="text" 
              placeholder="E-mail ou Telefone" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </div>
          <div className="input-group">
            <MdLock size={20} className="input-icon" />
            <input 
              type="password" 
              placeholder="Senha" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="separator">
          <hr />
          <span>ou</span>
          <hr />
        </div>

        <button 
          className="register-button"
          onClick={() => navigate('/registro')} // Redireciona para a tela de registro
        >
          <MdPersonAdd size={20} />
          <span className="register-button-text">Criar Nova Conta</span>
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;