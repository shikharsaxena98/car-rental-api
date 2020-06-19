const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    car_id: {
        type: String,
        required:true
    },
    user_id: {
        type:String,
        required:true
    },
    issue_date: {
        type: Date,
        required: true
    },
    return_date: {
        type: Date,
        required:true    
    }

});

const bookingModel = mongoose.model('Booking',bookingSchema);

module.exports = bookingModel;