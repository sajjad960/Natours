const express = require('express');
const fs = require('fs');
const app = require('../app');
const authController = require('./../controllers/authController');

const router = express.Router();
const tourController = require('./../controllers/tourController');

// router.param('id', tourController.checkId);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.newTours);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTours)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTours
  );

module.exports = router;
