const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    firstname: {
        type:String,
        required:true
    },
    lastname : String,
    phonenumber: {
        type:String,
        required:true,
        validate: (str) => {
            const mobileRegExp = /^((\+)?(\d{2}[-]))?(\d{10}){1}?$/; 
            return mobileRegExp.test(str);
        },
        unique:true
    }
})

const userModel = mongoose.model('User',user);

module.exports = userModel;