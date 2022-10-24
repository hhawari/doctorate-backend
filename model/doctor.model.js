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
    }
)

module.exports = mongoose.model('doctorSchema', doctorSchema)