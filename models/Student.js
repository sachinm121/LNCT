// const mongoose = require("mongoose");


// const student = new mongoose.Schema({
//     name: {
//         type : String,
//         required: true,
//         trim : true,
//     },
//     contact:{
//         type : String,
//         required : true,
//     },
//     email:{
//         type : String,
//         required : true,
//         trim : true,
//     },
//     whatsapp:{
//         type : String,
//     },
//     DOB : {
//         type : String,
//         required: true,
//     },
//     enrollment:{
//         type : String,
//         required: true,
//         trim : true,
//     },
//     course : {
//         type : String,
//         required : true,
//         trim : true,
//     },
//     branch:{
//         type : String,
//         required : true,
//         trim : true,
//     },
//     college: {
//         type : String,
//         required : true,
//     },
//     batch:{
//         type : Number,
//         required : true,
//         trim : true,
//         default:2025
//     },
//     role:{
//         type : String,
//         default : "Student",
//     },
//     gender: {
//         type : String,
//     },
//     fathersName: {
//         type: String,
//     },
//     fatherOccupation:{
//         type: String,
//     },
//     mothersName: {
//         type: String,
//     },
//     category: {
//         type : String,
//         enum : ["General", "OBC", "SC", "ST"]
//     },
//     password:{
//         type : String,
//         required : true,
//     },
//     aadhar:{
//         type : String,
//     },
//     pan : {
//         type : String,
//     },
//     localAdress:{
//         type : String,
//     },
//     permanentAddress:{
//         type : String,
//     },
//     parentsContact : {
//         type : String,
//     }

// })

// module.exports = mongoose.model("Student", student);



const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const { registerStudent } = require("../mail/templates/registeredStudent");


const student = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        trim : true,
    },
    contact:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
        trim : true,
    },
    whatsapp:{
        type : String,
    },
    DOB : {
        type : String,
        required: true,
    },
    enrollment:{
        type : String,
        required: true,
        trim : true,
    },
    course : {
        type : String,
        required : true,
        trim : true,
    },
    branch:{
        type : String,
        required : true,
        trim : true,
    },
    college: {
        type : String,
        required : true,
    },
    batch:{
        type : Number,
        required : true,
        trim : true,
        default:2025
    },
    role:{
        type : String,
        default : "Student",
    },
    gender: {
        type : String,
        required: true,
    },
    password:{
        type : String,
        required : true,
    },
    tempPassword: {
        type : String,
    },
    fathersName: {
        type: String,
    },
    fatherOccupation:{
        type: String,
    },
    mothersName: {
        type: String,
    },
    category: {
        type : String,
        enum : ["General", "OBC", "SC", "ST"]
    },
    aadhar:{
        type : String,
    },
    pan : {
        type : String,
    },
    localAdress:{
        type : String,
    },
    permanentAddress:{
        type : String,
    },
    parentsContact : {
        type : String,
    },
    nationality: {
        type : String,
        default : "Indian"
    },
    status: {
        type: String,
        enum: ["BlackListed", "Placed", "UnPlaced"],
        default: "UnPlaced"
    },
    skills: [{
        type: String
    }],
    education:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Education',
    }]
})

async function registeredStudent(email,name, enrollment, password) {
    try {
        console.log("Enter in email section");
        const mailResponse = await mailSender(
            email,
            "Student Registered Successfully",
            registerStudent(name, enrollment, password)
        )
    } catch (error) {
        console.log("Error occured while registring the students", error);
        throw error
    }
}

student.post("save", async function (doc) {
    // console.log("doc:", doc)
    try {
        await registeredStudent(doc.email, doc.name, doc.enrollment, doc.tempPassword);
    } catch (error) {
        console.log("Network issue, Please try after sometimes");
    }
});

module.exports = mongoose.model("Student", student);