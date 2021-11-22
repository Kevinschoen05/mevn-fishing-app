const mongoose = require('mongoose'); 

const recordSchema = mongoose.Schema({
    species: String, 
    reservoir: String, 
    angler: String, 
    weight: Number,
    date: {
        type: Date, 
        default: Date.now()
    },
    comment: String

})
module.exports = mongoose.model("Record", recordSchema)