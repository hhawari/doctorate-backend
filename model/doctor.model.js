const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let doctorSchema = new Schema({
    vorname: {
        type: String
    },
    nachname: {
        type: String
    },
    email: {
        type: String
    },
    fach: {
        type: String
    },
    adresse: {
        type: String
    },
    telefonnummer: {
        type: String
    },
    sprache: {
        type: String
    }
},

    {
        collection: 'doctor'
    },
    {
        timestaps: true
    }
);

module.exports = mongoose.model('doctorSchema', doctorSchema)