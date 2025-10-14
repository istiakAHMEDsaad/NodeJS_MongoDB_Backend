// console.log(arguments);
// console.log(require('module').wrapper);

const Calculator = require('./test-module');

const calc1 = new Calculator();
console.log(calc1.add(10, 20));
