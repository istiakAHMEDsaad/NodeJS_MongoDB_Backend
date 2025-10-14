// console.log(arguments);
// console.log(require('module').wrapper);

const Calculator = require('./test-module');

// module.export
const calc1 = new Calculator();
console.log(calc1.add(10, 20));

// exports
const calc2 = require('./test-module-2');
console.log(calc2.add(2, 5));
