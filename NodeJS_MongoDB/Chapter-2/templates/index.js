const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require('./module/replaceTemplate');

// top level code execute one time (synchronus)
const tempOverview = fs.readFileSync(`../templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`../templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`../templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`../dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slug = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slug);

// SERVER
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'content-type': 'text/html' });

    const cardHtml = dataObj.map((el) => replaceTemplate(tempCard, el)); // replace template
    const output = tempOverview.replace('{%PRODUCT_CARD%}', cardHtml);

    res.end(output);

    // Product Page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(data);

    // Not Found
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
