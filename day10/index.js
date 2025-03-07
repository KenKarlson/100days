// Создаем аудио контекст
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Создаем анализатор
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048; // Размер быстрого преобразования Фурье

// Создаем визуализацию
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Функция для отрисовки
function draw() {
  requestAnimationFrame(draw);

  // Получаем данные из анализатора
  analyser.getByteFrequencyData(dataArray);

  // Очищаем холст
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Настраиваем стиль
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Рисуем полосы
  const barWidth = (canvas.width / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] / 2.5;
    ctx.fillStyle = `#77e706`;
    //ctx.fillStyle = `#339`;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth + 1;
  }
}

// Подключение аудио источника
function connectAudioSource(source) {
  const sourceNode = audioContext.createMediaElementSource(source);
  sourceNode.connect(analyser);
  analyser.connect(audioContext.destination);
}

// Пример использования:
const audioElement = document.getElementById('audio-source');
connectAudioSource(audioElement);
draw();
