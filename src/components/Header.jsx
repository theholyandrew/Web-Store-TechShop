import React, { useState, useEffect } from 'react';  // ← ДОДАЙТЕ useEffect
import { Link, useNavigate, useLocation } from 'react-router-dom';  // ← ДОДАЙТЕ useLocation
import { useCart } from '../context/CartContext';
import './Header.css';

function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  
  const navigate = useNavigate();
  const location = useLocation();  // ← ДОДАЙТЕ
  const [searchQuery, setSearchQuery] = useState('');

  // Синхронізуємо поле з URL параметром
  useEffect(() => {
    // Якщо ми на сторінці пошуку
    if (location.pathname === '/search') {
      // Отримуємо параметр q з URL
      const params = new URLSearchParams(location.search);
      const query = params.get('q');
      if (query) {
        setSearchQuery(query);  // Встановлюємо в поле
      }
    } else {
      // Якщо не на сторінці пошуку - очищаємо поле
      setSearchQuery('');
    }
  }, [location]);  // Виконується при зміні URL

  // Обробник пошуку
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Перенаправляємо на сторінку пошуку
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      // НЕ очищаємо поле! Воно оновиться автоматично через useEffect
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          
          <Link to="/" className="logo">
            <h1>TechShop</h1>
          </Link>

          {/* Пошукове поле */}
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Пошук товарів..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                  aria-label="Очистити"
                >
                  ✕
                </button>
              )}
            </div>
            <button type="submit" className="search-button">
              🔍
            </button>
          </form>

          <nav className="nav">
            <Link to="/" className="nav-link">Головна</Link>
            <Link to="/products" className="nav-link">Каталог</Link>
            <Link to="/cart" className="nav-link cart-link">
              🛒 Кошик
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>
          </nav>

        </div>
      </div>
    </header>
  );
}

export default Header;