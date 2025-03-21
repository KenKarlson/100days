// Список треков
const playlist = ["../track1.mp3", "../track2.mp3"];

let currentTrackIndex = 0;

// Получаем элементы
const audio = document.getElementById("audio");
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

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

// Функция для отрисовки визуализации
function drawVisualizer() {
  requestAnimationFrame(drawVisualizer);

  // Получаем данные о частотах
  analyser.getByteFrequencyData(dataArray);

  // Очищаем canvas
  ctx.fillStyle = "rgb(200, 200, 200)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Рисуем столбцы эквалайзера
  const barWidth = (canvas.width / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];

    // Задаем цвет столбца
    ctx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
    ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

    x += barWidth + 1;
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

// Загружаем первый трек при загрузке страницы
loadTrack(currentTrackIndex);

// Запускаем визуализацию
drawVisualizer();
