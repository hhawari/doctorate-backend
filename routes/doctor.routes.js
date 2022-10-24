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

//////////////////// GET //////////////////
doctorRoute.route('/doctor/:id').get((req, res) => {
    doctorSchema.findById(req.params.id, (error, data) => {
        if (error) {    
            return next(error)
        } else {
            res.json(data)
        }
    })
})

////////////////// POST (ADD) ////////////////
doctorRoute.route('/doctor/:id').post((req, res, next) => {
    doctorSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//////////////////// DELETE //////////////////
doctorRoute.route('/doctor/:id').delete((req, res) => {
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

//////////////////// PUT //////////////////
doctorRoute.route('/doctor/:id').put((req, res) => {
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

module.exports = doctorRoute;