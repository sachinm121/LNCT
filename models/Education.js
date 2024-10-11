const mongoose = require("mongoose");

const education = new mongoose.Schema({
    degree: {
        type: String,
        required: true,
        enum: ["SSC", "HSC", "UG", "PG"],
    },
    university : {
        type : String,
        require: true,
    },
    admissionYear: {
        type : Number,
        required: true,
    },
    passingYear: {
        type : Number,
        required: true,
    },
    stream: {
        type: String,
    },
    percentage: {
        type: Number,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Student'
    }

})

module.exports = mongoose.model("Education", education);