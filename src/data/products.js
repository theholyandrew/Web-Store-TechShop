// Це наші тимчасові товари (хардкоджені дані)
// Пізніше ми отримуватимемо їх з backend API

export const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 37999,
    category: "Смартфони",
    image: "https://via.placeholder.com/300x300?text=iPhone+15+Pro",
    description: "Потужний смартфон з титановим корпусом та процесором A17 Pro",
    inStock: true,
    rating: 4.8
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 32999,
    category: "Смартфони",
    image: "https://via.placeholder.com/300x300?text=Samsung+S24",
    description: "Флагман від Samsung з AI функціями та чудовою камерою",
    inStock: true,
    rating: 4.7
  },
  {
    id: 3,
    name: "MacBook Air M3",
    price: 54999,
    category: "Ноутбуки",
    image: "https://via.placeholder.com/300x300?text=MacBook+Air",
    description: "Тонкий та легкий ноутбук з неймовірною продуктивністю",
    inStock: true,
    rating: 4.9
  },
  {
    id: 4,
    name: "Dell XPS 15",
    price: 45999,
    category: "Ноутбуки",
    image: "https://via.placeholder.com/300x300?text=Dell+XPS+15",
    description: "Професійний ноутбук для роботи та творчості",
    inStock: false,
    rating: 4.6
  },
  {
    id: 5,
    name: "AirPods Pro 2",
    price: 9999,
    category: "Аксесуари",
    image: "https://via.placeholder.com/300x300?text=AirPods+Pro",
    description: "Бездротові навушники з активним шумозаглушенням",
    inStock: true,
    rating: 4.8
  },
  {
    id: 6,
    name: "iPad Pro 12.9",
    price: 42999,
    category: "Планшети",
    image: "https://via.placeholder.com/300x300?text=iPad+Pro",
    description: "Потужний планшет для професіоналів",
    inStock: true,
    rating: 4.9
  }
];

// Функція для отримання всіх товарів
export const getAllProducts = () => {
  return products;
};

// Функція для пошуку товару за ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

// Функція для фільтрації за категорією
export const getProductsByCategory = (category) => {
  if (category === "Всі") return products;
  return products.filter(product => product.category === category);
};