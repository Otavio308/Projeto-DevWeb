// src/pages/DetalhesPedido.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import './DetalhesPedidos.css';

const DetalhesPedido = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pedido } = location.state || {};

  if (!pedido) {
    return (
      <div className="detalhes-container">
        <p className="detalhes-vazio">Pedido não encontrado.</p>
        <button onClick={() => navigate('/pedidos')} className="back-button-detalhes">
          <MdArrowBack size={26} /> Voltar para Pedidos
        </button>
      </div>
    );
  }

  return (
    <div className="detalhes-container">
      <div className="detalhes-header">
        <button onClick={() => navigate(-1)} className="back-button-detalhes">
          <MdArrowBack size={26} />
        </button>
        <h1 className="detalhes-title">Pedido {pedido.numero}</h1>
      </div>
      
      <div className="detalhes-content">
        <div className="detalhes-secao">
          <h2 className="detalhes-secao-titulo">Informações do Pedido</h2>
          <div className="detalhes-info-row">
            <p className="detalhes-label">Status:</p>
            <p className="detalhes-valor">{pedido.status}</p>
          </div>
          <div className="detalhes-info-row">
            <p className="detalhes-label">Data:</p>
            <p className="detalhes-valor">{pedido.data}</p>
          </div>
          <div className="detalhes-info-row">
            <p className="detalhes-label">Total:</p>
            <p className="detalhes-total">R$ {pedido.total}</p>
          </div>
        </div>

        <div className="detalhes-secao">
          <h2 className="detalhes-secao-titulo">Itens do Pedido</h2>
          {pedido.items.map((item, index) => (
            <div key={index} className="detalhes-item-row">
              <p className="detalhes-item-nome">{item.name}</p>
              <div className="detalhes-item-valores">
                <p className="detalhes-item-quantidade">x{item.quantity}</p>
                <p className="detalhes-item-preco">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetalhesPedido;