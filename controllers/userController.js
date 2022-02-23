const Users = require('../models/userModel.js');

// Route Handler

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find();

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
  // res.status(500).json({
  //   status: 'error',
  //   message: 'This route is not define this time',
  // });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not define this time',
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not define this time',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not define this time',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not define this time',
  });
};
