const mongoose = require('mongoose');
const moment = require('moment');

const timeStamps = () => {
    return moment().valueOf()
}

const proprtySchema = new mongoose.Schema({
    title: {
        type: String,
        default: "",
        trim: true
    },
    type: {
        type: String,
        default: "RENT"
    },
    no_of_bedrooms: {
        type: Number,
        default: 0
    },
    no_of_bathrooms: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    area_sqft: {
        type: Number,
        default: 0
    },
    property_type: {
        type: String,
        default: ""
    },
    gas: {
        type: Number,
        default: 0
    },
    swimming_pool: {
        type: Number,
        default: 0
    },
    air_conditioning: {
        type: Number,
        default: 0
    },
    heating: {
        type: Number,
        default: 0
    },
    lot_size: {
        type: Number,
        default: 0
    },
    hoa_fee: {
        type: Number,
        default: 0
    },
    address: {
        type: String,
        default: "",
        trim: true
    },
    location: {
        type: {
            default: {
                type: "Point",
                coordinates: [Number, Number]
            }
        }
    },
    city: {
        type: String,
        default: "",
        trim: true
    },
    zipcode: {
        type: String,
        default: "",
        trim: true
    },
    description: {
        type: String,
        default: "",
        trim: true
    },
    guidelines: {
        type: String,
        default: "",
        trim: true
    },
    attachments: {
        type: [String],
        default: []
    },
    hide_property: {
        type: Boolean,
        default: false
    },
    isHidden: {
        type: Boolean,
        default: false
    },
    userId: mongoose.Types.ObjectId,
    created_at: {
        type: Number,
        default: timeStamps()
    },
    updated_at: {
        type: Number,
        default: timeStamps()
    }
});

const propertyModel = mongoose.model('Property', proprtySchema);
module.exports = propertyModel;