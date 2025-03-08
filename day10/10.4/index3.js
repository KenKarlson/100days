// Список треков
const playlist = [
  { name: "Ла-Ла-Ла", src: "../track1.mp3" },
  { name: "Портофино", src: "../track2.mp3" },
  { name: "Трек 3", src: "../track3.mp3" },
];

let currentTrackIndex = 0;
let audioContextInitialized = false;

// Глобальные переменные для аудиоконтекста и анализатора
let audioContext;
let analyser;
let dataArray;
let bufferLength;

// Получаем элементы
const audio = document.getElementById("audio");
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const startButton = document.getElementById("start");
const changeColorButton = document.getElementById("changeColor");
const trackList = document.getElementById("trackList"); // Список треков

// Переменная для хранения текущего цвета кубиков
let colorCube = "rgb(50, ${barHeight + 100}, 50)";

// Функция для загрузки трека
function loadTrack(index) {
  if (index >= 0 && index < playlist.length) {
    currentTrackIndex = index;
    audio.src = playlist[currentTrackIndex].src;
    audio.play().catch((error) => {
      console.error("Ошибка воспроизведения:", error);
    });
    highlightCurrentTrack(); // Подсвечиваем текущий трек в списке
  }
}

// Функция для отрисовки визуализации в виде кубиков
function drawVisualizer() {
  requestAnimationFrame(drawVisualizer);

  // Очищаем canvas и задаем серый фон
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Заливка фона

  // Получаем данные о частотах
  analyser.getByteFrequencyData(dataArray);

  // Настройки для кубиков
  const cubeSize = 4; // Размер одного кубика
  const gapBetweenCubes = 1; // Расстояние между кубиками в столбце
  const gapBetweenColumns = 1; // Расстояние между столбцами

  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] / 2;

    // Вычисляем количество кубиков в столбце
    const cubesInColumn = Math.floor(barHeight / (cubeSize + gapBetweenCubes));

    // Рисуем кубики в столбце
    for (let j = 0; j < cubesInColumn; j++) {
      const y = canvas.height - j * (cubeSize + gapBetweenCubes) - cubeSize;
      ctx.fillStyle = colorCube; // Используем текущий цвет
      ctx.fillRect(x, y, cubeSize, cubeSize);
    }

    // Увеличиваем x с учетом расстояния между столбцами
    x += cubeSize + gapBetweenColumns;
  }
}

// Инициализация аудиоконтекста и анализатора
function initializeAudioContext() {
  if (!audioContextInitialized) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    audioContextInitialized = true;
    drawVisualizer();
  }
}

// Функция для отображения списка треков
function renderPlaylist() {
  trackList.innerHTML = ""; // Очищаем список
  playlist.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = track.name;
    li.addEventListener("click", () => {
      loadTrack(index); // Загружаем выбранный трек
    });
    trackList.appendChild(li);
  });
}

// Функция для подсветки текущего трека в списке
function highlightCurrentTrack() {
  const tracks = trackList.querySelectorAll("li");
  tracks.forEach((track, index) => {
    if (index === currentTrackIndex) {
      track.style.backgroundColor = "#d3d3d3"; // Подсветка текущего трека
    } else {
      track.style.backgroundColor = ""; // Сбрасываем подсветку
    }
  });
}

// Обработчики кнопок
prevButton.addEventListener("click", () => {
  currentTrackIndex =
    (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
});

nextButton.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
});

startButton.addEventListener("click", () => {
  initializeAudioContext();
  loadTrack(currentTrackIndex);
});

// Обработчик кнопки смены цвета
changeColorButton.addEventListener("click", () => {
  // Генерируем случайный цвет
  colorCube = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`;
  ctx.fillStyle = colorCube; // Устанавливаем новый цвет для canvas
  console.log(ctx.fillStyle);
  console.log("Новый цвет кубиков:", colorCube); // Выводим новый цвет в консоль
});

// Инициализация списка треков
renderPlaylist();

// Загружаем первый трек при загрузке страницы
// loadTrack(currentTrackIndex); // Убрано, чтобы избежать ошибки автовоспроизведения

// Запускаем визуализацию
// drawVisualizer(); // Убрано, чтобы избежать ошибки до инициализации
