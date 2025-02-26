//Определение переменных и функций
let userName = prompt("Как тебя зовут?");
let userAge = +prompt("Сколько тебе лет?");

let resue = function (userAge) {
  let result = "";
  userAge >= 18
    ? (result = "Ты совершеннолетний")
    : (result = "Ты еще несовершеннолетний");
  return result;
};
//Получение результата
console.log(`Привет, ${userName}! Тебе ${userAge} лет. ${resue(userAge)}`);
