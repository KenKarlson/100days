function createCounter(value = 0) {
  let count = value;
  return {
    increment() {
      count++;
    },
    decrement() {
      count--;
    },
    getValue() {
      return count;
    },
  };
}
function createCounterUniverse(value = 0, step = 1) {
  let count = value;
  let initial = value;
  let minValue = -Infinity;
  let maxValue = Infinity;

  function checkBorders() {
    count < minValue ? (count = minValue) : count > maxValue ? (count = maxValue) : null;
  }

  return {
    increment() {
      count += step;
      checkBorders();
    },
    decrement() {
      count -= step;
      checkBorders();
    },
    getValue() {
      return count;
    },
    reset() {
      count = initial;
    },
  };
}

let counter = createCounter(10);
counter.increment();
console.log(counter.getValue()); //Magic

let counter2 = createCounter(-10);
counter.increment();
console.log(counter2.getValue()); //Magic

let testCounter = createCounterUniverse(10, 3);
testCounter.decrement();
console.log(testCounter.getValue()); //Magic

