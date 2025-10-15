const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('File not found!');
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) return reject('Could not write file');
      resolve('success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Bread: ${data}`);

    const res1Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Promise, res2Promise, res3Promise]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePromise('dog-img.txt', imgs.join('\n'))
    console.log('Random dog image is saved to the file!');
  } catch (err) {
    console.log(err.message);

    throw err;
  }

  return '2: ready';
};

(async () => {
  try {
    console.log('1. will get dog pics');
    const data = await getDogPic();
    console.log(data);
    console.log('3. Done getting the dog pics');
  } catch (err) {
    console.log('Error 404');
  }
})();

// getDogPic();
