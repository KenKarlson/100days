// Получаем элементы DOM
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// Функция добавления задачи
// function addTask(taskText) {
//   const li = document.createElement('li');
//   li.textContent = taskText;

//   //Добавить чекбокс
//   const checkbox = document.createElement('input');
//   checkbox.type = 'checkbox';
//   checkbox.addEventListener('change', () => {
//     li.classList.toggle('completed');
//   });
//   li.appendChild(checkbox);
//   // Добавляем кнопку удаления
//   const deleteButton = document.createElement('button');
//   deleteButton.textContent = 'Удалить';
//   deleteButton.addEventListener('click', () => {
//     li.remove();
//   });

//   li.appendChild(deleteButton);

//   // Добавляем обработчик для пометки как выполненной
//   li.addEventListener('click', () => {
//     li.classList.toggle('completed');
//   });

//   taskList.appendChild(li);
// }
// Функция добавления задачи
function addTask(taskText) {
  const li = document.createElement('li');

  // Добавить чекбокс
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed');
  });
  li.appendChild(checkbox);

  // Добавить текст задачи
  const taskTextElement = document.createTextNode(taskText);
  li.appendChild(taskTextElement);

  // Добавить кнопку удаления
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Удалить';
  deleteButton.addEventListener('click', () => {
    li.remove();
  });
  li.appendChild(deleteButton);

  taskList.appendChild(li);
}

// Обработчик добавления новой задачи
addButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
  }
});
