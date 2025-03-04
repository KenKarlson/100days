<template>
  <div id="app">
    <div class="container">
      <h1 class="title">{{ title }}</h1>
      <div>
        Осталось сделать задач: <span class="counter">{{ counter }}</span>
      </div>
      <div class="list">
        <div class="item" v-for="task in tasks" :key="task.id">
          <input type="checkbox" />
          {{ task.name }}
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
      tasks: [
        { id: 1, name: "Развернуть окружение в Codepen", done: true },
        { id: 2, name: "Пройти курс по Vue", done: false },
        { id: 3, name: "Прочитать документацию по Vue", done: false },
      ],
    };
  },
  created() {
    this.counter = this.tasks.filter((task) => task.done === false).length;
  },
};
</script>

<style lang="scss">
</style>
