const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const car = new Schema({
    model: {
        type:String,
        required:true
    },
    vehicle_number: {
        type:String,
        required:true,
        unique:true
    },
    seating_capacity: {
        type:Number,
        required:true,
    },
    rent_price_per_day : {
        type:Number,
        required:true
    }
});

const carModel = mongoose.model('Car',car);

module.exports = carModel;