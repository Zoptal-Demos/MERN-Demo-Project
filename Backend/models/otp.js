const mongoose = require('mongoose');
const moment = require('moment');

const timeStamps = () => {
    return moment().valueOf()
}

const otpSchema = new mongoose.Schema({
    otp : {
        type : String,
        default : "",
        trim : true
    },
    email: {type: String, default: ''},
    created_at : {
        type : Number,
        default : timeStamps()
    },
    updated_at : {
        type : Number,
        default : timeStamps()
    },
    
});

const otpModel = mongoose.model('Otp',otpSchema);
module.exports = otpModel;