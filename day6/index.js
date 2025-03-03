function createCounter(value = 0){
  let count = value;
  return {
    increment(){
      count++;
    },
    decrement(){
      count--;
    },
    getValue(){
      return count;
    }
  }
}



let counter = createCounter(10);
counter.increment();
console.log(counter.getValue()); //Magic

let counter2 = createCounter(-10);
counter.increment();
console.log(counter2.getValue()); //Magic