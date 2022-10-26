const express = require('express');
const app = express();
const doctorRoute = express.Router();
let doctorSchema = require('../model/doctor.model');

doctorRoute.route('/').get((req, res) => {
    doctorSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//////////////////// GET ////////////////// WORKED
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
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = doctorRoute;
