function calculateDiscount(price, discountPercent){
  let finalPrice = price * (100 - discountPercent) / 100;
  return finalPrice;

}
let x = calculateDiscount(1000, 20);
console.log(x.toFixed(2));
