const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const authenticator = async (req, res, next) => {
  let tokenStr = req.headers['x_token'] || req.query['x_token'] || req.body.x_token;
  let readToken = await userModel.findOne({ x_token: tokenStr }, { name: 1, email: 1, contact: 1, country_code: 1, x_token: 1, role: 1 });
  if (!readToken) return res.send({ status: false, code: 203, message: 'Session expired, Please login again' })
  if (tokenStr == readToken.x_token) {
    jwt.verify(tokenStr, secretkey, function (err, result) {
      if (err) return res.status(203).send({ status: false, code: 203, message: 'Session expired, Please login again' })

      else {
        req.result = readToken;
        next();
      }
    })
  } else {
    return res.status(203).send({ status: false, code: 203, message: 'Session expired, Please login again' })
  }
}


const joiValidation = (req, res, next) => {
  const userSchema = Joi.object({
    'name': Joi.string().trim().required(),
    'email': Joi.string().trim().email().required(),
    'password': Joi.string().required(),
    'country_code': Joi.string().required(),
    'contact': Joi.string().pattern(/^[0-9]+$/).required(),
    'address': Joi.string().optional().allow(''),
    'latitude': Joi.number().optional(),
    'longitude': Joi.number().optional(),
    'about': Joi.string().optional().allow(''),
    'role': Joi.string().required().valid("USER", "AGENT"),
    'license_number': Joi.string().optional(),
    'device_token': Joi.string().required(),
    'device_type': Joi.string().required(),
    'app_version': Joi.string().required(),
    'device_model': Joi.string().required(),
    'social_id': Joi.string().optional().allow('')
  });
  const socialSchema = Joi.object({
    'name': Joi.string().trim().required(),
    'email': Joi.string().trim().email().required(),
    'address': Joi.string().optional().allow(''),
    'latitude': Joi.number().optional(),
    'longitude': Joi.number().optional(),
    'role': Joi.string().required().valid("USER", "AGENT"),
    'login_type': Joi.string().required().valid("NORMAL", "GOOGLE", "FACEBOOK"),
    'license_number': Joi.string().optional(),
    'device_token': Joi.string().required(),
    'device_type': Joi.string().required(),
    'app_version': Joi.string().required(),
    'device_model': Joi.string().required(),
    'social_id': Joi.string().required()
  });
  const loginSchema = Joi.object({
    'email': Joi.string().trim().email().required(),
    'password': Joi.string().trim().required(),
    'latitude': Joi.number().optional(),
    'longitude': Joi.number().optional(),
    'login_type': Joi.string().required().valid("NORMAL"),
    'device_token': Joi.string().required(),
    'device_type': Joi.string().required(),
    'app_version': Joi.string().required(),
    'device_model': Joi.string().required()
  });
  const agentSchema = Joi.object({
    'license_number' : Joi.string().required().min(9).max(9),
    'city' : Joi.string().required(),
    'zipcode' : Joi.string().required(),
    'address': Joi.string().optional().allow(''),
    'latitude': Joi.number().optional(),
    'longitude': Joi.number().optional(),
    'company_details' : Joi.object({
      'name' : Joi.string().required(),
      'website' : Joi.string().optional(),
      'contact' : Joi.string().optional(),
      'address' : Joi.string().optional().allow(''),
      'latitude': Joi.number().optional(),
      'longitude': Joi.number().optional(),
      'city' : Joi.string().required(),
      'zipcode' : Joi.string().required(),
    }).required()
  });
  const otpSchema = Joi.object({
    'email' : Joi.string().required(),
    'otp' : Joi.string().required(),
    })
  
  //schema options 
  const options = { abortEarly: false, allowUnknown: true, stripUknown: true }
  //paths
  if (req.path == '/register') var { error, value } = userSchema.validate(req.body, options)
  if (req.path == '/socialLogin') var { error, value } = socialSchema.validate(req.body, options)
  if (req.path == '/login') var { error, value } = loginSchema.validate(req.body, options)
  if (req.path == '/updateLicense') var { error, value } = agentSchema.validate(req.body, options)
  if (req.path == '/verifyOtp') var { error, value } = otpSchema.validate(req.body, options)
  //error handling
  if (error) {
    return res.json({ status: false, code: 201, message: `${error.details.map(x => x.message.replace(/"/g, ''))[0]}` })
  } else {
    req.body = value;
    next();
  }
}

router.post('/register', joiValidation, userControllers.register);
router.post('/login', joiValidation, userControllers.login);
router.post('/socialLogin', joiValidation, userControllers.social_login);
router.post('/verifyOtp', joiValidation, userControllers.verifyOtp);
router.post('/recoverAccount', userControllers.recover_account);
router.post('/verifyChangePassword', userControllers.verify_change_password);
router.patch('/updateLicense',joiValidation, authenticator,(req,res,next)=>{req.result.role === 'AGENT' ? next() : res.send({status : false,code : 401,message : "You are not an agent"})},userControllers.updateLicense);
module.exports = router;