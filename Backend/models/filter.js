const mongoose = require('mongoose');
const moment = require('moment');

const timeStamps = () => {
    return moment().valueOf()
}

const filterSchema = new mongoose.Schema({
    sqft : {
        type : {
            min : Number,
            max : Number
        }
    },
    lot_size : {
        type : {
            min : Number,
            max : Number
        }
    },
    year_built : {
        type : {
            min : Number,
            max : Number
        }
    },
    hoa_fee : {
        type : Number
    },
    swimming_pool : Boolean,
    air_conditioner : Boolean,
    heating : Boolean,
    gas : Boolean,
    for : {
        type : String
    },
    type : {
        type : String
    },
    range : {
        type : {
            from : Number,
            to : Number
        }
    },
    city :{
        type : String
    },
    zipcode: {
        type : String
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

const filterModel = mongoose.model('Filter',filterSchema);
module.exports = filterModel;