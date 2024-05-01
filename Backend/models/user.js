const mongoose = require('mongoose');
const moment = require('moment');

const timeStamps = () => {
    return moment().valueOf()
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        default: ""
    },
    about: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: "USER"  //AGENT
    },
    profile_pic: {
        type: String,
        default : ""
    },
    license_number: {
        type: String
    },
    address: {
        type: String,
        default: ""
    },
    location: {
        type : Object,
        default : {
            type: "Point",
            coordinates: [Number, Number]
        }
    },
    contact: {
        type: String,
        default: ""
    },
    country_code: {
        type: String,
        default: ""
    },
    updates_and_newletter: {
        type: Number,
        default: 3 // 0 for off, 1 for only newsletter, 2 for only updates, 3 for both
    },
    device_token: {
        type: String,
        default: ""
    },
    device_type: {
        type: String,
        default: ""
    },
    app_version: {
        type: String,
        default: ""
    },
    device_model: {
        type: String,
        default: ""
    },
    login_type: {
        type: String,
        default: ""
    },
    social_id: {
        type: String,
        default: ""
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    x_token: {
        type: String,
        default: ""
    },
    frame : {
        type : Number,
        default : 0     // 0 for first fram  1 for second frame 2 for third frame
    },
    created_at: {
        type: Number,
        default: timeStamps()
    },
    updated_at: {
        type: Number,
        default: timeStamps()
    }
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;