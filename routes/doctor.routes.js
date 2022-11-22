const express = require('express');
const jwt = require('jsonwebtoken')
const doctorRoute = express.Router();
let doctorSchema = require('../model/doctor.model');

doctorRoute.get('/get-doctor', (req, res, next) => {
    doctorSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

doctorRoute.get('/add-doctor/:id',(req, res, next) => {
    doctorSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

doctorRoute.route('/add-doctor').post((req, res, next) => {
    doctorSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

doctorRoute.route('/update-doctor/:id').put((req, res, next) => {
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

doctorRoute.route('/delete-doctor/:id').delete((req, res, next) => {
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

module.exports = doctorRoute;