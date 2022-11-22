const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adminauthSchema = new Schema({
    displayName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Number,
        default: Date.now().valueOf()
    },
    updated: {
        type: Number,
        default: Date.now().valueOf()
    },
},
    {
        collection: 'adminauth'
    },
    {
        timestaps: true
    }
);

module.exports = mongoose.model('adminauth', adminauthSchema)