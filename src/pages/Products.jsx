import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Products.css';

function Products() {
  // useState - React hook для збереження стану
  // selectedCategory - поточна категорія
  // setSelectedCategory - функція для зміни категорії
  const [selectedCategory, setSelectedCategory] = useState('Всі');

  // Список всіх категорій
  const categories = ['Всі', 'Смартфони', 'Ноутбуки', 'Планшети', 'Аксесуари'];

  // Фільтруємо товари за категорією
  const filteredProducts = selectedCategory === 'Всі' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="products-page">
      <div className="container">
        
        <h1>Каталог товарів</h1>

        {/* Фільтр по категоріям */}
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Кількість знайдених товарів */}
        <p className="products-count">
          Знайдено товарів: {filteredProducts.length}
        </p>

        {/* Сітка товарів */}
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Якщо товарів немає */}
        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>Товарів в цій категорії поки немає 😢</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Products;