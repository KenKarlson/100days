<template>
  <div class="app">
    <h1>hello</h1>
    <div id="player">
      <audio ref="audio" controls></audio>
      <canvas ref="visualizer" width="300" height="100"></canvas>
      <div class="controls">
        <button @click="startPlayer">▶</button>
        <button @click="prevTrack">⏮</button>
        <button @click="nextTrack">⏭</button>
        <button @click="changeColor">🔆</button>
      </div>
      <div id="playlist">
        <h3>Список треков:</h3>
        <ul>
          <li
            v-for="(track, index) in playlist"
            :key="index"
            @click="loadTrack(index)"
            :class="{ active: currentTrackIndex === index }"
          >
            {{ track.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      playlist: [
        { name: "Трек 1", src: require("@/assets/mp3/track1.mp3") },
        { name: "Трек 2", src: require("@/assets/mp3/track2.mp3") },
        { name: "Трек 3", src: require("@/assets/mp3/track3.mp3") },
        { name: "Трек 4", src: require("@/assets/mp3/track4.mp3") },
        { name: "Трек 5", src: require("@/assets/mp3/track5.mp3") },
      ],
      currentTrackIndex: 0,
      audioContext: null,
      analyser: null,
      dataArray: null,
      bufferLength: null,
      colorCube: "#339", // Начальный цвет кубиков
      isPlaying: false,
    };
  },
  mounted() {
    // Инициализация аудиоконтекста при загрузке компонента
    this.initializeAudioContext();
  },
  methods: {
    // Загрузка трека
    loadTrack(index) {
      if (index >= 0 && index < this.playlist.length) {
        this.currentTrackIndex = index;
        this.$refs.audio.src = this.playlist[index].src;
        this.$refs.audio.play().catch((error) => {
          console.error("Ошибка воспроизведения:", error);
        });
        this.isPlaying = true;
      }
    },
    // Следующий трек
    nextTrack() {
      this.currentTrackIndex =
        (this.currentTrackIndex + 1) % this.playlist.length;
      this.loadTrack(this.currentTrackIndex);
    },
    // Предыдущий трек
    prevTrack() {
      this.currentTrackIndex =
        (this.currentTrackIndex - 1 + this.playlist.length) %
        this.playlist.length;
      this.loadTrack(this.currentTrackIndex);
    },
    // Запуск плеера
    startPlayer() {
      this.loadTrack(this.currentTrackIndex);
    },
    // Инициализация аудиоконтекста
    initializeAudioContext() {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        const source = this.audioContext.createMediaElementSource(
          this.$refs.audio
        );

        source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);

        this.drawVisualizer();
      }
    },
    // Отрисовка визуализации
    drawVisualizer() {
      const canvas = this.$refs.visualizer;
      const ctx = canvas.getContext("2d");

      // Очищаем canvas и задаем фон
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Получаем данные о частотах
      this.analyser.getByteFrequencyData(this.dataArray);

      // Настройки для кубиков
      const cubeSize = 6;
      const gapBetweenCubes = 1;
      const gapBetweenColumns = 1;

      let x = 0;

      for (let i = 0; i < this.bufferLength; i++) {
        const barHeight = this.dataArray[i] / 2;

        // Вычисляем количество кубиков в столбце
        const cubesInColumn = Math.floor(
          barHeight / (cubeSize + gapBetweenCubes)
        );

        // Рисуем кубики в столбце
        for (let j = 0; j < cubesInColumn; j++) {
          const y = canvas.height - j * (cubeSize + gapBetweenCubes) - cubeSize;
          ctx.fillStyle = this.colorCube;
          ctx.fillRect(x, y, cubeSize, cubeSize);
        }

        // Увеличиваем x с учетом расстояния между столбцами
        x += cubeSize + gapBetweenColumns;
      }

      // Запускаем анимацию
      requestAnimationFrame(this.drawVisualizer.bind(this));
    },
    // Смена цвета кубиков
    getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    changeColor() {
      this.colorCube = this.getRandomColor();
      console.log("Цвет кубиков изменен на:", this.colorCube);
    },
  },
};
</script>
