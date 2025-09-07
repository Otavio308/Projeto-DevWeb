// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'teste@teste.com' && password === '123') {
          const fakeUser = {
            id: '1',
            email,
            name: 'Usuário Teste',
            profilePic: 'https://via.placeholder.com/150',
          };
          setUser(fakeUser);
          resolve(fakeUser);
        } else {
          reject(new Error('Email ou senha incorretos.'));
        }
      }, 1000);
    });
  };

  // Nova função para simular o cadastro
  const register = async (name, email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulação de verificação de email já cadastrado
        if (email === 'existe@exemplo.com') {
          reject(new Error('Este email já está em uso.'));
        } else {
          const newUser = {
            id: String(Date.now()), // ID único para o novo usuário
            email,
            name,
            profilePic: 'https://via.placeholder.com/150',
          };
          setUser(newUser);
          resolve(newUser);
        }
      }, 1500); // Simula o tempo de requisição de 1.5 segundos
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};