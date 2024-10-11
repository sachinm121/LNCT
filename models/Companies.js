const mongoose = require("mongoose");

const companies = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location : {
        type : String,
    },
    email: {
        type: String,
        required: true,
    },
    about: {
        type: String,
    },
    website: {
        type: String,
    },
    linkedIn : {
        type: String, 
    },
    logo: {
        type: String,
    },
    PlacedStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }]
})

module.exports = mongoose.model("Companies", companies);