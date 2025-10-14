// console.log(arguments);
// console.log(require('module').wrapper);

const Calculator = require('./test-module-1');

// module.export
const calc1 = new Calculator();
console.log(calc1.add(10, 20));

// exports
// const calc2 = require('./test-module-2');
const { add, substract, multiply, divide } = require('./test-module-2');
console.log(add(2, 5));

// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
