const User = require("../models/User");
const SuperAdmin = require("../models/SuperAdmin")
const Student = require("../models/Student")
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const path = require("path");
const csvtojson = require("csvtojson");
const multer = require("multer");
const passwordGenerater = require("generate-password");
const Education = require("../models/Education");
const exp = require("constants");

// Load Dotenv
require("dotenv").config();

// Super admin signup
exports.signUpSuperAdmin = async(req, res) => {
    try {
        // Ftech data from request body
        const {
            name, email, password, confirmPassword, contact, whatsapp, localAddress, permanentAddress
        } = req.body;

        // Checking the all fields 
        if(!name || !email || !password || !confirmPassword || !contact){
            return res.status(403).json({
                success: false,
                message: "All fields are mandetory",
            })
        }

        // Checking the password and confirm password
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and confirm password are not matched",
            })
        }

        // Fetching the user data from DB
        const userExist = await SuperAdmin.findOne({email});

        // Checking if user already exist
        if(userExist){
            return res.status(401).json({
                success: false,
                message: "User already exist",
            })
        }

        // Hashing the password
        let hashedPassword = await bcrypt.hash(password, 10);

        // Creating Super Admin Profile
        const superAdminProfile = await SuperAdmin.create({
            name: name,
            email: email,
            password: hashedPassword,
            contact: contact,
            whatsapp: whatsapp,
            localAddress: localAddress,
            permanentAddress: permanentAddress,
            image: `http://api.dicebear.com/5.x/initials/svg?seed=${name}`
        })

        return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
            superAdminProfile
        })

    } catch (error) {
        console.log("Error Occured while sighing up", error);
        return res.status(500).json({
            success: false,
            message: "User can not be registered, Please try again later"
        })
    }
}

// User login for authenticating users
exports.login = async(req, res) => {
    try {
        // Fetch email and password from req body
        const {email,enrollment, password, role} = req.body;

        // check if email or password is missing
        if (!password || !role) {
            return res.status(400).json({
              success: false,
              message: "All fields are manadatory",
            });
        }

        let user;
        // Cheching the role of the user
        if(role === "SuperAdmin"){
            user = await SuperAdmin.findOne({email});
        }
        else if(role === "Student"){
            user = await Student.findOne({enrollment});
        }

        // If user not found with provided email
        if(!user){
            return res.status(401).json({
                // return 401 for unautherized status code
                success: false,
                message: "User is not reigstered, Please signup and continue"
            })
        }

        // Generate JWT token and password checking
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
              id: user._id,
              email: user.email,
              role: user.role,
              image: user.image,
            };
      
            // generating JWT
            const token = JWT.sign(payload, process.env.JWT_SECRET, {
              expiresIn: "24hr",
            });
      
            // save token in user document in db
            (user.token = token), (user.password = undefined);
           
            // set cookie for token and return response
            const options = {
              expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
              httpOnly: true,
            };
      
            return res.cookie("token", token, options).status(200).json({
              success: true,
              token,
              user,
              message: "User logged in successfully",
            });
          } else {
            return res.status(401).json({
              success: false,
              message: "Pasword is wrong",
            });
          }
    } catch (error) {
        console.log("Error occured while logging into the system",error);
        return res.status(500).json({
            success: false,
            message: "Login failure, please try later",
            // error: message.error
        });
    }
}


exports.addMultipleStudents = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }

        // Convert CSV buffer to JSON
        const csvData = req.file.buffer.toString('utf8');
        const jsonObj = await csvtojson().fromString(csvData);

        // console.log(jsonObj); // Print JSON data

        jsonObj.forEach((async(student) => {
            const password = passwordGenerater.generate({
                length: 10,
                numbers : true,
            })
            //send mail
            let hashedPassword = await bcrypt.hash(password, 10);
            student["password"] = hashedPassword;
            student["tempPassword"] = password;
            const response = await Student.create(student);
            
        }))


        // Send response with JSON data
        res.status(200).json({
            success: true,
            message: "File processed successfully!",
            // data: jsonObj
        });
    } catch (error) {
        console.error('Error processing CSV:', error);
        res.status(500).json({
            success: false,
            msg: "Error processing CSV file."
        });
    }
}

exports.addEducation = async(req, res) => {
    try {
        const {
            degree,
            university,
            admissionYear,
            passingYear,
            stream,
            percentage,
        } = req.body

        if(!degree || !university || !admissionYear || !passingYear || !stream || !percentage){
            return res.status(400).json({
                success : false,
                message : "All fields are mandetory"
            })
        }

        const edu = await Education.create({
            degree: degree,
            university : university,
            passingYear: passingYear,
            admissionYear: admissionYear,
            stream: stream,
            percentage: percentage,
        });

        const response = await Student.findByIdAndUpdate(
            req.user.id,
            {$push: {education: edu}},
            {new: true}
        );

        
        const updatedStudent = await Student.findById(response._id).populate("education").exec();
        const updatedEducation = await Education.findByIdAndUpdate(
            edu._id,
            {student : updatedStudent._id}
        )

        return res.status(200).json({
            success: true,
            message: "Education added",
            updatedStudent
        })

    } catch (error) {
        console.error('Error occured while adding education:', error);
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
}

exports.updatedEducation = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}