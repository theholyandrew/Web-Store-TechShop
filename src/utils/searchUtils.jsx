// Утиліти для пошуку товарів

// Функція пошуку товарів
export const searchProducts = (products, query) => {
  // Якщо запит порожній - повертаємо всі товари
  if (!query || query.trim() === '') {
    return products;
  }

  // Приводимо запит до нижнього регістру для пошуку без урахування регістру
  const searchQuery = query.toLowerCase().trim();

  // Фільтруємо товари
  return products.filter(product => {
    // Шукаємо в назві
    const nameMatch = product.name.toLowerCase().includes(searchQuery);
    
    // Шукаємо в категорії
    const categoryMatch = product.category.toLowerCase().includes(searchQuery);
    
    // Шукаємо в описі
    const descriptionMatch = product.description.toLowerCase().includes(searchQuery);

    // Повертаємо товар якщо знайдено хоча б в одному полі
    return nameMatch || categoryMatch || descriptionMatch;
  });
};

// Функція сортування товарів
export const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products]; // Копіюємо масив щоб не змінювати оригінал

  switch (sortBy) {
    case 'price-asc':
      // Сортування за ціною (від дешевих до дорогих)
      return sortedProducts.sort((a, b) => a.price - b.price);
    
    case 'price-desc':
      // Сортування за ціною (від дорогих до дешевих)
      return sortedProducts.sort((a, b) => b.price - a.price);
    
    case 'name-asc':
      // Сортування за назвою (А-Я)
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    
    case 'name-desc':
      // Сортування за назвою (Я-А)
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    
    case 'rating':
      // Сортування за рейтингом (від високого до низького)
      return sortedProducts.sort((a, b) => b.rating - a.rating);
    
    default:
      return sortedProducts;
  }
};

// Функція фільтрації за ціною
export const filterByPrice = (products, minPrice, maxPrice) => {
  return products.filter(product => {
    const price = product.price;
    const min = minPrice || 0;
    const max = maxPrice || Infinity;
    return price >= min && price <= max;
  });
};

// Функція фільтрації за наявністю
export const filterByStock = (products, inStockOnly) => {
  if (!inStockOnly) return products;
  return products.filter(product => product.inStock);
};

// Функція підсвітки тексту в результатах пошуку
export const highlightText = (text, query) => {
  if (!query || query.trim() === '') return text;
  
  const searchQuery = query.trim();
  const regex = new RegExp(`(${searchQuery})`, 'gi');
  
  return text.replace(regex, '<mark>$1</mark>');
};