//Определение переменных и функций
function getUserName() {
  const userName = prompt("Как тебя зовут?");
  if (!userName) {
    alert("Введите корректное имя!");
    return getUserName();
  }
  return userName;
}
function getUserAge() {
  const ageInput = prompt("Сколько тебе лет?");
  const age = Number(ageInput);

  if (isNaN(age) || age <= 0) {
    alert("Пожалуйста, введите корректный возраст");
    return getUserAge(); // Рекурсивный вызов при ошибке
  }
  return age;
}
//Получение результата Основная функция
function getUser() {
  let userName = getUserName();
  let userAge = getUserAge();
  let status =
    userAge >= 18 ? "Ты совершеннолетний" : "Ты еще несовершеннолетний";
  alert(`Привет ${userName}! ${status}. `);
}
getUser();
