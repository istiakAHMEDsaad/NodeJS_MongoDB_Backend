const fs = require('fs');
const express = require('express');

const app = express();

//middleware
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// TODO1: get all tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    // status 200 means ok
    status: 'success',
    results: tours.length,
    data: {
      tours, //tours: tours 'if its same value we dont need to define'
    },
  });
});

// TODO2: get single tour
app.get(`/api/v1/tours/:id`, (req, res) => {
  // conver string to integer
  const id = req.params.id * 1;

  /*if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  const tour = tours.find((el) => el.id === id); */

  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'successs',
    data: {
      tour,
    },
  });
});

// TODO3: post methods
app.post('/api/v1/tours', (req, res) => {
  // for local database add id manually
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // status 201 means created
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
