// src/pages/Carrinho/Carrinho.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdRemoveShoppingCart, MdLocalPizza, MdCake, MdLocalDrink, MdFastfood, MdRemove, MdAdd, MdDelete, MdAttachMoney, MdQrCode, MdCreditCard, MdCheck } from 'react-icons/md';
import { useCarrinho } from '../context/CarrinhoContext'; // Importa o nosso hook
import './Carrinho.css';

const generateOrderNumber = () => `#${Math.floor(Math.random() * 900) + 100}`;

const CATEGORY_ICONS = {
  Salgados: MdLocalPizza,
  Doces: MdCake,
  Bebidas: MdLocalDrink,
  Padaria: MdFastfood,
};

const PRODUCTS_WITH_STOCK = [
  { id: 1, name: 'Pão Francês', price: 'R$ 0,50', category: 'Salgados', stock: 30 },
  { id: 2, name: 'Bolo de Chocolate', price: 'R$ 15,00', category: 'Doces', stock: 7 },
  { id: 3, name: 'Croissant', price: 'R$ 4,50', category: 'Salgados', stock: 18 },
  { id: 4, name: 'Torta de Frango', price: 'R$ 8,00', category: 'Salgados', stock: 13 },
  { id: 5, name: 'Café Especial', price: 'R$ 5,00', category: 'Bebidas', stock: 30 },
  { id: 6, name: 'Sonho', price: 'R$ 3,50', category: 'Doces', stock: 6 },
  { id: 7, name: 'Pão de Queijo', price: 'R$ 1,00', category: 'Salgados', stock: 20 },
  { id: 8, name: 'Biscoito Caseiro', price: 'R$ 2,50', category: 'Doces', stock: 16 },
  { id: 9, name: 'Suco Natural', price: 'R$ 6,00', category: 'Bebidas', stock: 8 },
  { id: 10, name: 'Empada', price: 'R$ 3,00', category: 'Salgados', stock: 12 },
];

const Carrinho = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems, removeFromCart } = useCarrinho(); // Usa o hook para obter as funções do contexto
  const [selectedPayment, setSelectedPayment] = useState(null);

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
    return sum + (price * (item.quantity || 1));
  }, 0);

  const paymentOptions = [
    { id: 'cartao', icon: MdCreditCard, text: 'Cartão de crédito/débito' },
    { id: 'pix', icon: MdQrCode, text: 'PIX' },
    { id: 'dinheiro', icon: MdAttachMoney, text: 'Dinheiro' },
  ];

  const updateQuantity = (itemId, change) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + change;
          const productStock = PRODUCTS_WITH_STOCK.find(p => p.id === itemId)?.stock || 0;
          if (newQuantity <= 0) {
            return null;
          }
          if (newQuantity > productStock) {
            alert('Estoque Insuficiente! O item ' + item.name + ' está esgotado.');
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean);
      return updatedItems;
    });
  };

  const handleFinalizePurchase = () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }
    if (!selectedPayment) {
      alert('Selecione uma forma de pagamento para continuar.');
      return;
    }

    const newOrder = {
      id: Date.now(),
      numero: generateOrderNumber(),
      data: new Date().toISOString().slice(0, 10),
      status: 'Em processamento',
      total: totalPrice.toFixed(2),
      items: cartItems.map(item => ({
        name: item.name,
        price: parseFloat(item.price.replace('R$ ', '').replace(',', '.')),
        quantity: item.quantity
      })),
    };
    
    navigate('/pedidos', { state: { newOrder: newOrder } });
    setCartItems([]); // Limpa o carrinho após a finalização da compra
  };

  return (
    <div className="carrinho-container">
      <div className="carrinho-header">
        <button onClick={() => navigate('/')} className="back-button">
          <MdArrowBack size={26} />
        </button>
        <h1 className="header-title">Carrinho de Compras</h1>
        <button onClick={() => navigate('/')} className="continue-shopping-button">
          <p>Continuar Comprando</p>
        </button>
      </div>
      
      <div className="carrinho-main">
        <div className="cart-items-container">
          {cartItems.length > 0 ? (
            cartItems.map(item => {
              const CategoryIcon = CATEGORY_ICONS[item.category] || MdFastfood;
              const productStock = PRODUCTS_WITH_STOCK.find(p => p.id === item.id)?.stock || 0;
              const isLastItem = item.quantity === 1;
              const hasStock = item.quantity < productStock;
              return (
                <div key={item.id} className="cart-item">
                  <div className="icon-container">
                    <CategoryIcon size={40} className="product-icon" />
                  </div>
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">R$ {parseFloat(item.price.replace('R$ ', '').replace(',', '.')).toFixed(2).replace('.', ',')}</p>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, -1)} className="quantity-button">
                      {isLastItem ? <MdRemoveShoppingCart size={22} color="#ff4444" /> : <MdRemove size={22} color="#0FC2C0" />}
                    </button>
                    <p className="quantity-text">{item.quantity}</p>
                    <button onClick={() => updateQuantity(item.id, 1)} className="quantity-button" disabled={!hasStock}>
                      <MdAdd size={22} color={!hasStock ? "#ccc" : "#0FC2C0"} />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="delete-button">
                    <MdDelete size={22} color="#ff4444" />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="empty-cart">
              <MdRemoveShoppingCart size={80} color="#ccc" />
              <p>Seu carrinho está vazio.</p>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="payment-summary-sidebar">
            <div className="carrinho-summary-container">
              <p className="carrinho-summary-text">VALOR TOTAL:</p>
              <p className="carrinho-summary-price">
                R$ {totalPrice.toFixed(2).replace('.', ',')} • {totalItems} {totalItems === 1 ? 'item' : 'itens'}
              </p>
            </div>

            <div className="carrinho-divider" />

            <p className="payment-title">Forma de pagamento</p>
            {paymentOptions.map((option) => {
              const PaymentIcon = option.icon;
              return (
                <button
                  key={option.id}
                  className="payment-option"
                  onClick={() => setSelectedPayment(option.id)}
                >
                  <PaymentIcon size={22} color="#555" className="payment-icon" />
                  <span className="payment-text">{option.text}</span>
                  <div className={`checkbox-container ${selectedPayment === option.id ? 'selected' : ''}`}>
                    {selectedPayment === option.id && (
                      <MdCheck size={16} color="#fff" />
                    )}
                  </div>
                </button>
              );
            })}
            
            <button 
              className="finalize-button"
              onClick={handleFinalizePurchase}
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrinho;