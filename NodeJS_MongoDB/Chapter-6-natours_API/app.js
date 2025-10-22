const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

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

//* 2) ROUTES

app.use('/api/v1/tours', tourRouter); // -> mounting the router...
app.use('/api/v1/users', userRouter);

module.exports = app;
