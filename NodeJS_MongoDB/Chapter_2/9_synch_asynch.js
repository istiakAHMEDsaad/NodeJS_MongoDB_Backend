const fs = require('fs');

//Blocking code execution 👎
const input = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(input);

// Non blocking code execution 👍
fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
  console.log(data);
});
console.log('Reading file...');
