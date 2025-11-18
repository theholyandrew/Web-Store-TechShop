import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

// useParams - хук для отримання параметрів з URL (id товару)
// useNavigate - хук для програмної навігації (повернення назад)

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity } = useCart();  // ← ДОДАЙТЕ
  
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>😢 Товар не знайдено</h2>
        <Link to="/products" className="btn btn-primary">
          Повернутися до каталогу
        </Link>
      </div>
    );
  }

  // ЗМІНІТЬ цю функцію:
  const handleAddToCart = () => {
    addToCart(product);
  };

  const itemQuantity = getItemQuantity(product.id);  // ← ДОДАЙТЕ

  return (
    <div className="product-details">
      <div className="container">
        
        {/* Кнопка "Назад" */}
        <button onClick={() => navigate(-1)} className="back-button">
          ← Назад
        </button>

        <div className="product-details-content">
          
          {/* Ліва частина - зображення */}
          <div className="product-image-section">
            <div className="product-main-image">
              <img src={product.image} alt={product.name} />
              {!product.inStock && (
                <div className="out-of-stock-overlay">
                  <span>Немає в наявності</span>
                </div>
              )}
            </div>
          </div>

          {/* Права частина - інформація */}
          <div className="product-info-section">
            
            {/* Категорія */}
            <div className="product-category-badge">
              {product.category}
            </div>

            {/* Назва */}
            <h1 className="product-title">{product.name}</h1>

            {/* Рейтинг */}
            <div className="product-rating-large">
              <span className="stars">⭐⭐⭐⭐⭐</span>
              <span className="rating-number">{product.rating} / 5</span>
              <span className="reviews-count">(248 відгуків)</span>
            </div>

            {/* Ціна */}
            <div className="product-price-section">
              <span className="current-price">{product.price} ₴</span>
              <span className="old-price">{Math.round(product.price * 1.2)} ₴</span>
              <span className="discount-badge">-20%</span>
            </div>

            {/* Опис */}
            <div className="product-description">
              <h3>Опис товару</h3>
              <p>{product.description}</p>
            </div>

            {/* Основні характеристики */}
            <div className="product-features">
              <h3>Основні характеристики</h3>
              <ul>
                <li>✓ Офіційна гарантія 12 місяців</li>
                <li>✓ Безкоштовна доставка по Україні</li>
                <li>✓ Оплата при отриманні</li>
                <li>✓ Повернення протягом 14 днів</li>
              </ul>
            </div>

            {/* Наявність */}
            <div className="product-availability">
              {product.inStock ? (
                <span className="in-stock">✓ В наявності</span>
              ) : (
                <span className="out-of-stock">✗ Немає в наявності</span>
              )}
            </div>

            {/* Кнопки дій */}
            <div className="product-actions-section">
              <button 
                className={`btn btn-add-to-cart ${isInCart(product.id) ? 'btn-success' : 'btn-primary'}`} 
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {!product.inStock 
                  ? 'Немає в наявності' 
                  : isInCart(product.id) 
                    ? `✓ В кошику (${itemQuantity})` 
                    : '🛒 Додати в кошик'
                }  {/* ← ЗМІНИЛИ */}
              </button>
              
              <Link to="/products" className="btn btn-secondary">
                Продовжити покупки
              </Link>
            </div>

          </div>

        </div>

        {/* Додаткова інформація (табуляція) */}
        <div className="product-additional-info">
          <div className="info-tabs">
            
            <div className="info-tab">
              <h3>📋 Детальний опис</h3>
              <p>{product.description}</p>
              <p>
                Цей товар ідеально підходить для тих, хто цінує якість та надійність. 
                Виготовлено з використанням найсучасніших технологій та матеріалів.
              </p>
            </div>

            <div className="info-tab">
              <h3>🚚 Доставка та оплата</h3>
              <p><strong>Доставка:</strong></p>
              <ul>
                <li>Нова Пошта - безкоштовно (1-2 дні)</li>
                <li>Укрпошта - безкоштовно (3-5 днів)</li>
                <li>Кур'єр по Києву - безкоштовно (в день замовлення)</li>
              </ul>
              <p><strong>Оплата:</strong></p>
              <ul>
                <li>Готівкою при отриманні</li>
                <li>Карткою онлайн</li>
                <li>Безготівковий розрахунок</li>
              </ul>
            </div>

            <div className="info-tab">
              <h3>↩️ Повернення та обмін</h3>
              <p>
                Ви можете повернути або обміняти товар протягом 14 днів з моменту покупки, 
                якщо він не був у використанні та збережено товарний вигляд.
              </p>
              <p>
                Гарантія: 12 місяців офіційної гарантії від виробника.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;