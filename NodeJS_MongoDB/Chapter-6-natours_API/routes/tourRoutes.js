const express = require('express');
const tourController = require('../contollers/tourController');
const checkBodyMiddleware = require('../contollers/tourController')

const router = express.Router();
const app = express();

router.param('id', tourController.checkID)

// app.use((req, res, next)=>{
//   const name = req.body.name;
//   const price = req.body.price;
//   if(name && price){
//    next();
//   }else{
//     return 
//   }
// })

router
  .route('/')
  .get(tourController.getAllTours)
  .post(checkBodyMiddleware, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;


/*const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require('../contollers/tourController');*/