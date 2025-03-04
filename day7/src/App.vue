<template>
  <div id="app">
    <div class="container">
      <h1 class="title">{{ title }}</h1>
      <div>
        Осталось сделать задач: <span class="counter">{{ count() }}</span>
      </div>
      <div class="list">
        <div
          class="item"
          :class="{ done: task.done }"
          v-for="task in tasks"
          :key="task.id"
        >
          <input type="checkbox" v-model="task.done" />
          {{ task.name }}
        </div>
      </div>
      <div class="form">
        <input v-model="newTaskTitle" :placeholder="placeholder" />
        <button type="button" @click="addTask">Добавить</button>
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
      newTaskTitle: "",
      title: "Список задач",
      placeholder: "Добавить задачу",
      tasks: [
        { id: 1, name: "Развернуть окружение в Codepen", done: true },
        { id: 2, name: "Пройти курс по Vue", done: false },
        { id: 3, name: "Прочитать документацию по Vue", done: false },
      ],
    };
  },
  methods: {
    addTask() {
      if (this.newTaskTitle.trim() !== "") {
        const newTask = {
          id: this.tasks.length + 1,
          name: this.newTaskTitle,
          done: false,
        };

        this.tasks.push(newTask);
        console.log(newTask);
        this.newTaskTitle = "";
      }
    },
    count() {
      return this.tasks.filter((task) => task.done === false).length;
    },
  },
};
</script>

<style lang="scss">
</style>
