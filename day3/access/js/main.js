// Инициализация
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

// Функция сохранения
function saveBookmarks() {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
function deleteBookmark(event) {
  const li = event.target.closest('li');
  const index = li.dataset.index;

  if (confirm('Вы уверены, что хотите удалить эту закладку?')) {
    bookmarks.splice(index, 1);
    saveBookmarks();
    renderBookmarks();
  }
}
// Отображение закладок
function renderBookmarks() {
  const list = document.getElementById('bookmarks');
  list.innerHTML = bookmarks
    .map(
      (bookmark, index) => `
  <li data-index="${index}">
  <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
  <button class="delete-btn">Удалить</button>
  </li>
  `
    )
    .join('');

  // Добавляем обработчики событий после рендера
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', deleteBookmark);
  });
}
// Добавление закладки
document.getElementById('add').addEventListener('click', () => {
  const urlInput = document.getElementById('url');
  const titleInput = document.getElementById('title');

  const url = urlInput.value;
  const title = titleInput.value;

  bookmarks.push({ url, title });
  saveBookmarks();
  renderBookmarks();

  // Добавляем очистку полей
  urlInput.value = '';
  titleInput.value = '';

  // Можно также добавить фокус на первое поле
  urlInput.focus();
});

// Инициализация отображения
renderBookmarks();
