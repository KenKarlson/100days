// Функция для генерации списка покупок
function generatorShoppingList(products) {
  // Группируем товары по категориям
  const grouped = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  // Получаем основной контейнер
  const listContainer = document.getElementById('shoppingList');

  // Создаем основной контент
  const mainContent = document.createDocumentFragment();

  let total = 0;
  let itemCount = 0;

  // Перебираем категории
  for (const category of Object.keys(grouped).sort()) {
    const categoryProducts = grouped[category].sort((a, b) => a.name.localeCompare(b.name));

    // Создаем контейнер для категории
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');

    // Создаем заголовок категории
    const categoryTitle = document.createElement('div');
    categoryTitle.classList.add('category-title');
    categoryTitle.textContent = category;

    // Создаем список товаров
    const productList = document.createElement('div');
    productList.classList.add('product-list');

    for (const product of categoryProducts) {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');

      const unit = product.quantity >= 1 ? 'шт' : 'кг';
      const pricePerUnit = parseFloat(product.price.toFixed(2));
      const totalPrice = parseFloat((product.price * product.quantity).toFixed(2));

      productItem.textContent = `${product.name}: ${product.quantity.toFixed(
        2
      )} ${unit} (${pricePerUnit} руб/${unit}) = ${totalPrice} руб`;

      productList.appendChild(productItem);

      total += totalPrice;
      itemCount++;
    }

    // Добавляем все элементы категории
    categoryDiv.appendChild(categoryTitle);
    categoryDiv.appendChild(productList);

    // Добавляем категорию в основной контент
    mainContent.appendChild(categoryDiv);
  }

  // Создаем информацию о сумме и количестве
  const totalInfo = document.createElement('div');
  totalInfo.classList.add('total-info');
  totalInfo.textContent = `Общая стоимость: ${total.toFixed(2)} руб | Всего товаров: ${itemCount}`;

  // Добавляем информацию в основной контент
  mainContent.appendChild(totalInfo);

  // Добавляем весь контент на страницу
  listContainer.appendChild(mainContent);
}

// Пример использования
const listOfProducts = [
  { name: 'Яблоки', category: 'Фрукты', price: 120, quantity: 2 },
  { name: 'Молоко', category: 'Молочные продукты', price: 80, quantity: 1 },
  { name: 'Бананы', category: 'Фрукты', price: 60, quantity: 3 },
  { name: 'Сыр', category: 'Молочные продукты', price: 300, quantity: 0.5 },
  { name: 'Вилки', category: 'Приборы столовые', price: 100, quantity: 2 },
];

generatorShoppingList(listOfProducts);
