import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();

  // Стани форми
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Якщо кошик порожній
  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="container">
          <h2>🛒 Кошик порожній</h2>
          <p>Додайте товари щоб оформити замовлення</p>
          <Link to="/products" className="btn btn-primary">
            Перейти до каталогу
          </Link>
        </div>
      </div>
    );
  }

  // Відправка форми
  const handleSubmit = (e) => {
    e.preventDefault();

    // Проста перевірка - всі поля заповнені?
    if (!name || !phone || !email || !address) {
      alert('⚠️ Будь ласка, заповніть всі обов\'язкові поля');
      return;
    }

    setIsSubmitting(true);

    // Імітація відправки на сервер
    setTimeout(() => {
      // Створюємо замовлення
      const order = {
        id: Date.now(),
        date: new Date().toLocaleDateString('uk-UA'),
        customer: { name, phone, email },
        address: address,
        comment: comment,
        items: cartItems,
        total: getTotalPrice()
      };

      console.log('Замовлення:', order);

      // Зберігаємо в localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Очищаємо кошик
      clearCart();

      // Повідомлення
      alert(`✅ Дякуємо, ${name}!\n\nВаше замовлення №${order.id} оформлено.\nМи зв'яжемося з вами найближчим часом!`);

      // Перенаправляємо на головну
      navigate('/');
    }, 1000);
  };

  return (
    <div className="checkout-page">
      <div className="container">
        
        <h1>📦 Оформлення замовлення</h1>

        <div className="checkout-content">

          {/* Форма */}
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit}>

              <h2>Ваші дані</h2>

              <div className="form-group">
                <label>
                  Ім'я та прізвище <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Іван Петренко"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Телефон <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+380501234567"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                />
              </div>

              <h2>Доставка</h2>

              <div className="form-group">
                <label>
                  Адреса (місто, відділення) <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Київ, Нова Пошта, відділення №1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Коментар до замовлення</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Додаткова інформація (необов'язково)"
                  rows="3"
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? '⏳ Оформлення...' : '✅ Оформити замовлення'}
              </button>

            </form>
          </div>

          {/* Підсумок */}
          <div className="checkout-summary">
            <h2>📋 Ваше замовлення</h2>

            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">
                      {item.price} ₴ × {item.quantity}
                    </p>
                  </div>
                  <p className="item-total">
                    {item.price * item.quantity} ₴
                  </p>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Всього товарів:</span>
              <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} шт</span>
            </div>

            <div className="summary-row">
              <span>Доставка:</span>
              <span className="free">Безкоштовно</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>До сплати:</span>
              <span>{getTotalPrice()} ₴</span>
            </div>

            <p className="payment-note">
              💳 Оплата при отриманні
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Checkout;