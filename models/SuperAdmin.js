const mongoose = require("mongoose");

require("dotenv").config();

const superAdmin = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        trim : true,
    },
    email:{
        type : String,
        required : true,
        trim : true,
    },
    role:{
        type : String,
        default : "SuperAdmin",
    },
    password:{
        type : String,
        required : true,
    },
    contact:{
        type : String,
        required : true,
    },
    whatsapp:{
        type : String,
    },
    localAddress:{
        type : String,
    },
    permanentAddress:{
        type : String,
    },
    image:{
        type: String,
        required: true,
    },
    token: {
        type: String,
    }

},
{timestamps: true}
)

module.exports = mongoose.model("SuperAdmin", superAdmin);



// {
//     "name": "Sachin",
//     "email" : "sachin@gmail.com",
//     "password": "123456",
//     "confirmPassword": "123456",
//     "contact": "8798786584",
//     "role": "Student"
// }