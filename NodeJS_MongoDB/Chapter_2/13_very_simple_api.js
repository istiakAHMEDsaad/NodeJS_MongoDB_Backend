const fs = require('fs');
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the overview');
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT');
  } else if (pathName === '/api') {
    fs.readFile(
      `${__dirname}/dev-data/data.json`,
      'utf-8',
      (err, data) => {
        const productData = JSON.parse(data);
        console.log(productData);
      }
    );
    //${__dirname}/NodeJS_MongoDB/Chapter_2/dev-data/data.json
    res.end('API');
  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log(`Listening to request on the port 8000`);
});
