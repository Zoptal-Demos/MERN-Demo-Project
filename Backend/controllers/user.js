const userModel = require('../models/user');
const otpModel = require('../models/otp');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const commonFunctions = require('../config/commonFunctions')

const userControllers = {
    register: async (req, res) => {
        try {
            let body = req.body
            body.location = {
                type: "Point",
                coordinates: [body.latitude, body.longitude]
            }
            //checking email exist
            let emailExists = await userModel.findOne({ email: body.email });
            if (emailExists != null) {
                res.send({
                    status: false,
                    code: 201,
                    message: "Email Already Exists"
                });
            } else {
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(body.password, salt, async (err, hash) => {
                        if (err) {
                            res.send({
                                status: false,
                                code: 201,
                                message: err.message
                            });
                        } else {
                            body.password = hash
                            const user = await userModel.findOneAndUpdate({ email: body.email }, { $set: body }, { lean: true, upsert: true, new: true, setDefaultsOnInsert: true });
                            if (user != null) {
                                let token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
                                if (token) {
                                    const updated = await userModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(user._id) }, { $set: { x_token: token } },{ lean : true, upsert : true, new : true});
                                    if (updated) {
                                        delete updated.password
                                    }
                                    res.send({
                                        status: true,
                                        code: 200,
                                        message: "Registration Successful",
                                        data: updated
                                    });
                                } else {
                                    res.send({
                                        status: false,
                                        code: 201,
                                        message: "Token could not generated"
                                    });
                                }
                            } else {
                                res.send({
                                    status: false,
                                    code: 201,
                                    message: "Registration could not be completed"
                                });
                            }
                        }
                    });
                });
            }
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            })
        }
    },
    social_login: async (req, res) => {
        try {
            let body = req.body
            body.location = {
                type: "Point",
                coordinates: [body.latitude, body.longitude]
            }
            //checking email exist
            let emailExists = await userModel.findOne({ email: body.email });
            if (emailExists != null) {
                res.send({
                    status: false,
                    code: 201,
                    message: "Email Already Exists"
                });
            } else {
                body.email_verified = true
                const user = await userModel.findOneAndUpdate({ email: body.email }, { $set: body }, { lean: true, upsert: true, new: true, setDefaultsOnInsert: true });
                if (user != null) {
                    let token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
                    if (token) {
                        const updated = await userModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(user._id) }, { $set: { x_token: token } });
                        if (updated) {
                            delete updated.password
                        }
                        res.send({
                            status: true,
                            code: 200,
                            message: "Registration Successful",
                            data: updated
                        });
                    } else {
                        res.send({
                            status: false,
                            code: 201,
                            message: "Token could not generated"
                        });
                    }
                } else {
                    res.send({
                        status: false,
                        code: 201,
                        message: "Registeration could not be completed"
                    });
                }
            }
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            })
        }
    },
    verifyOtp: async (req, res) => {
        try {
            let body = req.body
            console.log(body,'1')
            const email = await otpModel.findOne({email: body.email, otp: body.otp})
            console.log(email, "email")
            if(!email) res.send({status: false,code: 201, message: "Invalid otp"})
            console.log('2')
            await otpModel.deleteMany({email: body.email})
            console.log('3')
            res.send({status: true, code:200, message: "Otp verified successfully"})
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            })
        }
    },
    login: async (req, res) => {
        try {
            let body = req.body
            body.location = {
                type: "Point",
                coordinates: [body.latitude, body.longitude]
            }
            //checking email exist
            let emailExists = await userModel.findOne({ email: body.email }, { email: 1, password: 1 });
            if (emailExists == null) {
                res.send({
                    status: false,
                    code: 201,
                    message: "Account does not exists"
                });
            } else {
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(body.password, salt, async (err, hash) => {
                        if (err) {
                            res.send({
                                status: false,
                                code: 201,
                                message: "Internal Server Error"
                            });
                        } else {
                            if (emailExists.password === hash) {
                                let token = jwt.sign({ _id: emailExists._id }, process.env.SECRET_KEY);
                                body.x_token = token;
                                await userModel.findOneAndUpdate({ email: body.email }, { $set: body }, { lean: true, upsert: true });
                                res.send({
                                    status: true,
                                    code: 200,
                                    message: "Successfully Logged In"
                                });
                            }else{
                                res.send({
                                    status: false,
                                    code: 201,
                                    message: "Wrong Password"
                                });
                            }
                        }
                    });
                });
            }
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            })
        }
    },
    recover_account: async (req, res) => {
        try {
            let body = req.body
            //checking email exist
            console.log(body, "doby")
            let accountExists = await userModel.findOne({ email: body.email });
            if (accountExists == null) {
                res.send({
                    status: false,
                    code: 201,
                    message: "Account does not exists" 
                });
            } else {
                let otp = Math.floor(Math.random(6) * 10000) + ""
                commonFunctions.sendMail(accountExists.email, "RECOVER ACCOUNT", "Your OTP is " + otp);
                console.log(otp, "otp")
                await otpModel.findOneAndUpdate({email: body.email }, { $set: { otp } }, { new: true, upsert: true, lean: true, setDefaultsOnInsert: true });
                res.send({
                    status: true,
                    code: 200,
                    message: "Verification password has been sent to your email"
                });
            }
        } catch (err) {
            console.log(err, "err")
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            });
        }
    },
    verify_change_password: async (req, res) => {
        try {
            let body = req.body
            //checking email exist
            
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(body.password, salt, async(err, hash) => {
                        if (err) {
                            res.send({
                                status : false,
                                code : 201,
                                message : "Internal server error"
                            });
                        } else {
                            await userModel.findOneAndUpdate({ email: body.email }, { $set: { password: hash } }, { upsert: true, lean: true });
                            res.send({
                                status: true,
                                code: 200,
                                message: "Account recover successfully, Please login"
                            });
                        }
                    })
                })
            
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            });
        }
    },
    updateLicense: async (req, res) => {
        try {
            let body = req.body
            //checking email exist
            let updated = await userModel.findOneAndUpdate({ _id : ObjectId(req.result.id) },{$set : body});
            if (updated != null) {
                res.send({
                    status: true,
                    code: 200,
                    message: "License updated successfully"
                });
            }else{
                res.send({
                    status : false,
                    code : 201,
                    message : "License could not update"
                })
            }
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            });
        }
    }
}

module.exports = userControllers