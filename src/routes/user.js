const router = require('express').Router();
const UserController = require('./../controllers/user');

router.post('/user/signup',function(req,res,next) {
    console.log("Here");
    UserController.signup(req,res);
});

module.exports = router;