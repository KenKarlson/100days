function calculateDiscount(price, discountPercent){
  let finalPrice = price * (100 - discountPercent) / 100;
  return finalPrice;

}
let x = calculateDiscount(1000, 20);
console.log(x.toFixed(2));

const listOfProducts = [
  { name: 'Яблоки', category: 'Фрукты', price: 120, quantity: 2 },
  { name: 'Молоко', category: 'Молочные продукты', price: 80, quantity: 1 },
  { name: 'Бананы', category: 'Фрукты', price: 60, quantity: 3 },
  { name: 'Сыр', category: 'Молочные продукты', price: 300, quantity: 0.5 }
];
let arrOne =[];
let arrTwo =[];
for (const element of listOfProducts) {
  if(element.category === 'Фрукты'){
    arrOne.push(element);
  }else{
    arrTwo.push(element);
  }
};

for(const elem of arrOne){
  console.log(`${elem.name} ${elem.price} * ${elem.quantity} = ${elem.price * elem.quantity}`);
}
for(const elem of arrTwo){
  console.log(`${elem.name} ${elem.price} * ${elem.quantity} = ${elem.price * elem.quantity}`);
}
