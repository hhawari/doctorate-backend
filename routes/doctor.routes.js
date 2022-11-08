const express = require('express');
const jwt = require('jsonwebtoken')
const doctorRoute = express.Router();
let doctorSchema = require('../model/doctor.model');

//  Middleware to Verify Token
function verifyToken(req, res, next) {
    if (!req.headers.autherization) {
        return re.status(401).send('Unautherized request')
    }
    let token = req.headers.autherization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unautherized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unautherized request')
    }
    req.userId = payload.subject
    next()
}

////////////////////////////// $Doctor //////////////////////////////
doctorRoute.route('/').get((req, res, next) => {
    doctorSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

/////////////////////////// GET /////////////////////////
doctorRoute.route('/doctor/:id').get((req, res, next) => {
    doctorSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

////////////////// POST (ADD) //////////////// WORKED
doctorRoute.route('/doctor').post((req, res, next) => {
    doctorSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//////////////////// PUT ////////////////// req.body,
doctorRoute.route('/doctor/:id').put((req, res, next) => {
    doctorSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
            console.log('Updated Successfully')
        }
    })
})

//////////////////// DELETE //////////////////
doctorRoute.route('/doctor/:id').delete((req, res, next) => {
    doctorSchema.findByIdAndRemove(req.params.id, (error, data) => {
        console.log(req.params.id)
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

////////////////// POST (ADD) //////////////// WORKED
doctorRoute.route('/doctor').post((req, res, next) => {
    doctorSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = doctorRoute;
