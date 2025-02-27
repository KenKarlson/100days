function calculateDiscount(price, discountPercent) {
  let finalPrice = (price * (100 - discountPercent)) / 100;
  return finalPrice;
}
let x = calculateDiscount(1000, 20);
console.log(x.toFixed(2));

function generatorShopList(products) {
  const grouped = products.reduce((acc, curr) => {
    acc[curr.category] = acc[curr.category] || [];
    acc[curr.category].push(curr);
    return acc;
  }, {});

let result = 'Список покупок:\n\n';
let total = 0;

for (const category in grouped) {
  const categoryProducts = grouped[category].sort((a, b) => a.name.localeCompare(b.name));

  result += `${category}:\n`;

  for (const product of categoryProducts) {
    const unit = product.quantity >= 1 ? 'шт' : 'кг';
    const pricePerUnit = parseFloat(product.price.toFixed(2));
    const totalPrice = parseFloat((product.price * product.quantity).toFixed(2));

    result += `- ${product.name}: ${product.quantity} ${unit} (${pricePerUnit} руб/${unit}) = ${totalPrice} руб\n`;

    total += totalPrice;
  }
  result += '\n';
}
result += `Общая стоимость: ${total.toFixed(2)} руб`;

return result;
}

const listOfProducts = [
  { name: 'Яблоки', category: 'Фрукты', price: 120, quantity: 2 },
  { name: 'Молоко', category: 'Молочные продукты', price: 80, quantity: 1 },
  { name: 'Бананы', category: 'Фрукты', price: 60, quantity: 3 },
  { name: 'Сыр', category: 'Молочные продукты', price: 300, quantity: 0.5 },
];

console.log(generatorShopList(listOfProducts));
