const express = require("express");
const router = express.Router();
const multer = require('multer');

// import the required controllers andvmiddleware
const {signUpSuperAdmin, login, addMultipleStudents, addEducation} = require("../controllers/Auth")

const {auth, isAdmin, isSuperAdmin, isStudent} = require("../middleware/auth");


// Configure Multer
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });


// Routes for login, signup and authentications

// ******************Authentication routes started************
// Route for user login
router.post("/login", login);

// Route for Super Admin Sigup
router.post("/superadminsignup", signUpSuperAdmin);

// Route for adding multiple students
router.post("/addmultistudents",upload.single('file'),auth, isSuperAdmin ,addMultipleStudents);

// Route for adding education
router.post("/addeducation",auth, isStudent, addEducation);
// ******************Authentication routes ended**************

module.exports = router;