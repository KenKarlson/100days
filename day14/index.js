document.addEventListener('DOMContentLoaded', function() {
    // Определяем элементы DOM
    const prevYearBtn = document.getElementById('prevYear');
    const nextYearBtn = document.getElementById('nextYear');
    const currentYearElement = document.getElementById('currentYear');
    const calendarElement = document.getElementById('calendar');

    let currentYear = new Date().getFullYear();

    // Получаем текущую дату
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYearToday = today.getFullYear();

    // Функция для отрисовки календаря
    function renderCalendar(year) {
        currentYearElement.textContent = year;
        calendarElement.innerHTML = '';

        for (let month = 0; month < 12; month++) {
            const monthName = new Date(year, month).toLocaleString('ru', { month: 'long' });
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDayOfWeek = new Date(year, month, 1).getDay();

            const monthContainer = document.createElement('div');
            monthContainer.classList.add('month');
            monthContainer.innerHTML = `<h2>${monthName}</h2>`;

            const daysContainer = document.createElement('div');
            daysContainer.classList.add('days');

            // Пустые ячейки для дней недели перед первым днем месяца
            for (let i = 0; i < (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1); i++) {
                const emptyDay = document.createElement('div');
                emptyDay.classList.add('day');
                daysContainer.appendChild(emptyDay);
            }

            // Дни месяца
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.classList.add('day');
                dayElement.textContent = day;

                // Проверяем, является ли день текущим
                if (
                    day === currentDay &&
                    month === currentMonth &&
                    year === currentYearToday
                ) {
                    dayElement.classList.add('current-day'); // Добавляем класс для текущего дня
                }

                daysContainer.appendChild(dayElement);
            }

            monthContainer.appendChild(daysContainer);
            calendarElement.appendChild(monthContainer);
        }
    }

    // Функция для перехода на предыдущий год
    function goToPrevYear() {
        currentYear--;
        renderCalendar(currentYear);
    }

    // Функция для перехода на следующий год
    function goToNextYear() {
        currentYear++;
        renderCalendar(currentYear);
    }

    // Назначаем обработчики событий на кнопки
    prevYearBtn.addEventListener('click', goToPrevYear);
    nextYearBtn.addEventListener('click', goToNextYear);

    // Отрисовываем календарь для текущего года при загрузке страницы
    renderCalendar(currentYear);
});