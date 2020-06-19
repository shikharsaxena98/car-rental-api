const router = require('express').Router();
const UserController = require('./../controllers/user');

router.post('/user/signup',function(req,res,next) {
    UserController.signup(req,res);
});

router.get('/user/profile',function(req,res,next) {
    console.log("Hi");
    UserController.getUsers(req,res);

});

router.get('/user/all',function(req,res,next) {
    
    UserController.getAllUsers(req,res);
});
module.exports = router;