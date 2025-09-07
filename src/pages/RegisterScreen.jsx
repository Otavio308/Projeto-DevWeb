// src/pages/RegisterScreen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MdPerson, MdEmail, MdLock, MdCameraAlt } from 'react-icons/md';
import './LoginScreen.css'; // Podemos reutilizar o mesmo CSS para manter o estilo

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      await register(name, email, password);
      // Navega para o dashboard após o registro bem-sucedido
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Criar nova conta</h1>
        <p className="login-subtitle">Preencha seus dados abaixo</p>
        
        <form onSubmit={handleRegister} className="login-form">
          <div className="input-group">
            <MdPerson size={20} className="input-icon" />
            <input 
              type="text" 
              placeholder="Nome completo" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="login-input"
            />
          </div>
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
          <div className="input-group">
            <MdLock size={20} className="input-icon" />
            <input 
              type="password" 
              placeholder="Confirmar Senha" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="login-input"
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button">
            Criar Conta
          </button>
        </form>

        <div className="separator">
          <hr />
          <span>Já tem uma conta?</span>
          <hr />
        </div>

        <button 
          className="register-button"
          onClick={() => navigate('/login')}
        >
          <span className="register-button-text">Fazer Login</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterScreen;