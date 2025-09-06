// src/pages/Dashboard/Dashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdShoppingCart, MdFastfood, MdLocalPizza, MdCake, MdLocalDrink, MdMenu, MdAddShoppingCart, MdRemoveShoppingCart, MdPerson, MdListAlt, MdInfo, MdCheck } from 'react-icons/md';
import { useCarrinho } from '../context/CarrinhoContext'; // Importa o nosso hook
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const { cartItems, addToCart } = useCarrinho(); // Usa o hook para acessar o estado e a função

  const categories = [
    { name: 'Todos', icon: MdFastfood },
    { name: 'Salgados', icon: MdLocalPizza },
    { name: 'Doces', icon: MdCake },
    { name: 'Bebidas', icon: MdLocalDrink },
  ];

  const [products] = useState([
    { id: 1, name: 'Pão Francês', price: 'R$ 0,50', category: 'Salgados', stock: 30, image: 'https://redemix.vteximg.com.br/arquivos/ids/214544-1000-1000/6914.jpg?v=638351307421600000' },
    { id: 2, name: 'Bolo de Chocolate', price: 'R$ 15,00', category: 'Doces', stock: 7, image: 'https://www.receitasdeminuto.com/wp-content/uploads/2018/02/Bolo-de-Chocolate-Receitas-de-Minuto-Foto-Shutterstock.jpg' },
    { id: 3, name: 'Croissant', price: 'R$ 4,50', category: 'Salgados', stock: 18, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Croissant_au_beurre_01.jpg/1200px-Croissant_au_beurre_01.jpg' },
    { id: 4, name: 'Torta de Frango', price: 'R$ 8,00', category: 'Salgados', stock: 13, image: 'https://static.itdg.com.br/images/1200-675/7f422b4034870f2f76781297d264f331/359281-original.jpg' },
    { id: 5, name: 'Café Especial', price: 'R$ 5,00', category: 'Bebidas', stock: 30, image: 'https://www.cafebrasileiro.com.br/media/catalog/product/cache/1/image/600x600/9df78eab33525d08d6e5fb8d27136e95/t/r/tradicional.png' },
    { id: 6, name: 'Sonho', price: 'R$ 3,50', category: 'Doces', stock: 6, image: 'https://cdn.casaecomida.com.br/wp-content/uploads/2022/10/sonho-de-padaria-scaled.jpg' },
    { id: 7, name: 'Pão de Queijo', price: 'R$ 1,00', category: 'Salgados', stock: 20, image: 'https://i.panelinha.com.br/1wR3X8s3_6cRj5F-W6A6e-e-P-o8J16-oG3D0.png' },
    { id: 8, name: 'Biscoito Caseiro', price: 'R$ 2,50', category: 'Doces', stock: 16, image: 'https://cdn.shopify.com/s/files/1/0268/5641/0088/articles/Cookies_com_gotas_de_chocolate_1200x.png?v=1646247330' },
    { id: 9, name: 'Suco Natural', price: 'R$ 6,00', category: 'Bebidas', stock: 8, image: 'https://www.pizzahut.com.br/img/pizzas/Suco_Del_Valle_Laranja.png' },
    { id: 10, name: 'Empada', price: 'R$ 3,00', category: 'Salgados', stock: 12, image: 'https://static.itdg.com.br/images/1200-675/5a8e0f10c0817c80529d28e718816c4e/empada-de-frango-super-rapida-2.jpg' },
  ]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
    return sum + price * item.quantity;
  }, 0);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderItem = (item) => {
    const isAdded = cartItems.some(cartItem => cartItem.id === item.id);
    return (
      <div key={item.id} className="product-card">
        <div className="product-image-container">
          <img src={item.image} alt={item.name} className="product-image" />
        </div>
        <div className="product-info">
          <h3 className="product-name">{item.name}</h3>
          <p className="product-price">{item.price}</p>
        </div>
        <button
          className="add-to-cart-button"
          onClick={() => addToCart(item)}
        >
          {isAdded ? (
            <div className="cart-check-icon-container">
              <MdCheck size={20} color="white" />
            </div>
          ) : (
            <MdAddShoppingCart size={24} color="#0FC2C0" />
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="main-container">
      <div className="header">
        <div className="header-left">
          <button className="menu-button" onClick={() => setMenuVisible(true)}>
            <MdMenu size={28} color="white" />
          </button>
        </div>
        <div className="header-center">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="header-right">
          <button className="cart-button" onClick={() => navigate('/carrinho', { state: { cartItems: cartItems } })}>
            <MdShoppingCart size={24} color="white" />
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}
          </button>
        </div>
      </div>
      
      {menuVisible && (
        <div className="menu-container">
          <div className="menu">
            <h3 className="menu-title">Categorias</h3>
            {categories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <button
                  key={category.name}
                  className={`category-menu-item ${selectedCategory === category.name ? 'selected-category-item' : ''}`}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setMenuVisible(false);
                  }}
                >
                  <CategoryIcon size={24} />
                  <p className="category-menu-text">{category.name}</p>
                  {selectedCategory === category.name && (
                    <MdCheck size={20} />
                  )}
                </button>
              );
            })}
          </div>
          <div className="menu-overlay" onClick={() => setMenuVisible(false)} />
        </div>
      )}

      <div className="product-list-container">
        {filteredProducts.map(renderItem)}
      </div>

      {totalItems > 0 && (
        <div className="summary-container">
          <div className="summary-text-container">
            <p className="summary-text">VALOR TOTAL:</p>
            <p className="summary-price">R$ {totalPrice.toFixed(2)} / {totalItems} {totalItems === 1 ? 'Item' : 'Itens'}</p>
          </div>
          
          <button 
            className="cart-button-summary"
            onClick={() => navigate('/carrinho', { state: { cartItems: cartItems } })}
          >
            <p className="cart-button-text">
              Ver Carrinho ({totalItems})
            </p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;