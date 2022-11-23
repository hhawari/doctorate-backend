const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const adminAuthRouter = express.Router();
const adminAuthSchema = require('../model/adminAuth.model');
const checkAuth = require('../middleware/check-auth');

adminAuthRouter.get('/', (req, res, next) => {
    res.send('This is Admin-Auth route')
})

adminAuthRouter.get('/register', (req, res, next) => {
    res.send('This is Register route')
})

adminAuthRouter.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.json({ success: false, message: "Hash Error !" })
        } else {
            const user = new adminAuthSchema({
                email: req.body.email,
                password: hash,
            })
            user.save()
                .then((_) => {
                    res.json({ success: true, message: "Account has been Created" })
                })
                .catch((err) => {
                    if (err.code === 11000) {
                        return res.json({ success: false, message: "Email is Already exist !" })
                    }
                    res.json({ success: false, message: "Authentication Faild !! " })
                })
        }
    })
})

adminAuthRouter.post('/login', (req, res, next) => {
    adminAuthSchema.find({ email: req.body.email }).exec().then((result) => {
        if (result.length < 1) {
            return res.json({ success: true, message: "User Not Found!!" })
        }
        const user = result[0];
        bcrypt.compare(req.body.password, user.password, (err, ret) => {
            if (ret) {
                const payload = {
                    userId: user._id
                }
                const token = jwt.sign(payload, "webBatch")
                return res.json({ success: true, token: token, message: "Login Successfully" })
            } else {
                return res.json({ success: false, message: "Password does not Match!" })
            }
        })
    }).catch(err => {
        res.json({ success: false, message: "Authentication Failed !!" })
    })
})

adminAuthRouter.get('/profile', checkAuth, (req, res) => {
    const userId = req.userData.userId;
    adminAuthSchema.findById(userId).exec().then((result) => {
        res.json({ success: true, data: result })

    }).catch(err => {
        res.json({ success: false, message: "Server error" })
    })
})

module.exports = adminAuthRouter