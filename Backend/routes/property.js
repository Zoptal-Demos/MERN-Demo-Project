const express = require('express');
const router = express.Router();
const propertyControllers = require('../controllers/property');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path')

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_ID,
    secretAccessKey: process.env.SECRET_ID
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = `public`;
        cb(null, path);
    },
    filename: (req, file, cb) => {
        let mainpath = file.fieldname + '_' + Date.now()
            + file.originalname.replace(/ /g, "");
        req.body.image = mainpath
        cb(null, mainpath)
    }
});


const upload = multer({ storage: storage });

const authenticator = async (req, res, next) => {
    let tokenStr = req.headers['x_token'] || req.query['x_token'] || req.body.x_token;
    let readToken = await userModel.findOne({ x_token: tokenStr }, { name: 1, email: 1, contact: 1, country_code: 1, x_token: 1, role: 1 });
    if (!readToken) return res.send({ status: false, code: 203, message: 'Session expired, Please login again' })
    if (tokenStr == readToken.x_token) {
        jwt.verify(tokenStr, process.env.SECRET_KEY, function (err, result) {
            if (err) return res.status(203).send({ status: false, code: 203, message: 'Session expired, Please login again' })
            else {
                req.result = readToken;
                next();
            }
        });
    } else {
        return res.status(203).send({ status: false, code: 203, message: 'Session expired, Please login again' })
    }
}

const awsUploader = async (req, res, next) => {
    try {
        let deletable = [];
        let uploadedfiles = await Promise.all(req.files.map(async (element) => {
            let imagePath = element.path
            deletable.push(imagePath)
            const blob = fs.readFileSync(imagePath)
            const uploadedImage = await s3.upload({
                Key: element.originalname,
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Body: blob
            }).promise()
            return uploadedImage.Location
        }));
        // Promise.all(uploadedfiles)
        deleteFiles(deletable, (res) => {
            console.log("All files deleted successfull")
        });
        req.body.attachments = uploadedfiles
        next();
    } catch (err) {
        res.send({
            status: true,
            code: 201,
            message: "Internal Server error"
        });
    }
}

const deleteFiles = (files, callback) => {
    var i = files.length;
    files.forEach(function (filepath) {
        fs.unlink(path.join(__dirname, '../', filepath), function (err) {
            i--;
            if (err) {
                callback(err);
                return;
            } else if (i <= 0) {
                callback(null);
            }
        });
    });
}


const joiValidation = (req, res, next) => {

    const propertySchema = Joi.object({
        'title': Joi.string().trim().required(),
        'type': Joi.string().trim().required(),
        'no_of_bedrooms': Joi.number().required(),
        'no_of_bathrooms': Joi.number().required(),
        'price': Joi.number().required(),
        'area_sqft': Joi.number().required(),
        'property_type': Joi.string().trim().required(),
        'gas': Joi.number().required(),
        'swimming_pool': Joi.number().required(),
        'air_conditioning': Joi.number().required(),
        'heating': Joi.number().required(),
        'lot_size': Joi.number().required(),
        'hoa_fee': Joi.number().required(),
        'latitude': Joi.number().required(),
        'longitude': Joi.number().required(),
        'address': Joi.string().trim().required(),
        'city': Joi.string().trim().lowercase().required(),
        'zipcode': Joi.string().min(6).max(6).required(),
        'description': Joi.string().trim().required(),
        'guidelines': Joi.string().trim().required(),
        'attachments': Joi.any().required()
    });

    const getpropertySchema = Joi.object({
        'skip': Joi.number().required().default(0),
        'limit': Joi.number().required().min(1).default(5),
        'isHidden': Joi.boolean().required().default(false)
    });

    const getallpropertySchema = Joi.object({
        'skip': Joi.number().required().default(0),
        'limit': Joi.number().required().min(1).default(5),
        'isFiltered': Joi.boolean().required(),
        'sqft_min': Joi.number().optional(),
        'sqft_max': Joi.number().optional(),
        'lot_size_min': Joi.number().optional(),
        'lot_size_max': Joi.number().optional(),
        'year_built_min': Joi.number().optional(),
        'year_built_max': Joi.number().optional(),
        'hoa_fee': Joi.number().optional(),
        'swimming_pool': Joi.boolean().optional(),
        'air_conditioner': Joi.boolean().optional(),
        'heating': Joi.boolean().optional(),
        'gas': Joi.boolean().optional(),
        'for': Joi.string().optional().allow(''),
        'type': Joi.string().optional().allow(''),
        'range_from': Joi.number().optional(),
        'range_to': Joi.number().optional(),
        'city': Joi.string().lowercase().optional().allow(''),
        'zipcode': Joi.string().min(6).max(6).optional()
    });

    const commentSchema = Joi.object({
        'comment': Joi.string().required(),
        'propertyId': Joi.string().required()
    });

    const getCommentSchema = Joi.object({
        'skip': Joi.number().default(0).required(),
        'limit': Joi.number().required(),
        'id': Joi.string().min(24).max(24).required()
    });

    const editCommentSchema = Joi.object({
        'comment': Joi.string().required()
    });

    //schema options 
    const options = { abortEarly: false, allowUnknown: true, stripUknown: true }
    //paths
    if (req.path == '/addProperty') var { error, value } = propertySchema.validate(req.body, options)
    if (req.path == '/comments') var { error, value } = getCommentSchema.validate(req.query, options)
    if (req.path == '/getMyProperities') var { error, value } = getpropertySchema.validate(req.query, options)
    if (req.path == '/getAllProperities') var { error, value } = getallpropertySchema.validate(req.query, options)
    if (req.path == '/addComment') var { error, value } = commentSchema.validate(req.body, options)
    if (req.path == '/editComment') var { error, value } = editCommentSchema.validate(req.body, options)
    //error handling
    if (error) {
        return res.json({ status: false, code: 201, message: `${error.details.map(x => x.message.replace(/"/g, ''))[0]}` })
    } else {
        req.body = value;
        next();
    }
}

router.post('/addProperty', authenticator, upload.array('attachments'), awsUploader, joiValidation, propertyControllers.add_property);
router.get('/getMyProperities', authenticator, joiValidation, propertyControllers.get_property);
router.get('/comments', authenticator, joiValidation, propertyControllers.getComments);
router.get('/getAllProperities', (req, res, next) => { req.headers['x_token'] ? authenticator(req, res, next) : next() }, joiValidation, propertyControllers.get_all_property);
router.get('/getPropertyDetails/:id', authenticator, propertyControllers.get_property_details);
router.post('/addComment', authenticator, joiValidation, propertyControllers.add_comment);
router.patch('/editComment/:id', authenticator, joiValidation, propertyControllers.edit_comment);
router.delete('/deleteComment/:id', authenticator, propertyControllers.delete_comment);
router.patch('/hideShowProperty/:id', authenticator, propertyControllers.hide_show_property);

module.exports = router;