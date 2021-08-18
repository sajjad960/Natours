const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routs/tourRouters');
const tourUser = require('./routs/userRouters');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// MiddleWear
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static('./public'));

app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', newTours);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTours);
// app.delete('/api/v1/tours/:id', deleteTours);

// Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', tourUser);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `can't find ${req.originalUrl} on this surver`,
  // });

  // const err = new Error(`can't find ${req.originalUrl} on this surver`);

  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`can't find ${req.originalUrl} on this surver`, 404));
});

app.use(globalErrorHandler);
// Start Server
module.exports = app;
