function lazyLoadImages() {
  const images = document.querySelectorAll('.lazy-load');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        img.classList.remove('lazy-load');
        observer.unobserve(img);
      }
    });
  });

  // Добавляем обработчики ошибок
  images.forEach((img) => {
    img.addEventListener('error', (event) => {
      handleError(event.target);
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    images.forEach((img) => observer.observe(img));
  });
}

function handleError(img) {
  img.src = 'access/img/error.png';
  img.classList.remove('lazy-load');
}

// Инициализация
lazyLoadImages();
