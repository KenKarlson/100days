<template>
  <div class="app">
    <div class="calculator">
      <div class="display">{{ display }}</div>
      <div class="buttons">
        <button @click="append('7')">7</button>
        <button @click="append('8')">8</button>
        <button @click="append('9')">9</button>
        <button @click="setOperation('/')">/</button>
        <button @click="append('4')">4</button>
        <button @click="append('5')">5</button>
        <button @click="append('6')">6</button>
        <button @click="setOperation('*')">*</button>
        <button @click="append('1')">1</button>
        <button @click="append('2')">2</button>
        <button @click="append('3')">3</button>
        <button @click="setOperation('-')">-</button>
        <button @click="append('0')">0</button>
        <button @click="setOperation('+')">+</button>
        <button @click="calculate">=</button>
        <button @click="clear">C</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      display: '0',
      currentOperation: null,
      previousNumber: null,
    };
  },
  methods: {
    append(number) {
      if (this.display === '0' || this.display === '') {
        this.display = number;
    } else {
        this.display += number;
    }
    },
    setOperation(operation) {
      this.currentOperation = operation;
      this.previousNumber = parseFloat(this.display);
      this.display = '0';
    },
    calculate() {
      const currentNumber = parseFloat(this.display);

      switch (this.currentOperation) {
        case '+':
          this.display = this.previousNumber + currentNumber;
          break;
        case '-':
          this.display = this.previousNumber - currentNumber;
          break;
        case '*':
          this.display = this.previousNumber * currentNumber;
          break;
        case '/':
          if (currentNumber === 0) {
            this.display = 'Ошибка';
          } else {
            this.display = this.previousNumber / currentNumber;
          }
          break;
      }

      this.currentOperation = null;
      this.previousNumber = null;
    },
    clear() {
      this.display = '0';
      this.currentOperation = null;
      this.previousNumber = null;
    },
  },
};
</script>
