const express = require("express");
const router = express.Router();

// import the required controllers andvmiddleware
const {createCompany} = require("../controllers/Companies")

const {auth, isAdmin, isSuperAdmin, isStudent} = require("../middleware/auth");

// Routes for login, signup and authentications

// ******************Company routes start************
// Route for creating company
router.post("/createcompany", createCompany);

// ******************Company routes end**************

module.exports = router;