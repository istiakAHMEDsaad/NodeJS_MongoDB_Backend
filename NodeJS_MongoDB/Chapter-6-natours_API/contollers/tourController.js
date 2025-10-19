const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  if (parseInt(req.params.id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

// TODO1: get all tours
exports.getAllTours = (req, res) => {
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

// TODO2: get single tour
exports.getTour = (req, res) => {
  // conver string to integer
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'successs',
    data: {
      tour,
    },
  });
};

// TODO3: create a tour
exports.createTour = (req, res) => {
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

// TODO4: update tour
exports.updateTour = (req, res) => {
  // put -> entire new update object,
  // patch -> only update properties
  res.status(200).json({
    status: 'success',
    data: {
      tour: `<Updated tour here...>`,
    },
  });
};

// TODO5: delete tour
exports.deleteTour = (req, res) => {
  // status 204 means (deleted/no content)
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
};
