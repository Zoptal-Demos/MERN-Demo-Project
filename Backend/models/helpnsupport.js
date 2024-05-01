const mongoose = require('mongoose');
const moment = require('moment');

const timeStamps = () => {
    return moment().valueOf()
}

const helpAndSupport = new mongoose.Schema({
    query : {
        type : String,
        default : "",
        trim : true
    },
    userId : mongoose.Types.ObjectId,
    created_at : {
        type : Number,
        default : timeStamps()
    },
    updated_at : {
        type : Number,
        default : timeStamps()
    }
});

const helpAndSupportModel = mongoose.model('Helpnsupport',helpAndSupport);
module.exports = helpAndSupportModel;