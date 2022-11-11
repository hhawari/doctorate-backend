/* Codavaluation */
/* const express = require('express');
const jwt = require('jsonwebtoken')
const userRoute = express.Router();
let User = require('../model/user.model')

function verifyToken(res, req, next) {
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

userRoute.route('/').get((req, res, next) => {
    res.send('This is User route')
})

userRoute.post('/register', (req, res, next) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token })
        }
    })
})

userRoute.post('/login', (req, res, next) => {
    let userData = req.body
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('invalid email')
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('invalid password')
                } else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token })
                }
            }
        }
    })
})

module.exports = userRoute; */