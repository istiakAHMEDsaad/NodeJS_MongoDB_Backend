const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // solution 1: we write everythings at once into a variable, and once that was ready, we then sent that entire piece of data back to the client

  /* fs.readFile('./test-file.txt', (err, data) => {
     if (err) console.log(err);
     res.end(data);
   }); */

  // solution 2: (we are effectively streaming the file, so we read one piece of the file and as soon as that's available, we send right to the client, using  the write methods of the respond streams, then nex piece available then that piece will be sent and all the way until the entire file is read and streamed )
  const readable = fs.createReadStream('./test-file.txt');
  readable.on('data', (chunk) => {
    res.write(chunk);
  });

  readable.on('end', ()=>{
    res.end();
  })
});

server.listen(8000, '127.0.0.1', () => {
  console.log(`Listening to port ${8000}`);
});
