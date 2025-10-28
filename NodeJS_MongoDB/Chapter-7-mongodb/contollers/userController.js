const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

// TODO1: get all users
exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet define',
  });
};

// TODO2: get single user
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet define',
  });
};

// TODO3: create a user
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet define',
  });
};

// TODO4: update user
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet define',
  });
};

// TODO5: delete user
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet define',
  });
};