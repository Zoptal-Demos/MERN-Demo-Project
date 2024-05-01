const express = require('express');
const router = express.Router();
const pageController = require('../controllers/page');
const pageModel = require('../models/pages');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const authenticator = async (req, res, next) => {
  let tokenStr = req.headers['x_token'] || req.query['x_token'] || req.body.x_token;
  let readToken = await pageModel.findOne({ x_token: tokenStr }, { name: 1, email: 1, contact: 1, country_code: 1, x_token: 1, role: 1 });
  if (!readToken) return res.send({ status: false, code: 203, message: 'Session expired, Please login again' })
  if (tokenStr == readToken.x_token) {
    jwt.verify(tokenStr, secretkey, function (err, result) {
      if (err) return res.status(203).send({ status: false, code: 203, message: 'Session expired, Please login again' })

      else {
        req.result = readToken;
        if(req.result.role == 'ADMIN'){
          next();
        }else{
          res.status(401).send({ status: false, code: 401, message: 'You are not authorized user for access pages' })
        }
      }
    })
  } else {
    return res.status(203).send({ status: false, code: 203, message: 'Session expired, Please login again' })
  }
}


const joiValidation = (req, res, next) => {
  
  const pageSchema = Joi.object({
    'type': Joi.number().valid(1,2,3).required()
  });

  const helpAndSupport = Joi.object({
    'userId': Joi.string().min(24).max(24).required(),
    'query' : Joi.string().required()
  });

  //schema options 
  const options = { abortEarly: false, allowUnknown: true, stripUknown: true }
  //paths
  if (req.path == '/updatePage') var { error, value } = pageSchema.validate(req.body, options)
  if (req.path == '/helpAndSupport') var { error, value } = helpAndSupport.validate(req.body, options)
  //error handling
  if (error) {
    return res.json({ status: false, code: 201, message: `${error.details.map(x => x.message.replace(/"/g, ''))[0]}` })
  } else {
    req.body = value;
    next();
  }
}

router.get('/terms-and-conditions', pageController.terms);
router.get('/privacy-and-policy', pageController.privacy);
router.get('/about', pageController.about);
router.patch('/updatePage/:type', authenticator,joiValidation ,pageController.updatePage);
router.post('/helpAndSupport', authenticator,joiValidation ,pageController.helpAndSupport);

module.exports = router;