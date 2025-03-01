// Получаем элементы
const eventDateInput = document.getElementById("eventDate");
const startTimerButton = document.getElementById("startTimer");
const stopTimerButton = document.getElementById("stopTimer");
const resetTimerButton = document.getElementById("resetTimer");
const daysSpan = document.getElementById("days");
const hoursSpan = document.getElementById("hours");
const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");

let timerInterval; // для хранения интервала обновления таймера
let isRunning = false; // флаг, показывающий работает ли таймер

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    isRunning = false;
    updateButtonStates();
  }
}

function resetTimer() {
  stopTimer(); // сначала останавливаем таймер
  eventDateInput.value = ""; // очищаем выбранную дату
  daysSpan.textContent = "00";
  hoursSpan.textContent = "00";
  minutesSpan.textContent = "00";
  secondsSpan.textContent = "00";
  isRunning = false;
  updateButtonStates();
}

function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  if (t <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

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

function updateTimer() {
  const t = getTimeRemaining(eventDateInput.value);

  // Обновляем отображение с ведущими нулями
  daysSpan.textContent = pad(t.days);
  hoursSpan.textContent = pad(t.hours);
  minutesSpan.textContent = pad(t.minutes);
  secondsSpan.textContent = pad(t.seconds);

  // Если время вышло
  if (t.total <= 0) {
    clearInterval(timerInterval);
    isRunning = false;
    updateButtonStates();
  }
}
function pad(num) {
  return num.toString().padStart(2, "0");
}
function updateButtonStates() {
  startTimerButton.disabled = isRunning || !eventDateInput.value;
  stopTimerButton.disabled = !isRunning;
  resetTimerButton.disabled = !isRunning && !eventDateInput.value;
}
// Кнопка "Установить дату"
startTimerButton.addEventListener("click", () => {
  if (!isRunning && eventDateInput.value) {
    isRunning = true;
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
    updateButtonStates();
  }
});

// Изменение даты
eventDateInput.addEventListener("input", () => {
  updateButtonStates();
});

// Обработчики для кнопок
stopTimerButton.addEventListener("click", stopTimer);
resetTimerButton.addEventListener("click", resetTimer);

updateButtonStates();
