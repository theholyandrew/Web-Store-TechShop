import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';  // ← ДОДАЙТЕ
import './ProductCard.css';

function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart();  // ← ДОДАЙТЕ

  const handleAddToCart = (e) => {  // ← ДОДАЙТЕ
    e.preventDefault(); // Не переходимо по лінку
    addToCart(product);
  };

  return (
    <div className="product-card">
      
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {!product.inStock && (
          <div className="out-of-stock-badge">Немає в наявності</div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        
        <div className="product-rating">
          ⭐ {product.rating} / 5
        </div>

        <div className="product-footer">
          <p className="product-price">{product.price} ₴</p>
          
          <div className="product-actions">
            <Link to={`/product/${product.id}`} className="btn btn-secondary">
              Деталі
            </Link>
            <button 
              className={`btn ${isInCart(product.id) ? 'btn-success' : 'btn-primary'}`}  
              onClick={handleAddToCart}  
              disabled={!product.inStock}
            >
              {!product.inStock ? 'Немає' : isInCart(product.id) ? '✓ В кошику' : 'В кошик'} 
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ProductCard;