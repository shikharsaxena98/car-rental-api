const router = require('express').Router();
const carController = require('./../controllers/car');


router.post('/car/add',function(req,res,next) {
    carController.addNewCar(req,res);
});

router.post('/car/update',function(req,res,next) {
    carController.updateCar(req,res);
});

router.post('/car/delete',function(req,res,next) {
    carController.deleteCar(req,res,next);
});

router.post('/car/available',function(req,res,next) {   
    carController.getAvailableCars(req,res,next);
});

module.exports = router;