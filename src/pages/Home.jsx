import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Home.css';

function Home() {
  // Беремо тільки перші 3 товари для показу на головній
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="home">
      
      {/* Hero секція - банер */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Ласкаво просимо до TechShop!</h1>
            <p>Найкраща техніка за найкращими цінами</p>
            <Link to="/products" className="btn btn-primary btn-large">
              Переглянути каталог
            </Link>
          </div>
        </div>
      </section>

      {/* Популярні товари */}
      <section className="featured-section">
        <div className="container">
          <h2>🔥 Популярні товари</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="view-all">
            <Link to="/products" className="btn btn-secondary">
              Дивитись всі товари →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;