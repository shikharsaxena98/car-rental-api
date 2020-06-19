const User = require('./../models/user');

class UserController {
    async signup(req,res) {
        console.log("Here1.5")
        const body = req.body;
        if(!this.isValidEntry(body)) {
            res.status(400).json({success:false,message:"Invalid Input"});
            return;
        }
        console.log("Here2");
        const newUser = new User({
            firstname : body.firstname,
            lastname :body.lastname,
            phonenumber:body.phonenumber
        });
        console.log("Here-3");
        let resp;
        try {
            resp = await newUser.save();
        } catch(err) {
            console.log(err);
            res.status(400).json({success:false,message:err});
        }
        res.status(200).json({success:true,message:"User Signed Up successfully"})
    }

    isValidEntry(body) {
        if(!body.firstname || body.firstname=="") return false;
        else if(!body.lastname || body.lastname=="") return false;
        else if(!body.phonenumber || body.phonenumber.length!=10) return false;
        return true;
    }
}


module.exports = new UserController();