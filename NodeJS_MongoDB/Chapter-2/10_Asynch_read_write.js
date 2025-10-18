const fs = require('fs');

// Blocking synchronous way
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8'); //utf-8 is a character encoding
// console.log(textIn);

const textOut = `This is what we know about avocado ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// Non-blocking, asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  if (err) return console.log('error!')
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    console.log('2. ' + data2);
    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      console.log('3. ' + data3);

      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
        console.log('4. Your file has been written');
      });
    });
  });
});

console.log('1. Will read file!');
