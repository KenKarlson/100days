const playBtn = document.getElementById("play-button");
const bgAudio = document.getElementById("background-audio");
const playImg = document.querySelector(".playImg");

let isPlaying = false;

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    bgAudio.pause(); // Остановить воспроизведение
    playImg.src = "./assets/img/play24.png"; // Изменить на иконку "Play"
  } else {
    bgAudio.play(); // Начать воспроизведение
    playImg.src = "./assets/img/pause24.png"; // Изменить на иконку "Pause"
  }
  isPlaying = !isPlaying; // Переключить состояние
});

//Переделать на стрелочную !!!!!!
//Кнопкак вкл и вык вук!! круглая и справа висит с р
//Почини кнопку r на клаве и { ;)!
