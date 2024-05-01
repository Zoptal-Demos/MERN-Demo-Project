const mongoose = require('mongoose');
const moment = require('moment');

const timeStamps = () => {
    return moment().valueOf()
}

const companySchema = new mongoose.Schema({
    name : {
        type : String,
        default : "",
        trim : true
    },
    website : {
        type : String,
        default : "",
        trim : true
    },
    contact : {
        type : String,
        default : "",
        trim : true
    },
    address : {  
        type : String,
        default : "",
        trim : true
    },
    city : {
        type : String,
        default : "",
        trim : true
    },
    zipcode : {
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

const companyModel = mongoose.model('Company',companySchema);
module.exports = companyModel;