document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const year = parseInt(urlParams.get("year"));
  const month = parseInt(urlParams.get("month"));

  const monthNameElement = document.getElementById("monthName");
  const monthGridElement = document.getElementById("monthGrid");

  // Название месяца
  const monthName = new Date(year, month).toLocaleString("ru", {
    month: "long",
    year: "numeric",
  });
  monthNameElement.textContent = monthName;

  // Создаем сетку для месяца
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // Заголовки для дней недели
  const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const headerRow = document.createElement("div");
  headerRow.classList.add("grid-row", "header-row");

  weekdays.forEach((day) => {
    const dayHeader = document.createElement("div");
    dayHeader.classList.add("grid-cell", "header-cell");
    dayHeader.textContent = day;
    headerRow.appendChild(dayHeader);
  });

  monthGridElement.appendChild(headerRow);

  // Сетка для дней и часов
  for (let day = 1; day <= daysInMonth; day++) {
    const dayRow = document.createElement("div");
    dayRow.classList.add("grid-row");

    const dayCell = document.createElement("div");
    dayCell.classList.add("grid-cell", "day-cell");
    dayCell.textContent = day;
    dayRow.appendChild(dayCell);

    // Добавляем ячейки для каждого часа (24 часа)
    for (let hour = 0; hour < 24; hour++) {
      const hourCell = document.createElement("div");
      hourCell.classList.add("grid-cell", "hour-cell");
      hourCell.textContent = `${hour}:00`;
      dayRow.appendChild(hourCell);
    }

    monthGridElement.appendChild(dayRow);
  }
});
