// Функция для генерации случайного HEX-цвета
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Функция для создания полосок с цветами
function generateColorStrips() {
  const colorContainer = document.getElementById("colorContainer");
  colorContainer.innerHTML = ""; // Очищаем контейнер

  for (let i = 0; i < 5; i++) {
    const color = getRandomColor();
    const colorStrip = document.createElement("div");
    colorStrip.className = "colorStrip";
    colorStrip.style.backgroundColor = color;
    colorStrip.textContent = color;
    colorContainer.appendChild(colorStrip);
  }
}

// Генерация полосок при загрузке страницы
generateColorStrips();

// Обработчик кнопки
document
  .getElementById("generateBtn")
  .addEventListener("click", generateColorStrips);
