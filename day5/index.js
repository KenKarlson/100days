function calculate(a, b, operator) {
  result = "";
  if (true) {
    switch (operator) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        result = a / b;
        break;
      default:
        result = 'Нет такой валюты "Спасибо"';
    }
    return result;
  }
}
console.log(calculate(2, 5, "www"));
