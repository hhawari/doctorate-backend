const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authRouter = express.Router();
const adminauthSchema = require('../model/auth.model');
const checkAuth = require('../middleware/check-auth');

authRouter.get('/', (req, res, next) => {
    res.send('This is Admin-Auth route')
})

authRouter.get('/register', (req, res, next) => {
    res.send('This is Register route')
})


authRouter.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.json({ success: false, message: "Hash Error !" })
        } else {
            const user = new adminauthSchema({
                displayName: req.body.displayName,
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


authRouter.post('/login', (req, res, next) => {
    adminauthSchema.find({ email: req.body.email }).exec().then((result) => {
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

authRouter.get('/profile', checkAuth, (req, res) => {
    const userId = req.userData.userId;
    adminauthSchema.findById(userId).exec().then((result)=>{
        res.json({success: true, data:result})

    }).catch(err=>{
        res.json({success: false, message:"Server error"})
    })
})

module.exports = authRouter

