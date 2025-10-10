const fs = require('fs');
const http = require('http');
const url = require('url');

// SERVER
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName); // regular expresssion with -g flag -> all the placeholder will get replaced not just the first one occurs

  output = output.replace(/{%IMAGE%}/g, product.image); // it's not a good practice to directly manipulate the arguments that we passed into the function -> now manupulate the first one!

  output = output.replace(/{%PRICE%}/g, product.price);

  output = output.replace(/{%FROM%}/g, product.from);

  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);

  output = output.replace(/{%QUANTITY%}/g, product.quantity);

  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

  return output;
};

// top level code execute one time (synchronus)
const tempOverview = fs.readFileSync(`../templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`../templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`../templates/template-product.html`,'utf-8');

const data = fs.readFileSync(`../dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview Page
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, { 'content-type': 'text/html' });

    const cardHtml = dataObj.map((el) => replaceTemplate(tempCard, el)); // replace template
    const output = tempOverview.replace('{%PRODUCT_CARD%}', cardHtml)

    res.end(output);

    // Product Page
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT');

    // API
  } else if (pathName === '/api') {
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
