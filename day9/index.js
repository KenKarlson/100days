document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  const playBtn = document.querySelector('.play');
  const pauseBtn = document.querySelector('.pause');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const progressBar = document.querySelector('.progress-bar');

  let tracks = [
    'music/track1.mp3',
    'music/track2.mp3',
    'music/track3.mp3',
    'music/track3.mp3',
    'music/track3.mp3',
    'music/track3.mp3',
    'music/track3.mp3',
  ];
  let currentTrack = 0;

  // Обработка кнопок
  playBtn.addEventListener('click', () => audio.play());
  pauseBtn.addEventListener('click', () => audio.pause());
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
  }
  // Начальная загрузка
  loadTrack(currentTrack);
});
