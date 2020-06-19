const User = require('./../models/user');
const carModel = require('../models/car');

class UserController {
    async signup(req,res) {
        const body = req.body;
        if(!this.isValidEntry(body)) {
            res.status(400).json({success:false,message:"Invalid Input"});
            return;
        }
        const newUser = new User({
            firstname : body.firstname,
            lastname :body.lastname,
            phonenumber:body.phonenumber
        });
        let resp;
        try {
            resp = await newUser.save();
        } catch(err) {
            console.log(err);
            res.status(400).json({success:false,message:err});
            return ;
        }
        res.status(200).json({success:true,message:"User Signed Up successfully"});
    }

    isValidEntry(body) {
        if(!body.firstname || body.firstname=="") return false;
        else if(!body.lastname || body.lastname=="") return false;
        else if(!body.phonenumber || body.phonenumber.length!=10) return false;
        return true;
    }

    async getAllUsers(req,res) {
        let resp;
        try {
            resp = await User.find();
            res.status(200).json({success:true,message:resp});
            return ;
        }
        catch(err) {
            res.status(400).json({success:false,message:err});
            return;
        }
    }

    async getUsers(req,res) {
        const params = req.query;
        console.log(params);
        if(!params._id) {
            res.status(400).json({success:false,message:"User ID not found"});
            return ;
        }
        let resp;
        try {
            resp = await User.findById(params._id);
            res.status(200).json({success:true,message:resp});
            return ;
        } catch(err) {
            console.log(err);
            res.status(400).json({success:false,message:err});
            return ;
        }
    }
}


module.exports = new UserController();