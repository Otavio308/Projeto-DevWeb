// src/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { MdShoppingCart, MdFastfood, MdLocalPizza, MdCake, MdLocalDrink, MdMenu, MdAddShoppingCart, MdRemoveShoppingCart, MdPerson, MdListAlt, MdInfo, MdCheck } from 'react-icons/md';
import './Dashboard.css';

const Dashboard = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  // A lógica de "limpar carrinho" ao focar a tela foi removida,
  // pois não se aplica da mesma forma a um SPA (Single-Page Application) web.
  // Você controlaria isso com a lógica de roteamento, se necessário.

  const categories = [
    { name: 'Todos', icon: MdFastfood },
    { name: 'Salgados', icon: MdLocalPizza },
    { name: 'Doces', icon: MdCake },
    { name: 'Bebidas', icon: MdLocalDrink },
  ];

  const [products] = useState([
    { id: 1, name: 'Pão Francês', price: 'R$ 0,50', category: 'Salgados', stock: 30, image: 'https://redemix.vteximg.com.br/arquivos/ids/214544-1000-1000/6914.jpg?v=638351307421600000' },
    { id: 2, name: 'Bolo de Chocolate', price: 'R$ 15,00', category: 'Doces', stock: 7, image: null },
    { id: 3, name: 'Croissant', price: 'R$ 4,50', category: 'Salgados', stock: 18, image: null },
    { id: 4, name: 'Torta de Frango', price: 'R$ 8,00', category: 'Salgados', stock: 13, image: null },
    { id: 5, name: 'Café Especial', price: 'R$ 5,00', category: 'Bebidas', stock: 30, image: null },
    { id: 6, name: 'Sonho', price: 'R$ 3,50', category: 'Doces', stock: 6, image: null },
    { id: 7, name: 'Pão de Queijo', price: 'R$ 1,00', category: 'Salgados', stock: 20, image: null },
    { id: 8, name: 'Biscoito Caseiro', price: 'R$ 2,50', category: 'Doces', stock: 16, image: null },
    { id: 9, name: 'Suco Natural', price: 'R$ 6,00', category: 'Bebidas', stock: 8, image: null },
    { id: 10, name: 'Empada', price: 'R$ 3,00', category: 'Salgados', stock: 12, image: null },
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);

  const getCategoryIcon = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.icon : MdFastfood;
  };

  const addToCart = (product) => {
    const cartItem = cartItems.find(item => item.id === product.id);
    const currentQuantity = cartItem ? cartItem.quantity : 0;
    
    if (currentQuantity >= product.stock) {
      alert('Estoque Insuficiente! Desculpe, não há mais ' + product.name + ' disponível.');
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevItems.filter(item => item.id !== product.id);
    });
  };

  useEffect(() => {
    let results = products;
    
    if (searchQuery) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'Todos') {
      results = results.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(results);
  }, [searchQuery, selectedCategory, products]);

  const renderItem = (item) => {
    const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
    const itemQuantity = cartItem ? cartItem.quantity : 0;
    const CategoryIcon = getCategoryIcon(item.category);
    const isOutOfStock = item.stock <= 0;
    const almostOutOfStock = item.stock <= 5 && item.stock > 0;
     
    return (
      <div 
        key={item.id}
        className={`product-card ${isOutOfStock ? 'out-of-stock-card' : ''}`}
      >
        <div className="icon-container">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.name} 
              className="product-image"
            />
          ) : (
            <CategoryIcon 
              size={40} 
              className={`category-icon ${isOutOfStock ? 'out-of-stock-icon' : ''}`}
            />
          )}
        </div>

        <div className="product-details">
          <p className={`product-name ${isOutOfStock ? 'out-of-stock-text' : ''}`}>
            {item.name}
          </p>
          {isOutOfStock && (
            <p className="stock-warning">ESGOTADO</p>
          )}
          {almostOutOfStock && !isOutOfStock && (
            <p className="stock-warning">ÚLTIMAS UNIDADES</p>
          )}
          <div className="info-container">
            <p className={`price ${isOutOfStock ? 'out-of-stock-text' : ''}`}>
              {item.price}
            </p>
            {!isOutOfStock && (
              <p className="stock-text">
                Estoque: {item.stock} un.
              </p>
            )}
          </div>
        </div>

        <div className="cart-controls">
          {!isOutOfStock && (
            <>
              <button 
                className="cart-button" 
                onClick={() => addToCart(item)}
                disabled={itemQuantity >= item.stock}
              >
                <MdAddShoppingCart 
                  size={24} 
                  color={itemQuantity >= item.stock ? "#ccc" : "#0FC2C0"} 
                />
              </button>
              
              {itemQuantity > 0 && (
                <button 
                  className="remove-button" 
                  onClick={() => removeFromCart(item)}
                >
                  <MdRemoveShoppingCart size={24} color="#ff4444" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
    return sum + (price * (item.quantity || 1));
  }, 0);

  // Funções de navegação foram substituídas por alerts para fins de demonstração
  const navigateToCart = () => {
    alert("Navegando para o carrinho. Em um projeto real, usaria um Router aqui.");
  };
  const navigateToProfile = () => {
    setMenuVisible(false);
    alert("Navegando para o perfil.");
  };
  const navigateToSobre = () => {
    setMenuVisible(false);
    alert("Navegando para a página 'Sobre'.");
  };
  const navigateToPedidos = () => {
    setMenuVisible(false);
    alert("Navegando para a página 'Pedidos'.");
  };

  return (
    <div className="container">
      <div className="header">
        <button className="menu-button" onClick={() => setMenuVisible(true)}>
          <MdMenu size={28} />
        </button>

        <input
          type="text"
          className="search-input"
          placeholder="Buscar Itens do Menu"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button className="header-cart-icon" onClick={navigateToCart}>
          <MdShoppingCart size={26} />
          {cartItems.length > 0 && (
            <div className="cart-badge">
              <span>{totalItems}</span>
            </div>
          )}
        </button>
      </div>

      {menuVisible && (
        <div className="modal-overlay">
          <div className="menu-content">
            <div className="menu-header">
              <p className="menu-title">Categorias</p>
            </div>
            
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
            
            <div className="divider" />
            
            <button className="menu-option" onClick={navigateToProfile}>
              <MdPerson size={24} />
              <p className="menu-option-text">Minha Conta</p>
            </button>

            <button className="menu-option" onClick={navigateToPedidos}>
              <MdListAlt size={24} />
              <p className="menu-option-text">Meus Pedidos</p>
            </button>

            <button className="menu-option" onClick={navigateToSobre}>
              <MdInfo size={24} />
              <p className="menu-option-text">Sobre</p>
            </button>
          </div>
          <div className="menu-overlay" onClick={() => setMenuVisible(false)} />
        </div>
      )}

      <div className="product-list">
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
            onClick={navigateToCart}
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