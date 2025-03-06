document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  const playBtn = document.querySelector('.play');
  const pauseBtn = document.querySelector('.pause');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const progressBar = document.querySelector('.progress-bar');

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const audioContext = new (window.AudioContext || window.AudioContext)();
  const analyser = audioContext.createAnalyser();

  let tracks = ['music/track1.mp3', 'music/track2.mp3', 'music/track3.mp3'];
  let currentTrack = 0;

  // Обработка кнопок
  playBtn.addEventListener('click', () => {
    audio.play();
    drawWaterfall();
  });
  pauseBtn.addEventListener('click', () => {
    audio.pause();
    cancelAnimationFrame(drawWaterfall);
  });
  prevBtn.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
  });
  nextBtn.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
  });

  // Обновление прогресса
  audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
  });

  // Загрузка трека
  function loadTrack(index) {
    audio.src = tracks[index];
    audio.currentTime = 0;
    audio.play();
    drawWaterfall();
  }

  function drawWaterfall() {
    // Очистите canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Получите данные анализатора
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    // Рисуйте "водопад"
    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = dataArray[i];
      const x = i * 3;
      const y = canvas.height - barHeight;
      const width = 2;
      const height = barHeight;
      ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
      ctx.fillRect(x, y, width, height);
    }

    // Запросите следующий кадр
    requestAnimationFrame(drawWaterfall);
  }

  // Начальная загрузка
  loadTrack(currentTrack);
});
