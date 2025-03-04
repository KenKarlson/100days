<template>
  <div id="app">
    <div class="container">
      <h1 class="title">{{ title }}</h1>
      <div>
        Осталось сделать задач: <span class="counter">{{ counter }}</span>
      </div>
      <div class="list">
        <div class="item done">
          <input type="checkbox" checked />
          Развернуть окружение в Codepen
        </div>
        <div class="item">
          <input type="checkbox" />
          Пройти курс по Vue
        </div>
        <div class="item">
          <input type="checkbox" />
          Сделать интернет-магазин на Vue
        </div>
      </div>
      <div class="form">
        <input :placeholder="placeholder" />
        <button type="button">Добавить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      counter: 3,
      title: "Список задач",
      placeholder: "Добавить задачу",
    };
  },
};
</script>

<style lang="scss">
</style>
