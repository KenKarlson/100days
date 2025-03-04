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
      currentId: 0,
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
  },
};
</script>

<style lang="scss">
</style>
