module.exports = (temp, product) => {
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