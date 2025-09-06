// src/pages/Pedidos.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdArrowBack, MdAccessTime, MdCheckCircle, MdCancel, MdLocalShipping, MdVisibility } from 'react-icons/md';
import './Pedidos.css';

const Pedidos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    // Adiciona o novo pedido recebido do carrinho ao estado
    if (location.state?.newOrder) {
      setPedidos(prev => [location.state.newOrder, ...prev]);
    }
  }, [location.state]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Em processamento':
        return <MdAccessTime size={24} color="#f5a623" />;
      case 'Concluído':
        return <MdCheckCircle size={24} color="#4cd964" />;
      case 'Cancelado':
        return <MdCancel size={24} color="#ff3b30" />;
      case 'Em transporte':
        return <MdLocalShipping size={24} color="#5e5ce6" />;
      default:
        return null;
    }
  };

  const renderItem = (item) => (
    <div key={item.id} className="pedido-card">
      <div className="pedido-header">
        <p className="pedido-numero">Pedido {item.numero}</p>
        <p className="pedido-data">{item.data}</p>
      </div>
      <div className="pedido-body">
        <p className="pedido-total">R$ {item.total}</p>
        <div className="pedido-status">
          {getStatusIcon(item.status)}
          <p className="status-text">{item.status}</p>
        </div>
      </div>
      <button 
        className="details-button"
        onClick={() => navigate(`/pedidos/${item.id}`, { state: { pedido: item } })}
      >
        <MdVisibility size={24} color="#0FC2C0" />
      </button>
    </div>
  );

  return (
    <div className="pedidos-container">
      <div className="pedidos-header">
        <button onClick={() => navigate('/')} className="back-button">
          <MdArrowBack size={26} />
        </button>
        <h1 className="pedidos-title">Meus Pedidos</h1>
      </div>
      <div className="pedidos-content">
        {pedidos.length > 0 ? (
          pedidos.map(renderItem)
        ) : (
          <div className="empty-pedidos">
            <p>Você não tem pedidos.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pedidos;