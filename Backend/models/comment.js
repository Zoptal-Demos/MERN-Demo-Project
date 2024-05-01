const mongoose = require('mongoose');
const moment = require('moment');

const timeStamps = () => {
    return moment().valueOf()
}

const commentSchema = new mongoose.Schema({
    comment : {
        type : String,
        default : "",
        trim : true
    },
    userId : mongoose.Types.ObjectId,
    propertyId : mongoose.Types.ObjectId,
    created_at : {
        type : Number,
        default : timeStamps()
    },
    updated_at : {
        type : Number,
        default : timeStamps()
    }
});

const commentModel = mongoose.model('Comment',commentSchema);
module.exports = commentModel;