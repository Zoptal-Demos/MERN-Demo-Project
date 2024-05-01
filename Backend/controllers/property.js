const userModel = require('../models/user');
const propertyModel = require('../models/property');
const commentModel = require('../models/comment');
const filterModel = require('../models/filter');
const jwt = require('jsonwebtoken');
const imageSearch = require('image-search-google');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const gis = require('async-g-i-s');
const mongoose = require('mongoose');
const commonFunctions = require('../config/commonFunctions')
const {ObjectId} = require('mongodb');
const moment = require('moment');

const propertyControllers = {
    add_property: async (req, res) => {
        try {
            let body = req.body
            body.location = {
                type: "Point",
                coordinates: [body.latitude, body.longitude]
            }
            body.userId = req.result._id
            let property = await propertyModel(body).save();
            res.send({
                status: true,
                code: 200,
                message: "Property added successfully",
                data: property
            })
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            })
        }
    },
    get_property: async (req, res) => {
        try {
            let userId = req.result._id
            let query = [{
                '$match': {
                    'userId': ObjectId(userId),
                    'isHidden': req.query.isHidden === 'true' || req.query.isHidden === true ? true : false
                }
            }, {
                '$lookup': {
                    'from': 'comments',
                    'let': {
                        'id': '$_id'
                    },
                    'pipeline': [{
                        '$match': {
                            '$expr': {
                                '$eq': [
                                    '$propertyId', '$$id'
                                ]
                            }
                        }
                    }, {
                        '$lookup': {
                            'from': 'users',
                            'localField': 'userId',
                            'foreignField': '_id',
                            'as': 'details'
                        }
                    }, {
                        '$unwind': {
                            'path': '$details',
                            'includeArrayIndex': 'index',
                            'preserveNullAndEmptyArrays': false
                        }
                    }, {
                        '$project': {
                            'comment': 1,
                            'name': '$details.name',
                            'userId': '$details._id',
                            'updated_at': 1
                        }
                    }, {
                        '$limit': 5
                    }],
                    'as': 'comments'
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'let': {
                        'id': '$userId'
                    },
                    'pipeline': [{
                        '$match': {
                            '$expr': {
                                '$eq': [
                                    '$_id', '$$id'
                                ]
                            }
                        }
                    }, {
                        '$project': {
                            'name': 1,
                            'profile_pic': 1
                        }
                    }],
                    'as': 'user_details'
                }
            }, {
                '$unwind': {
                    'path': '$user_details',
                    'includeArrayIndex': 'index',
                    'preserveNullAndEmptyArrays': false
                }
            }, {
                '$lookup': {
                    'from': 'comments',
                    'let': {
                        'id': '$_id'
                    },
                    'pipeline': [{
                        '$match': {
                            '$expr': {
                                '$eq': [
                                    '$propertyId', '$$id'
                                ]
                            }
                        }
                    }],
                    'as': 'commentsCount'
                }
            }, {
                '$addFields': {
                    'commentsCount': {
                        '$size': '$commentsCount'
                    }
                }
            }, {
                '$project': {
                    '__v': 0,
                    'index': 0
                }
            }];

            let properties = await propertyModel.aggregate(query).sort({
                _id: -1
            }).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit));
            let total_records = await propertyModel.count({
                userId: ObjectId(userId),
                isHidden: req.query.isHidden ? true : false
            })
            res.send({
                status: true,
                code: 200,
                message: "Properties fetched successfully",
                total_records,
                data: properties
            });
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            });
        }
    },
    get_all_property: async (req, res) => {
        try {
            if (req.body.isFiltered) {
                let body = req.body
                let filter = new Object();
                let sqft = {}
                let lot_size = {}
                let year_built = {}
                let range = {}
                let matchQuery = {
                    isHidden: false
                }
                if (body.sqft_min) {
                    if (body.sqft_min > 0) {
                        sqft.min = parseInt(body.sqft_min)
                        filter.sqft = {
                            ...sqft
                        }
                        matchQuery.area_sqft = {
                            ...matchQuery.area_sqft,
                            '$gte': parseInt(body.sqft_min)
                        }
                    }
                }
                if (body.sqft_max) {
                    if (body.sqft_max > 0) {
                        sqft.max = parseInt(body.sqft_max)
                        filter.sqft = {
                            ...sqft
                        }
                        matchQuery.area_sqft = {
                            ...matchQuery.area_sqft,
                            '$lte': parseInt(body.sqft_max)
                        }
                    }
                }
                if (body.lot_size_min) {
                    if (body.lot_size_min > 0) {
                        lot_size.min = parseInt(body.lot_size_min)
                        filter.lot_size = {
                            ...lot_size
                        }
                        matchQuery.lot_size = {
                            ...matchQuery.lot_size,
                            '$gte': parseInt(body.lot_size_min)
                        }
                    }
                }
                if (body.lot_size_max) {
                    if (body.lot_size_max > 0) {
                        lot_size.max = parseInt(body.lot_size_max)
                        filter.lot_size = {
                            ...lot_size
                        }
                        matchQuery.lot_size = {
                            ...matchQuery.lot_size,
                            '$lte': parseInt(body.lot_size_max)
                        }
                    }
                }
                if (body.year_built_min) {
                    if (body.year_built_min > 0) {
                        year_built.min = parseInt(body.year_built_min)
                        filter.year_built = {
                            ...year_built
                        }
                        matchQuery.year_built = {
                            ...matchQuery.year_built,
                            '$gte': parseInt(body.year_built_min)
                        }
                    }
                }
                if (body.year_built_max) {
                    if (body.year_built_max > 0) {
                        year_built.max = parseInt(body.year_built_max)
                        filter.year_built = {
                            ...year_built
                        }
                        matchQuery.year_built = {
                            ...matchQuery.year_built,
                            '$lte': parseInt(body.year_built_max)
                        }
                    }
                }
                if (body.hoa_fee) {
                    if (body.hoa_fee > 0) {
                        filter.hoa_fee = parseInt(body.hoa_fee)
                        matchQuery.hoa_fee = {
                            '$gte': parseInt(body.hoa_fee)
                        }
                    }
                }
                if (body.swimming_pool) {
                    filter.swimming_pool = body.swimming_pool
                    matchQuery.swimming_pool = {
                        '$gt': 0
                    }
                }

                if (body.air_conditioner) {
                    filter.air_conditioner = body.air_conditioner
                    matchQuery.air_conditioning = {
                        '$gt': 0
                    }
                }

                if (body.heating) {
                    filter.heating = body.heating
                    matchQuery.heating = {
                        '$gt': 0
                    }
                }

                if (body.gas) {
                    filter.gas = body.gas
                    matchQuery.gas = {
                        '$gt': 0
                    }
                }

                if (body.for) {
                    if (body.for.trim() != '') {
                        filter.for = body.for
                        matchQuery.property_type = {
                            '$eq': body.for
                        }
                    }
                }
                if (body.type) {
                    if (body.type && body.type.trim() != '') {
                        filter.type = body.type
                        matchQuery.type = {
                            '$eq': body.type
                        }
                    }
                }
                if (body.range_from) {
                    if (body.range_from > 0) {
                        range.from = parseInt(body.range_from)
                        filter.range = {
                            ...range
                        }
                        matchQuery.price = {
                            ...matchQuery.price,
                            '$gte': parseInt(body.range_from)
                        }
                    }
                }
                if (body.range_to) {
                    if (body.range_to > 0) {
                        range.to = parseInt(body.range_to)
                        filter.range = {
                            ...range
                        }
                        matchQuery.price = {
                            ...matchQuery.price,
                            '$lte': parseInt(body.range_to)
                        }
                    }
                }
                if (body.city) {
                    if (body.city.trim() != '') {
                        filter.city = body.city
                        matchQuery.city = body.city
                    }
                }
                if (body.zipcode) {
                    filter.zipcode = body.zipcode + ""
                    matchQuery.zipcode = body.zipcode + ""
                }
                if (req.result != undefined) {
                    filter.userId = req.result.id
                    filter.updated_at = moment().valueOf()
                    let count = await filterModel.count({
                        userId: req.result._id
                    });
                    if (count >= 10) {
                        await filterModel.findOneAndUpdate({
                            userId: ObjectId(req.result._id)
                        }, {
                            $set: filter
                        }).sort({
                            updated_at: 1
                        });
                    } else {
                        new filterModel(filter).save();
                    }
                }
                // deleteing year build for now
                delete matchQuery.year_built
                let query = [{
                    '$match': matchQuery
                }, {
                    '$lookup': {
                        'from': 'comments',
                        'let': {
                            'id': '$_id'
                        },
                        'pipeline': [{
                            '$match': {
                                '$expr': {
                                    '$eq': [
                                        '$propertyId', '$$id'
                                    ]
                                }
                            }
                        }, {
                            '$lookup': {
                                'from': 'users',
                                'localField': 'userId',
                                'foreignField': '_id',
                                'as': 'details'
                            }
                        }, {
                            '$unwind': {
                                'path': '$details',
                                'includeArrayIndex': 'index',
                                'preserveNullAndEmptyArrays': false
                            }
                        }, {
                            '$project': {
                                'comment': 1,
                                'name': '$details.name',
                                'userId': '$details._id',
                                'updated_at': 1
                            }
                        }, {
                            '$limit': 5
                        }],
                        'as': 'comments'
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'let': {
                            'id': '$userId'
                        },
                        'pipeline': [{
                            '$match': {
                                '$expr': {
                                    '$eq': [
                                        '$_id', '$$id'
                                    ]
                                }
                            }
                        }, {
                            '$project': {
                                'name': 1,
                                'profile_pic': 1
                            }
                        }],
                        'as': 'user_details'
                    }
                }, {
                    '$lookup': {
                        'from': 'filters',
                        'let': {},
                        'pipeline': [{
                            '$sort': {
                                'updated_at': 1
                            }
                        }, {
                            '$group': {
                                '_id': '$city',
                                'name': {
                                    '$push': '$city'
                                }
                            }
                        }, {
                            '$project': {
                                'length': {
                                    '$size': '$name'
                                }
                            }
                        }, {
                            '$sort': {
                                'length': -1
                            }
                        }, {
                            '$project': {
                                'name': '$_id',
                                '_id': 0
                            }
                        }, {
                            '$limit': 4
                        }],
                        'as': 'cities'
                    }
                }, {
                    '$unwind': {
                        'path': '$user_details',
                        'includeArrayIndex': 'index',
                        'preserveNullAndEmptyArrays': false
                    }
                }, {
                    '$lookup': {
                        'from': 'comments',
                        'let': {
                            'id': '$_id'
                        },
                        'pipeline': [{
                            '$match': {
                                '$expr': {
                                    '$eq': [
                                        '$propertyId', '$$id'
                                    ]
                                }
                            }
                        }],
                        'as': 'commentsCount'
                    }
                }, {
                    '$addFields': {
                        'commentsCount': {
                            '$size': '$commentsCount'
                        }
                    }
                }, {
                    '$project': {
                        '__v': 0,
                        'index': 0
                    }
                }]
                let properties = await propertyModel.aggregate(query).sort({
                    _id: -1
                }).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit));
                let total_records = await propertyModel.count({
                    isHidden: false
                })
                res.send({
                    status: true,
                    code: 200,
                    message: "Properties fetched successfully",
                    total_records,
                    data: properties
                });
            } else {
                let query = [{
                    '$match': {
                        'isHidden': false
                    }
                }, {
                    '$lookup': {
                        'from': 'comments',
                        'let': {
                            'id': '$_id'
                        },
                        'pipeline': [{
                            '$match': {
                                '$expr': {
                                    '$eq': [
                                        '$propertyId', '$$id'
                                    ]
                                }
                            }
                        }, {
                            '$lookup': {
                                'from': 'users',
                                'localField': 'userId',
                                'foreignField': '_id',
                                'as': 'details'
                            }
                        }, {
                            '$unwind': {
                                'path': '$details',
                                'includeArrayIndex': 'index',
                                'preserveNullAndEmptyArrays': false
                            }
                        }, {
                            '$project': {
                                'comment': 1,
                                'name': '$details.name',
                                'userId': '$details._id',
                                'updated_at': 1
                            }
                        }, {
                            '$limit': 5
                        }],
                        'as': 'comments'
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'let': {
                            'id': '$userId'
                        },
                        'pipeline': [{
                            '$match': {
                                '$expr': {
                                    '$eq': [
                                        '$_id', '$$id'
                                    ]
                                }
                            }
                        }, {
                            '$project': {
                                'name': 1,
                                'profile_pic': 1
                            }
                        }],
                        'as': 'user_details'
                    }
                }, {
                    '$unwind': {
                        'path': '$user_details',
                        'includeArrayIndex': 'index',
                        'preserveNullAndEmptyArrays': false
                    }
                }, {
                    '$lookup': {
                        'from': 'comments',
                        'let': {
                            'id': '$_id'
                        },
                        'pipeline': [{
                            '$match': {
                                '$expr': {
                                    '$eq': [
                                        '$propertyId', '$$id'
                                    ]
                                }
                            }
                        }],
                        'as': 'commentsCount'
                    }
                }, {
                    '$addFields': {
                        'commentsCount': {
                            '$size': '$commentsCount'
                        }
                    }
                }, {
                    '$project': {
                        '__v': 0,
                        'index': 0
                    }
                }]
                let properties = await propertyModel.aggregate(query).sort({
                    _id: -1
                }).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit));
                let total_records = await propertyModel.countDocuments({
                    isHidden: false
                });
                query = [{
                    '$sort': {
                        'updated_at': 1
                    }
                }, {
                    '$group': {
                        '_id': '$city',
                        'name': {
                            '$push': '$city'
                        }
                    }
                }, {
                    '$project': {
                        'length': {
                            '$size': '$name'
                        }
                    }
                }, {
                    '$sort': {
                        'length': -1
                    }
                }, {
                    '$project': {
                        'name': '$_id',
                        '_id': 0
                    }
                }, {
                    '$limit': 4
                }]
                let citynamelist = await filterModel.aggregate(query);
                const cities = await Promise.all(citynamelist.map(async (element)=>{
                    const results = await gis("famous of new "+element.name);
                    return {...element,image_link : results.slice(0, 2)[0].url.startsWith('https://dynamic-media') ? results.slice(0, 2)[1].url : results.slice(0, 2)[0].url}
                }));
                res.send({
                    status: true,
                    code: 200,
                    message: "Properties fetched successfully",
                    total_records,
                    data: {
                        properties,
                        cities
                    }
                });
            }
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            });
        }
    },
    add_comment: async (req, res) => {
        try {
            let body = req.body
            body.userId = req.result.id
            let comment = await commentModel(body).save();
            res.send({
                status: true,
                code: 200,
                message: "Comment added successfully",
                data: comment
            })
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            })
        }
    },
    edit_comment: async (req, res) => {
        try {
            let body = req.body
            let comment = await commentModel.findOneAndUpdate({
                _id: ObjectId(req.params.id),
                userId: ObjectId(req.result.id)
            }, {
                $set: body
            });
            if (comment) {
                res.send({
                    status: true,
                    code: 200,
                    message: "Comment added successfully"
                })
            } else {
                res.send({
                    status: false,
                    code: 201,
                    message: "Not your comment"
                })
            }
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            })
        }
    },
    delete_comment: async (req, res) => {
        try {
            let comment = await commentModel.findOneAndDelete({
                _id: ObjectId(req.params.id),
                userId: ObjectId(req.result.id)
            });
            if (comment) {
                res.send({
                    status: true,
                    code: 200,
                    message: "Comment deleted successfully"
                })
            } else {
                res.send({
                    status: false,
                    code: 201,
                    message: "Not your comment"
                })
            }
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            })
        }
    },
    get_property_details: async (req, res) => {
        try {
            let propertyId = req.params.id
            let query = [{
                '$match': {
                    '_id': ObjectId(propertyId)
                }
            }, {
                '$lookup': {
                    'from': 'comments',
                    'let': {
                        'id': '$_id'
                    },
                    'pipeline': [{
                        '$match': {
                            '$expr': {
                                '$eq': [
                                    '$propertyId', '$$id'
                                ]
                            }
                        }
                    }, {
                        '$lookup': {
                            'from': 'users',
                            'localField': 'userId',
                            'foreignField': '_id',
                            'as': 'details'
                        }
                    }, {
                        '$unwind': {
                            'path': '$details',
                            'includeArrayIndex': 'index',
                            'preserveNullAndEmptyArrays': false
                        }
                    }, {
                        '$project': {
                            'comment': 1,
                            'name': '$details.name',
                            'userId': '$details._id',
                            'updated_at': 1
                        }
                    }, {
                        '$limit': 5
                    }],
                    'as': 'comments'
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'let': {
                        'id': '$userId'
                    },
                    'pipeline': [{
                        '$match': {
                            '$expr': {
                                '$eq': [
                                    '$_id', '$$id'
                                ]
                            }
                        }
                    }, {
                        '$project': {
                            'name': 1,
                            'profile_pic': 1
                        }
                    }],
                    'as': 'user_details'
                }
            }, {
                '$unwind': {
                    'path': '$user_details',
                    'includeArrayIndex': 'index',
                    'preserveNullAndEmptyArrays': false
                }
            }, {
                '$lookup': {
                    'from': 'comments',
                    'let': {
                        'id': '$_id'
                    },
                    'pipeline': [{
                        '$match': {
                            '$expr': {
                                '$eq': [
                                    '$propertyId', '$$id'
                                ]
                            }
                        }
                    }],
                    'as': 'commentsCount'
                }
            }, {
                '$addFields': {
                    'commentsCount': {
                        '$size': '$commentsCount'
                    }
                }
            }, {
                '$project': {
                    '__v': 0,
                    'index': 0
                }
            }]
            let properties = await propertyModel.aggregate(query).sort({
                _id: -1
            });
            if (properties.length === 0) {
                res.send({
                    status: true,
                    code: 200,
                    message: "No property found"
                });
            } else {
                res.send({
                    status: true,
                    code: 200,
                    message: "Properties details fetched successfully",
                    data: properties[0]
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
    hide_show_property: async (req, res) => {
        try {
            let property = await propertyModel.findOneAndUpdate({
                _id: ObjectId(req.params.id),
                userId: ObjectId(req.result._id)
            }, [{
                $set: {
                    isHidden: {
                        $not: "$isHidden"
                    }
                }
            }]);
            if (property != null) {
                res.send({
                    status: true,
                    code: 200,
                    message: property.isHidden ? "Property unhide successfully" : "Property hide successfully"
                })
            } else {
                res.send({
                    status: false,
                    code: 201,
                    message: "No Property found"
                })
            }

        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            })
        }
    },
    getComments: async (req, res) => {
        try {
            let propertyId = req.query.id
            let query = {
                propertyId: ObjectId(propertyId)
            }
            let comments = await commentModel.find(query).sort({
                _id: -1
            }).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit));
            let total_records = await commentModel.countDocuments(query)
            res.send({
                status: true,
                code: 200,
                message: "Comments fetched successfully",
                total_records,
                data: comments
            });
        } catch (err) {
            res.send({
                status: false,
                code: 400,
                message: "Internal Server error"
            });
        }
    }
}

module.exports = propertyControllers