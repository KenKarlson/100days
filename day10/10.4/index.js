// Список треков
const playlist = ["../track1.mp3", "../track2.mp3", "../track2.mp3"];

let currentTrackIndex = 0;

// Получаем элементы
const audio = document.getElementById("audio");
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const changeColor = document.getElementById("changeColor");
let colorCube = "#8ee38a";

// Создаем аудиоконтекст и анализатор
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audio);

// Подключаем анализатор к источнику звука
source.connect(analyser);
analyser.connect(audioContext.destination);

// Настройки анализатора
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Функция для загрузки трека
function loadTrack(index) {
  if (index >= 0 && index < playlist.length) {
    currentTrackIndex = index;
    audio.src = playlist[currentTrackIndex];
    audio.play();
  }
}

function drawVisualizer() {
  requestAnimationFrame(drawVisualizer);

  // Получаем данные о частотах
  analyser.getByteFrequencyData(dataArray);

  // Очищаем canvas (черный фон)
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Настройки для кубиков
  const cubeSize = 6; // Размер одного кубика
  const gapBetweenCubes = 2; // Расстояние между кубиками в столбце
  const gapBetweenColumns = 2; // Расстояние между столбцами

  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] / 2;

    // Вычисляем количество кубиков в столбце
    const cubesInColumn = Math.floor(barHeight / (cubeSize + gapBetweenCubes));

    // Рисуем кубики в столбце (зеленые с градиентом)
    for (let j = 0; j < cubesInColumn; j++) {
      const y = canvas.height - j * (cubeSize + gapBetweenCubes) - cubeSize;
      ctx.fillStyle = `${colorCube}`; // Зеленый цвет?
      ctx.fillRect(x, y, cubeSize, cubeSize);
    }

    // Увеличиваем x с учетом расстояния между столбцами
    x += cubeSize + gapBetweenColumns;
  }
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
changeColor.addEventListener("click", () => {
  colorCube = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`;
  console.log(ctx.fillStyle);
});

// Загружаем первый трек при загрузке страницы
loadTrack(currentTrackIndex);
// Запускаем визуализацию
drawVisualizer();
