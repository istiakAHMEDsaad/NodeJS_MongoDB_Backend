const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

//* 1) MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello forom the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = `${new Date().toISOString()} 🕰️`;
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//* 2) ROUTE HANDLERS
// TODO1: get all tours
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    // status 200 means ok
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours, //tours: tours 'if its same value we dont need to define'
    },
  });
};

// TODO: get single tour
const getTour = (req, res) => {
  // conver string to integer
  const id = req.params.id * 1;
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
};

// TODO2: post methods
const createTour = (req, res) => {
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
};

// TODO3: patch methods
const updateTour = (req, res) => {
  // put -> entire new update object,
  // patch -> only update properties
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: `<Updated tour here...>`,
    },
  });
};

// TODO4: delete methods
const deleteTour = (req, res) => {
  if (parseInt(req.params.id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  // status 204 means (deleted/no content)
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet define',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet define',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet define',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet define',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet define',
  });
};


/*
app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);
*/

//* 3) ROUTES
app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);
app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

//* 4) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
