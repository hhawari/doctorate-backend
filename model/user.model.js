const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
},
    {
        collection: 'users'
    },
    {
        timestaps: true
    }
);

module.exports = mongoose.model('userSchema', userSchema)
/* 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String
    },
    passeord: {
        type: String
    }
},
    {
        collection: 'users'
    },
    {
        timestaps: true
    }
);

module.exports = mongoose.model('userSchema', userSchema) */