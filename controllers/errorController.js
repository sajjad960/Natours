const AppError = require('../utils/appError');

const handleCastErrorDB = (err, res) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDublicateFieldDb = (err, res) => {
  const value = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/);

  const message = `Duplicate field value: ${value} Please use another name`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err, res) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(', ')}`;

  return new AppError(message, 400);
};

// eslint-disable-next-line no-unused-vars
const handleJWTError = (err) =>
  new AppError('Invalid token, Please log in again', 404);

// eslint-disable-next-line no-unused-vars
const handleJWTExpiredError = (err) =>
  new AppError('Your token has expired! Please log in again', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational trusted error send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    //Programming or other unkown error
  } else {
    //1 ) Log error
    // console.log('Error 😁', err);
    // 2) Send geraric message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.assign(err);

    if (err.name === 'CastError') {
      error = handleCastErrorDB(err);
    }
    if (error.code === 11000) error = handleDublicateFieldDb(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError(error);
    sendErrorProd(error, res);
  }
};
