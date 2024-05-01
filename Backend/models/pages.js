const mongoose = require('mongoose');
const moment = require('moment');

const timeStamps = () => {
    return moment().valueOf()
}

const pageSchema = new mongoose.Schema({
    type : {
        type : Number,
        default : 0
    },
    content : {
        type : String,
        default : ""
    },
    created_at : {
        type : Number,
        default : timeStamps()
    },
    updated_at : {
        type : Number,
        default : timeStamps()
    }
});

const pageModel = mongoose.model('Page',pageSchema);
module.exports = pageModel;