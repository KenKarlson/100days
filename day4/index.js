// Получаем элементы
const eventDateInput = document.getElementById("eventDate");
const startTimerButton = document.getElementById("startTimer");
const daysSpan = document.getElementById("days");
const hoursSpan = document.getElementById("hours");
const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");

// Функция для расчета оставшегося времени
function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((t / 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const days = Math.floor(t / (1000 * 60 * 60 * 24));

  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

// Функция обновления таймера
function updateTimer() {
  const t = getTimeRemaining(eventDateInput.value);

  // Обновляем отображение
  daysSpan.textContent = t.days;
  hoursSpan.textContent = t.hours;
  minutesSpan.textContent = t.minutes;
  secondsSpan.textContent = t.seconds;

  // Если время вышло
  if (t.total <= 0) {
    clearInterval(timerInterval);
  }
}

// Обработчик кнопки
startTimerButton.addEventListener("click", () => {
  // Запускаем обновление каждую секунду
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer(); // Запускаем сразу для отображения начального значения
});
