const express = require('express');
const app = express();
const port = 3000;

// get method
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from the server side!',
    app: 'Natours',
  });
});

// post method
app.post('/', (req, res) => {
  res.send('You can post this on endpoint!');
});

app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
