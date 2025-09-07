// src/pages/ProfileScreen.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdPerson, MdEmail, MdCameraAlt, MdExitToApp } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import './ProfileScreen.css';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profileImage, setProfileImage] = useState(user?.profilePic || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Se o usuário não estiver logado, redireciona para a tela de login
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    // Retorna um placeholder enquanto redireciona
    return <div className="profile-container">Carregando...</div>;
  }
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      setError(null);
      // Simula o upload de uma imagem
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
        setIsUploading(false);
        // Em uma aplicação real, você faria um upload para um servidor aqui
        // Ex: const response = await uploadImageToServer(file);
        // setProfileImage(response.url);
      }, 1500);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <MdArrowBack size={26} />
        </button>
        <h1 className="header-title">Meu Perfil</h1>
        <button onClick={handleLogout} className="logout-button">
          <MdExitToApp size={24} />
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-image-container">
          <img 
            src={profileImage || 'https://via.placeholder.com/150'} 
            alt="Foto de Perfil" 
            className="profile-image" 
          />
          <label htmlFor="file-input" className="camera-button">
            {isUploading ? (
              <div className="spinner"></div>
            ) : (
              <MdCameraAlt size={20} color="#fff" />
            )}
          </label>
          <input 
            id="file-input" 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            style={{ display: 'none' }} 
            disabled={isUploading}
          />
        </div>

        <h2 className="user-name">{user.name}</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="info-section">
          <div className="info-item">
            <MdPerson size={24} className="info-icon" />
            <div className="info-text-container">
              <p className="info-label">Nome Completo</p>
              <p className="info-value">{user.name}</p>
            </div>
          </div>

          <div className="info-item">
            <MdEmail size={24} className="info-icon" />
            <div className="info-text-container">
              <p className="info-label">E-mail</p>
              <p className="info-value">{user.email}</p>
            </div>
          </div>
          
          {/* Campo de telefone, mantido como placeholder */}
          <div className="info-item">
            <MdPerson size={24} className="info-icon" />
            <div className="info-text-container">
              <p className="info-label">Telefone</p>
              <p className="info-value">(00) 00000-0000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;